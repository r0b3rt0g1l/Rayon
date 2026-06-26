export const categoriasNoticias = [
  "Obras Públicas",
  "Cultura",
  "Salud",
  "Educación",
  "Seguridad",
  "Turismo",
  "Desarrollo Social",
];

export const categoriasComunicados = [
  "Tesorería",
  "Secretaría",
  "Aviso Oficial",
  "Convocatoria",
];

// TODO_MUNICIPIO: noticias — fallback estático de noticias. Reemplazar por las
// notas reales del Ayuntamiento, o dejar vacío y servirlas desde el CMS
// (lib/cms.js -> getNoticiasFromCMS). Cada entrada debe seguir la forma:
//   { slug, titulo, extracto, categoria, fecha, autor, imagen, contenido }
export const noticias = [];

// TODO_MUNICIPIO: comunicados — fallback estático de comunicados oficiales.
// Misma forma que las noticias.
export const comunicados = [];

export function getNoticiaPorSlug(slug) {
  return (
    noticias.find((n) => n.slug === slug) ||
    comunicados.find((c) => c.slug === slug) ||
    null
  );
}

export function getNoticiasRecientes(limit = 3) {
  return [...noticias]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, limit);
}

export function getNoticiasRelacionadas(slugActual, limit = 3) {
  return noticias
    .filter((n) => n.slug !== slugActual)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, limit);
}

const noticiasModule = { noticias, comunicados, getNoticiaPorSlug, getNoticiasRecientes, getNoticiasRelacionadas };
export default noticiasModule;
