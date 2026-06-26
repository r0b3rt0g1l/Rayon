// ============================================================================
// Capa de contenido del portal — API pública tipada.
// Las páginas/componentes consumen SOLO desde aquí (`@/lib/content`). Cada getter
// devuelve datos del CMS cuando NEXT_PUBLIC_API_URL existe, y cae al fallback
// estático en cualquier otro caso. La conexión real al CMS vive en ./cms.ts.
// ============================================================================
import {
  cmsAtractivoPorSlug,
  cmsAtractivos,
  cmsCabildo,
  cmsContenido,
  cmsDocumentos,
  cmsEstadisticas,
  cmsHeroSlides,
  cmsImagenes,
  cmsNoticiaPorSlug,
  cmsNoticias,
  cmsPortadaHistoria,
  cmsSevac,
} from "./cms";
import type {
  Atractivo,
  CategoriaImagen,
  Contenido,
  Documento,
  DocumentoFiltros,
  Estadistica,
  Funcionario,
  HeroSlide,
  ImagenGaleria,
  Noticia,
} from "./types";

// Fallbacks estáticos del repo (archivos .js sin tipos → se castean al shape).
import { cabildo as rawCabildo } from "@/lib/cabildo";
import {
  noticias as rawNoticias,
  comunicados as rawComunicados,
  getNoticiaPorSlug as hardcodedNoticiaPorSlug,
} from "@/lib/noticias";

import { estadisticas as rawEstadisticas } from "@/lib/estadisticas";
import { atractivos as rawAtractivos } from "@/lib/atractivos";

const cabildoFallback = rawCabildo as Funcionario[];
const noticiasFallback = rawNoticias as Noticia[];
const estadisticasFallback = rawEstadisticas as Estadistica[];
const atractivosFallback = rawAtractivos as Atractivo[];

/** Comunicados oficiales (estáticos; el CMS aún no expone endpoint propio). */
export const comunicados = rawComunicados as Noticia[];

export type {
  Atractivo,
  Contenido,
  Documento,
  Estadistica,
  Funcionario,
  HeroSlide,
  ImagenGaleria,
  Noticia,
} from "./types";

// --------------------------------------------------------------- cabildo ----

/** Cabildo + gabinete. CMS si hay miembros activos; si no, fallback estático. */
export async function getCabildo(): Promise<Funcionario[]> {
  const cms = await cmsCabildo();
  return cms && cms.length > 0 ? cms : cabildoFallback;
}

// -------------------------------------------------------------- noticias ----

let _noticiasCache: Noticia[] | null = null;
let _noticiasCacheTs = 0;
const CACHE_TTL = 30_000;

async function getNoticiasCached(): Promise<Noticia[]> {
  const now = Date.now();
  if (_noticiasCache && now - _noticiasCacheTs < CACHE_TTL) return _noticiasCache;
  const cms = await cmsNoticias();
  const result = cms && cms.length > 0 ? cms : noticiasFallback;
  _noticiasCache = result;
  _noticiasCacheTs = now;
  return result;
}

export async function getNoticias(): Promise<Noticia[]> {
  return getNoticiasCached();
}

function ordenarPorFecha(list: Noticia[]): Noticia[] {
  return [...list].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
  );
}

export async function getNoticiasRecientes(limit = 3): Promise<Noticia[]> {
  return ordenarPorFecha(await getNoticiasCached()).slice(0, limit);
}

export async function getNoticiasRelacionadas(
  slugActual: string,
  limit = 3,
): Promise<Noticia[]> {
  const all = await getNoticiasCached();
  return ordenarPorFecha(all.filter((n) => n.slug !== slugActual)).slice(0, limit);
}

/** Detalle por slug: endpoint detalle del CMS → lista cacheada → fallback estático. */
export async function getNoticiaPorSlug(slug: string): Promise<Noticia | null> {
  const detalle = await cmsNoticiaPorSlug(slug);
  if (detalle) return detalle;

  const lista = await getNoticiasCached();
  const enLista = lista.find((n) => n.slug === slug);
  if (enLista) return enLista;

  return (hardcodedNoticiaPorSlug(slug) as Noticia | null) ?? null;
}

// ------------------------------------------------------------- documentos ----

export async function getDocumentos(
  filtros: DocumentoFiltros = {},
): Promise<Documento[]> {
  return (await cmsDocumentos(filtros)) ?? [];
}

