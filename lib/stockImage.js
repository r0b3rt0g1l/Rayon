// Lorem Flickr (https://loremflickr.com) — tomamos fotos de Flickr filtradas por tags.
// La query se sanitiza y se manda como tags separados por coma; el "lock" es
// un hash estable del input para que la misma combinacion {query, w, h}
// siempre devuelva la misma foto (clave para SSR/ISR sin saltos visuales).
//
// Si la calidad de Flickr no convence en un caso especifico, sustituye la
// URL por una imagen local en /public/images/stock/<nombre>.jpg.

const BASE = "https://loremflickr.com";
const COMBINING_MARKS = /[̀-ͯ]/g;
const SEPARATORS = /[\s,]+/;

function sanitizeTags(query) {
  return String(query ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .replace(/[^a-z0-9\s,-]+/g, " ")
    .split(SEPARATORS)
    .filter(Boolean)
    .join(",");
}

function hashCode(input) {
  let h = 0;
  const str = String(input);
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h) || 1;
}

/**
 * Devuelve una URL estable de Lorem Flickr a partir de tags.
 *
 * @param {string} query Tags separados por espacio o coma. Ej. "sonora mexico mountain".
 * @param {number} [w=1200] Ancho.
 * @param {number} [h=600] Alto.
 * @param {number} [lock] Seed manual; por defecto se deriva del input.
 * @returns {string} URL absoluta.
 */
export function getStockImage(query, w = 1200, h = 600, lock) {
  const tags = sanitizeTags(query) || "mexico";
  const seed = lock ?? hashCode(`${tags}-${w}-${h}`);
  return `${BASE}/${w}/${h}/${tags}?lock=${seed}`;
}
