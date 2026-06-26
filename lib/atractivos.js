// Atractivos turísticos del municipio. Fallback estático VACÍO: el portal carga
// los atractivos desde el CMS por slug. Los helpers se conservan.
export const atractivos = [];

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
