// ============================================================================
// ÚNICO PUNTO DE CAMBIO para conectar un CMS / portal administrador.
// Todo el sitio lee su contenido a través de lib/content (index.ts), que a su
// vez usa estas funciones. Conectar otra herramienta = ajustar SOLO este archivo
// (la URL base, el slug, los endpoints y los mappers). El resto del sitio es
// agnóstico de la herramienta.
//
// Convenciones de retorno (las consumen los getters de index.ts):
//   null  → no hay API (NEXT_PUBLIC_API_URL ausente), error de red o respuesta
//           inválida → el getter cae al fallback estático.
//   []    → el CMS respondió OK pero sin items activos (hero/cabildo) → el getter
//           decide (mostrar vacío o caer al fallback).
// ============================================================================
import type {
  Atractivo,
  Contenido,
  Documento,
  DocumentoFiltros,
  Estadistica,
  Funcionario,
  HeroSlide,
  ImagenGaleria,
  Noticia,
  RawCmsItem,
  TipoMiembro,
} from "./types";

const MUNICIPIO_SLUG = process.env.NEXT_PUBLIC_MUNICIPIO_SLUG || "municipio";
const TIMEOUT_MS = 30000;
const REVALIDATE_S = 60;

type FetchInit = RequestInit & { next?: { revalidate?: number } };