export async function getSevac(
  filtros: DocumentoFiltros = {},
): Promise<Documento[]> {
  return (await cmsSevac(filtros)) ?? [];
}

// Estadísticas del home: el CMS tiene prioridad si el municipio ya cargó las
// suyas; mientras no (null=API caída o []=sin datos), se muestra el fallback
// estático VERIFICADO del repo (lib/estadisticas.js). Per-repo: cada municipio
// define su propio fallback (no hereda datos de otro).
export async function getEstadisticas(): Promise<Estadistica[]> {
  const cms = await cmsEstadisticas();
  return cms && cms.length > 0 ? cms : estadisticasFallback;
}

// Bloque de contenido editable por clave (encabezados de página / banners).
// Devuelve null si el municipio no tiene esa clave (o está inactiva) → el
// componente usa su fallback (PageHeader) o se oculta (BannerHero).
export async function getContenido(clave: string): Promise<Contenido | null> {
  return cmsContenido(clave);
}

// "Información Relevante" del home: reusa el modelo Documento filtrando por
// categoría (sin tocar backend ni DB). Devuelve [] si no hay → la sección se
// oculta sola.
export async function getInformacionImportante(): Promise<Documento[]> {
  return getDocumentos({ categoria: "informacion-relevante" });
}

// Plan Municipal: bloques editables (imagen + título + texto) servidos por el
// modelo Documento con categoría 'plan-municipal' (sin tocar backend ni DB).
// Devuelve [] si no hay → la página usa su fallback estático (ejes locales).
export async function getPlanMunicipal(): Promise<Documento[]> {
  return getDocumentos({ categoria: "plan-municipal" });
}

// --------------------------------------------------------------- turismo ----

// Atractivos turísticos: CMS si hay items; si no (null o []), fallback estático
// (lib/atractivos.js). Conserva el diseño de la sección de Turismo.
export async function getAtractivos(): Promise<Atractivo[]> {
  const cms = await cmsAtractivos();
  return cms && cms.length > 0 ? cms : atractivosFallback;
}

export async function getAtractivoPorSlug(slug: string): Promise<Atractivo | null> {
  const cms = await cmsAtractivoPorSlug(slug);
  if (cms) return cms;
  return atractivosFallback.find((a) => a.slug === slug) ?? null;
}

export async function getAtractivosCercanos(
  slugActual: string,
  limit = 3,
): Promise<Atractivo[]> {
  const todos = await getAtractivos();
  return todos.filter((a) => a.slug !== slugActual).slice(0, limit);
}

// --------------------------------------------------------------- imágenes ----

export const CATEGORIAS_IMAGENES: CategoriaImagen[] = [
  { value: "todas", label: "Todas" },
  { value: "galeria", label: "Galería" },
  { value: "eventos", label: "Eventos" },
  { value: "funcionarios", label: "Funcionarios" },
  { value: "general", label: "General" },
  { value: "hero", label: "Banners" },
];

let _imagenesCache: ImagenGaleria[] | null = null;
let _imagenesCacheTs = 0;

async function getImagenesCached(): Promise<ImagenGaleria[]> {
  const now = Date.now();
  if (_imagenesCache && now - _imagenesCacheTs < CACHE_TTL) return _imagenesCache;
  const result = (await cmsImagenes()) ?? [];
  _imagenesCache = result;
  _imagenesCacheTs = now;
  return result;
}

export async function getImagenes(): Promise<ImagenGaleria[]> {
  return getImagenesCached();
}

export async function getImagenesPorCategoria(
  categoria?: string,
): Promise<ImagenGaleria[]> {
  const all = await getImagenesCached();
  if (!categoria || categoria === "todas") return all;
  return all.filter((img) => img.categoria === categoria);
}

// ----------------------------------------------------- hero / portada ----

/**
 * Hero: devuelve la tri-state del CMS (null=usar fallback, []=ocultar, data).
 * HeroSection decide entre los slides del CMS y el fallback estático del repo.
 */
export async function getHeroSlides(): Promise<HeroSlide[] | null> {
  return cmsHeroSlides();
}

/** URL de la portada de Historia desde el CMS (o null → el consumidor usa su default). */
export async function getPortadaHistoria(): Promise<string | null> {
  return cmsPortadaHistoria();
}
