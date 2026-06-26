// Hitos históricos del municipio (línea del tiempo). Fallback estático VACÍO:
// mientras esté vacío, la sección de historia se muestra "en preparación".
// Al cargar los hitos reales del municipio, respaldar cada afirmación con fuente.
//
// Shape de cada hito:
//   { ano, titulo, descripcion, datoCurioso?, imagen?, escudo?, align: 'left'|'right' }

export const hitos = [];

export function getHitoByYear(year) {
  return hitos.find((h) => h.ano === String(year)) ?? null;
}

export default hitos;
