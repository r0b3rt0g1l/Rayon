// Hitos históricos del municipio (línea del tiempo).
//
// Fuente única para los componentes que los renderizan: el TimelineColumn
// interno de components/home/ConoceMunicipio.jsx (HitoItem usa solo `ano`,
// `titulo` y `descripcion`). El componente legacy LineaTiempo.jsx también
// consume `datoCurioso`, `imagen` y `escudo` si llega a usarse.
//
// Al clonar la plantilla: reemplaza el array por los hitos reales del municipio.
// Regla recomendada: cada afirmación respaldada por una fuente citable (deja la
// URL en un comentario adyacente). Mientras el array esté vacío, la sección de
// historia se muestra "en preparación".
//
// Shape de cada hito:
//   { ano, titulo, descripcion, datoCurioso?, imagen?, escudo?, align: 'left'|'right' }

export const hitos = [
  {
    ano: "Época precolombina",
    titulo: "Territorio ópata",
    descripcion:
      "El territorio del actual municipio estuvo habitado por los indígenas ópatas.",
    datoCurioso: null,
    imagen: null,
    align: "left",
  },
  {
    ano: "1637",
    titulo: "Exploración española",
    descripcion:
      "El general español Pedro de Perea explora y conquista la zona.",
    datoCurioso: null,
    imagen: null,
    align: "right",
  },
  {
    ano: "1639",
    titulo: "Fundación de la misión",
    descripcion:
      "El jesuita Fray Bartolomé Castaño funda la misión “Nuestra Señora de la (Purísima) Concepción”. El pueblo se llamó originalmente “La Purísima Concepción de Baviácora”.",
    datoCurioso: null,
    imagen: null,
    align: "left",
  },
  {
    ano: "1829",
    titulo: "Mención como ayuntamiento",
    descripcion:
      "Baviácora figura ya mencionada como ayuntamiento.",
    datoCurioso: null,
    imagen: null,
    align: "right",
  },
  {
    ano: "13 de mayo de 1931",
    titulo: "Municipio libre",
    descripcion:
      "Se rehabilita como municipio libre e independiente, tras haber dependido de Arizpe.",
    datoCurioso: null,
    imagen: null,
    align: "left",
  },
  {
    ano: "1932",
    titulo: "Creación de Aconchi",
    descripcion:
      "Se crea el municipio de Aconchi y Baviácora cede parte de su territorio.",
    datoCurioso: null,
    imagen: null,
    align: "right",
  },
];

export function getHitoByYear(year) {
  return hitos.find((h) => h.ano === String(year)) ?? null;
}

export default hitos;
