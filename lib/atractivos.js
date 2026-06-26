// Atractivos turísticos del municipio. Al clonar la plantilla, reemplaza el array
// por el inventario real del municipio. Mientras esté vacío, la sección de turismo
// se muestra "en preparación".
//
// Cada entrada debe seguir esta forma:
//   {
//     slug, nombre, tipo, ubicacion, descripcionCorta, descripcionLarga,
//     portada, galeria: [{ src, alt }, ...], coordenadas: { lat, lon },
//     horario, destacado: boolean,
//   }
// Las imágenes pueden generarse con getStockImage(tags, w, h) del módulo
// '@/lib/stockImage' mientras llegan las oficiales.

// Atractivos de Baviácora. Sin fotos inventadas: `portada` usa el placeholder
// hasta contar con imágenes reales del municipio. `coordenadas` y `horario`
// quedan pendientes (no especificados en la fuente).
const PLACEHOLDER = "/images/placeholder.jpg";

export const atractivos = [
  {
    slug: "templo-san-francisco-javier",
    nombre: "Templo de San Francisco Javier",
    tipo: "Patrimonio",
    ubicacion: "Baviácora, Sonora",
    descripcionCorta:
      "Emblema del pueblo, de la época de su fundación, con arquitectura colonial.",
    descripcionLarga:
      "El Templo de San Francisco Javier es uno de los principales emblemas de Baviácora. Data de la época de la fundación del pueblo y conserva la arquitectura colonial característica del periodo de la misión.",
    portada: PLACEHOLDER,
    galeria: [],
    coordenadas: null,
    horario: null,
    destacado: true,
  },
  {
    slug: "mision-nuestra-senora-concepcion",
    nombre: "Misión de Nuestra Señora de la Concepción",
    tipo: "Patrimonio",
    ubicacion: "Baviácora, Sonora",
    descripcionCorta:
      "Origen del pueblo: la misión jesuita fundada en 1639.",
    descripcionLarga:
      "La Misión de Nuestra Señora de la Concepción marca el origen de Baviácora. Fundada en 1639 por el jesuita Fray Bartolomé Castaño, dio nombre y asiento al pueblo, llamado originalmente “La Purísima Concepción de Baviácora”.",
    portada: PLACEHOLDER,
    galeria: [],
    coordenadas: null,
    horario: null,
    destacado: true,
  },
  {
    slug: "plaza-principal",
    nombre: "Plaza Principal",
    tipo: "Espacio público",
    ubicacion: "Baviácora, Sonora",
    descripcionCorta:
      "Corazón del pueblo y punto de encuentro de la vida comunitaria.",
    descripcionLarga:
      "La Plaza Principal es el corazón de Baviácora y el punto de encuentro de la vida comunitaria del municipio.",
    portada: PLACEHOLDER,
    galeria: [],
    coordenadas: null,
    horario: null,
    destacado: false,
  },
  {
    slug: "las-tinajas",
    nombre: "Las Tinajas",
    tipo: "Sitio natural",
    ubicacion: "Alrededores de Baviácora, Sonora",
    descripcionCorta:
      "Cañón natural ubicado en los alrededores del municipio.",
    descripcionLarga:
      "Las Tinajas es un cañón natural localizado en los alrededores de Baviácora, parte del entorno serrano y ribereño de la región del Río Sonora.",
    portada: PLACEHOLDER,
    galeria: [],
    coordenadas: null,
    horario: null,
    destacado: false,
  },
  {
    slug: "rio-sonora",
    nombre: "Río Sonora",
    tipo: "Sitio natural",
    ubicacion: "Baviácora, Sonora",
    descripcionCorta:
      "Principal fuente de agua del municipio; paisajes y agricultura.",
    descripcionLarga:
      "El Río Sonora es la principal fuente de agua del municipio y eje de sus paisajes y de la actividad agrícola. Baviácora forma parte de la Ruta del Río Sonora.",
    portada: PLACEHOLDER,
    galeria: [],
    coordenadas: null,
    horario: null,
    destacado: false,
  },
  {
    slug: "monumento-benito-juarez",
    nombre: "Monumento a Benito Juárez",
    tipo: "Monumento",
    ubicacion: "Baviácora, Sonora",
    descripcionCorta: "Monumento conmemorativo en el municipio.",
    descripcionLarga:
      "Monumento a Benito Juárez, parte del patrimonio conmemorativo de Baviácora.",
    portada: PLACEHOLDER,
    galeria: [],
    coordenadas: null,
    horario: null,
    destacado: false,
  },
  {
    slug: "monumento-eduardo-w-villa",
    nombre: "Monumento a Eduardo W. Villa",
    tipo: "Monumento",
    ubicacion: "Baviácora, Sonora",
    descripcionCorta: "Monumento conmemorativo en el municipio.",
    descripcionLarga:
      "Monumento a Eduardo W. Villa, parte del patrimonio conmemorativo de Baviácora.",
    portada: PLACEHOLDER,
    galeria: [],
    coordenadas: null,
    horario: null,
    destacado: false,
  },
];

export function getAtractivoPorSlug(slug) {
  return atractivos.find((a) => a.slug === slug) || null;
}

export function getAtractivosCercanos(slugActual, limit = 3) {
  return atractivos
    .filter((a) => a.slug !== slugActual)
    .slice(0, limit);
}

// Platillos y dulces típicos del municipio (gastronomía).
export const gastronomia = {
  platillos: [],
  dulces: [],
};

// Artesanías típicas del municipio.
export const artesanias = [];

export default atractivos;
