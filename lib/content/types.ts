// Tipos del contenido del portal. Fuente de verdad de los shapes que consumen
// las páginas y componentes. El mapeo desde la API del CMS vive en cms.ts.

export type TipoMiembro =
  | "presidente"
  | "sindica"
  | "regidor"
  | "dif"
  | "secretario"
  | "tesorero"
  | "contralor"
  | "cabildo";

export interface Funcionario {
  id: string;
  tipo: TipoMiembro;
  orden: number;
  nombre: string;
  cargo: string;
  administracion: string | null;
  bio: string | null;
  email: string | null;
  telefono: string | null;
  foto: string | null;
  comisiones: string[];
}

export interface Noticia {
  slug: string;
  titulo: string;
  extracto: string;
  contenido: string;
  categoria: string;
  fecha: string;
  autor: string;
  imagen: string;
}

export interface Documento {
  id: string;
  titulo: string;
  descripcion: string;
  url: string;
  portadaUrl: string | null;
  tamanoBytes: number | null;
  nombreArchivo: string | null;
  categoria: string;
  tipo: string;
  ambito: string | null;
  anio: number | null;
  trimestre: number | null;
  creadoEn: string | null;
  actualizadoEn: string | null;
}

export interface DocumentoFiltros {
  categoria?: string;
  anio?: number | string;
  trimestre?: number | string;
  ambito?: string;
}

export interface Estadistica {
  id: string;
  titulo: string;
  valor: string;
  iconoUrl: string | null;
  orden: number;
}

export interface Contenido {
  clave: string;
  titulo: string | null;
  descripcion: string | null;
  imagenUrl: string | null;
  activo: boolean;
}

export interface ImagenGaleria {
  id: string;
  url: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  fecha: string | null;
}

export interface CategoriaImagen {
  value: string;
  label: string;
}

export interface HeroSlideCta {
  label: string;
  href: string;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: HeroSlideCta;
  image: string;
  alt: string;
  align: string;
  credit?: string;
}

export interface AtractivoGaleriaItem {
  src: string;
  alt: string;
}

export interface Coordenadas {
  lat: number;
  lon: number;
}

// Atractivo turístico (modelo Atractivo del CMS). Conserva el shape que esperan
// AtractivoCard / AtractivoHero / GaleriaLightbox / MapaEmbed del portal.
export interface Atractivo {
  slug: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
  descripcionCorta: string;
  descripcionLarga: string;
  portada: string;
  galeria: AtractivoGaleriaItem[];
  coordenadas: Coordenadas | null;
  horario: string | null;
  destacado: boolean;
}

// Forma cruda de un item devuelto por la API del CMS: desconocida/no tipada.
export type RawCmsItem = Record<string, any>;