/** Fetch crudo al endpoint del municipio. Devuelve el JSON parseado o null. */
async function cmsFetch(path: string): Promise<unknown | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return null;

  const url = `${baseUrl}/api/municipios/${MUNICIPIO_SLUG}${path}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const init: FetchInit = {
      signal: controller.signal,
      next: { revalidate: REVALIDATE_S },
    };
    const res = await fetch(url, init);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

function asArray(data: unknown): RawCmsItem[] | null {
  return Array.isArray(data) ? (data as RawCmsItem[]) : null;
}

function toISODate(value: unknown): string {
  if (!value) return "";
  const d = new Date(value as string);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function timeMs(value: unknown): number {
  return new Date((value as string) || 0).getTime();
}

// ---------------------------------------------------------------- mappers ----

function mapNoticia(item: RawCmsItem): Noticia {
  const contenido: string = item.contenido || item.cuerpo || "";
  const extractoRaw: string =
    typeof item.extracto === "string" && item.extracto ? item.extracto : contenido;
  const extracto =
    extractoRaw.length > 200
      ? extractoRaw.slice(0, 197).trimEnd() + "..."
      : extractoRaw;

  let autor: string;
  if (item.autor && typeof item.autor === "object") {
    autor = item.autor.nombre || "Gobierno Municipal";
  } else {
    autor = item.autor || "Gobierno Municipal";
  }

  return {
    slug: item.slug ?? item.id,
    titulo: item.titulo || "",
    extracto,
    contenido,
    categoria: item.categoria || "Sin categoría",
    fecha: toISODate(item.publicarEn || item.fechaPublicacion || item.fecha || item.creadoEn || item.createdAt),
    autor,
    imagen: item.imagenUrl || item.imagen || "/og/og-default.jpg",
  };
}

const TIPO_API_TO_PUBLIC: Record<string, TipoMiembro> = {
  PRESIDENTE: "presidente",
  SINDICA: "sindica",
  REGIDOR: "regidor",
  DIF: "dif",
  SECRETARIO: "secretario",
  TESORERO: "tesorero",
  CONTRALOR: "contralor",
  OTRO: "cabildo",
};

function mapFuncionario(item: RawCmsItem): Funcionario {
  return {
    id: item.id,
    tipo: TIPO_API_TO_PUBLIC[item.tipo] || "cabildo",
    orden: item.orden ?? 0,
    nombre: item.nombre,
    cargo: item.cargo,
    administracion: item.administracion || null,
    bio: item.bio || null,
    email: item.email || null,
    telefono: item.telefono || null,
    foto: item.fotoUrl || null,
    comisiones: [],
  };
}

function mapDocumento(item: RawCmsItem, withAmbito: boolean): Documento {
  return {
    id: item.id,
    titulo: item.titulo,
    descripcion: item.descripcion || "",
    url: item.archivoUrl,
    portadaUrl: item.portadaUrl ?? null,
    tamanoBytes: item.fileSize ?? null,
    nombreArchivo: item.fileName ?? null,
    categoria: item.categoria || "otros",
    tipo: item.tipo || "PDF",
    ambito: withAmbito ? item.ambito ?? null : null,
    anio: item.anio ?? null,
    trimestre: item.trimestre ?? null,
    creadoEn: item.creadoEn ?? null,
    actualizadoEn: item.actualizadoEn ?? null,
  };
}

function sortDocs(a: Documento, b: Documento): number {
  const anioA = a.anio ?? 0;
  const anioB = b.anio ?? 0;
  if (anioB !== anioA) return anioB - anioA;
  return timeMs(b.creadoEn) - timeMs(a.creadoEn);
}

// ------------------------------------------------------ fetchers por tipo ----

export async function cmsEstadisticas(): Promise<Estadistica[] | null> {
  const data = asArray(await cmsFetch("/estadisticas"));
  if (!data) return null;
  const activos = data.filter((i) => i && i.activo !== false);
  if (activos.length === 0) return [];
  activos.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  return activos.map((item) => ({
    id: item.id,
    titulo: item.titulo || "",
    valor: item.valor ?? "",
    iconoUrl: item.iconoUrl || null,
    orden: item.orden ?? 0,
  }));
}

export async function cmsContenido(clave: string): Promise<Contenido | null> {
  const item = (await cmsFetch(`/contenidos/${clave}`)) as RawCmsItem | null;
  if (!item || typeof item !== "object" || Array.isArray(item)) return null;
  if (item.activo === false) return null; // inactivo → como si no existiera (usa fallback)
  return {
    clave: item.clave ?? clave,
    titulo: item.titulo || null,
    descripcion: item.descripcion || null,
    imagenUrl: item.imagenUrl || null,
    activo: item.activo !== false,
  };
}

export async function cmsHeroSlides(): Promise<HeroSlide[] | null> {
  const data = asArray(await cmsFetch("/hero"));
  if (!data) return null;
  // Guard M3: descartar slides activos sin imagen utilizable (evita <Image src={undefined}>).
  const activos = data.filter((i) => i && i.activo === true && i.imagenUrl);
  if (activos.length === 0) return [];
  activos.sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  return activos.map((item) => {
    // El botón (cta) solo existe si hay un linkBoton REAL. Sin link → cta null → el
    // portal (que ya condiciona slide.cta?.href) NO pinta el botón fantasma "Ver más"→"/".
    const href =
      typeof item.linkBoton === "string" ? item.linkBoton.trim() : "";
    const cta = href
      ? {
          label:
            (typeof item.textoBoton === "string" && item.textoBoton.trim()) ||
            "Ver más",
          href,
        }
      : null;
    return {
      id: item.id,
      eyebrow: item.etiqueta || "",
      title: item.titulo,
      subtitle: item.subtitulo || "",
      cta,
      image: item.imagenUrl,
      alt: item.titulo,
      align: "center",
    };
  });
}

export async function cmsNoticias(): Promise<Noticia[] | null> {
  const data = asArray(await cmsFetch("/noticias"));
  if (!data) return null;
  const activas = data.filter((i) => i && i.activo !== false);
  if (activas.length === 0) return null;
  activas.sort(
    (a, b) =>
      timeMs(b.publicarEn || b.fechaPublicacion || b.fecha || b.creadoEn) -
      timeMs(a.publicarEn || a.fechaPublicacion || a.fecha || a.creadoEn),
  );
  return activas.map(mapNoticia);
}

export async function cmsNoticiaPorSlug(slug: string): Promise<Noticia | null> {
  if (!slug || typeof slug !== "string") return null;
  const data = await cmsFetch(`/noticias/${encodeURIComponent(slug)}`);
  if (!data || typeof data !== "object") return null;
  return mapNoticia(data as RawCmsItem);
}

// Mapea un Atractivo del backend al shape que esperan los componentes del portal
// (AtractivoCard/Hero/GaleriaLightbox/MapaEmbed). `portada` nunca es null (next/image).
const ATRACTIVO_PLACEHOLDER = "/images/placeholder.jpg";

function mapAtractivo(item: RawCmsItem): Atractivo {
  const galeria = Array.isArray(item.galeria)
    ? item.galeria
        .filter((g: RawCmsItem) => g && g.url)
        .map((g: RawCmsItem, i: number) => ({
          src: g.url as string,
          alt: `${item.nombre || "Atractivo"} — foto ${i + 1}`,
        }))
    : [];
  const lat = typeof item.lat === "number" ? item.lat : null;
  const lon = typeof item.lon === "number" ? item.lon : null;
  return {
    slug: item.slug ?? item.id,
    nombre: item.nombre || "",
    tipo: item.tipo || "Atractivo",
    ubicacion: item.ubicacion || "",
    descripcionCorta: item.descripcionCorta || "",
    descripcionLarga: item.descripcionLarga || "",
    portada: item.imagenUrl || ATRACTIVO_PLACEHOLDER,
    galeria,
    coordenadas: lat != null && lon != null ? { lat, lon } : null,
    horario: item.horario || null,
    mapsUrl: typeof item.mapsUrl === "string" && item.mapsUrl ? item.mapsUrl : null,
    destacado: Boolean(item.destacado),
  };
}

export async function cmsAtractivos(): Promise<Atractivo[] | null> {
  const data = asArray(await cmsFetch("/atractivos"));
  if (!data || data.length === 0) return null;
  return data.map(mapAtractivo);
}

export async function cmsAtractivoPorSlug(slug: string): Promise<Atractivo | null> {
  if (!slug || typeof slug !== "string") return null;
  const data = await cmsFetch(`/atractivos/${encodeURIComponent(slug)}`);
  if (!data || typeof data !== "object") return null;
  return mapAtractivo(data as RawCmsItem);
}

export async function cmsImagenes(): Promise<ImagenGaleria[] | null> {
  const data = asArray(await cmsFetch("/imagenes"));
  if (!data || data.length === 0) return null;
  // Guard M3: descartar imágenes sin url utilizable (evita <Image src={undefined}> en la galería).
  const conUrl = data.filter((i) => i && i.url);
  if (conUrl.length === 0) return null;
  conUrl.sort((a, b) => timeMs(b.creadoEn) - timeMs(a.creadoEn));
  return conUrl.map((item) => ({
    id: item.id,
    url: item.url,
    titulo: item.titulo || "",
    descripcion: item.descripcion || "",
    categoria: item.galeria ?? item.categoria ?? "general",
    fecha: item.creadoEn ?? null,
  }));
}

function buildDocsQuery(filtros: DocumentoFiltros, includeAmbito: boolean): string {
  const params = new URLSearchParams();
  if (filtros.categoria) params.set("categoria", filtros.categoria);
  if (filtros.anio) params.set("anio", String(filtros.anio));
  if (filtros.trimestre) params.set("trimestre", String(filtros.trimestre));
  if (includeAmbito && filtros.ambito) params.set("ambito", filtros.ambito);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export async function cmsDocumentos(
  filtros: DocumentoFiltros = {},
): Promise<Documento[] | null> {
  const data = asArray(await cmsFetch(`/documentos${buildDocsQuery(filtros, true)}`));
  if (!data || data.length === 0) return null;
  return data.map((i) => mapDocumento(i, true)).sort(sortDocs);
}

export async function cmsSevac(
  filtros: DocumentoFiltros = {},
): Promise<Documento[] | null> {
  const data = asArray(await cmsFetch(`/sevac${buildDocsQuery(filtros, false)}`));
  if (!data || data.length === 0) return null;
  return data.map((i) => mapDocumento(i, false)).sort(sortDocs);
}

export async function cmsPortadaHistoria(): Promise<string | null> {
  const data = await cmsFetch("/portada-historia");
  if (!data || typeof data !== "object") return null;
  return (data as RawCmsItem).url || null;
}

export async function cmsCabildo(): Promise<Funcionario[] | null> {
  const data = asArray(await cmsFetch("/funcionarios?activo=true"));
  if (!data) return null;
  const activos = data.filter((i) => i && i.activo !== false);
  if (activos.length === 0) return [];
  return activos.map(mapFuncionario).sort((a, b) => a.orden - b.orden);
}
