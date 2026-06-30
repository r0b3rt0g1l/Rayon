// Cabildo y gabinete del municipio. Fallback estático VACÍO: el portal carga el
// cabildo desde el CMS por slug. Los helpers de derivación se conservan.
export const cabildo = [];

// Helpers de derivación. Aceptan cualquier lista de miembros (estática del
// fallback o dinámica del CMS) y devuelven la sub-vista correspondiente.
export function derivePresidente(lista) {
  if (!Array.isArray(lista)) return null;
  return lista.find((m) => m && m.tipo === 'presidente') || null;
}

export function deriveSindica(lista) {
  if (!Array.isArray(lista)) return null;
  return lista.find((m) => m && m.tipo === 'sindica') || null;
}

export function deriveRegidores(lista) {
  if (!Array.isArray(lista)) return [];
  return lista
    .filter((m) => m && m.tipo === 'regidor')
    .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
}

export function deriveDIF(lista) {
  if (!Array.isArray(lista)) return null;
  return lista.find((m) => m && m.tipo === 'dif') || null;
}

// Gabinete / administración (secretaría, tesorería, contraloría). No es cabildo
// electo; se muestra en el directorio pero no en la vista de Cabildo de /gobierno.
export function deriveGabinete(lista) {
  if (!Array.isArray(lista)) return [];
  return lista
    .filter((m) => m && ['secretario', 'tesorero', 'contralor'].includes(m.tipo))
    .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
}

// Subordinados del directorio: todos MENOS las cabezas ya derivadas (presidente y
// síndica principales). Excluye por REFERENCIA de objeto —no por `tipo`— para que un
// 2º presidente/síndico (cargo repetido, p. ej. "Enlace Presidencial") NO se descarte:
// entra al grid como subordinado, sin duplicar a la cabeza. La página ya quitó a los
// regidores antes de llamar aquí.
export function deriveSubordinados(lista) {
  if (!Array.isArray(lista)) return [];
  const cabezas = new Set(
    [derivePresidente(lista), deriveSindica(lista)].filter(Boolean),
  );
  return lista.filter((m) => m && !cabezas.has(m));
}

// Ordena la lista por jerarquía según la posición del `tipo` en `ordenTipos`
// (los tipos no listados van al final); desempate por `orden` del CMS.
export function ordenarPorJerarquia(lista, ordenTipos = []) {
  if (!Array.isArray(lista)) return [];
  const rango = (t) => {
    const i = ordenTipos.indexOf(t);
    return i === -1 ? ordenTipos.length : i;
  };
  return [...lista].sort((a, b) => {
    const ra = rango(a?.tipo);
    const rb = rango(b?.tipo);
    if (ra !== rb) return ra - rb;
    return (a?.orden ?? 0) - (b?.orden ?? 0);
  });
}

// ¿El nombre es un placeholder "[PENDIENTE: …]"? (el cargo está confirmado pero la
// persona aún está por designar). Se usa para mostrar "Por designar" en la UI.
export function isPendingName(nombre) {
  return typeof nombre === 'string' && nombre.startsWith('[PENDIENTE');
}

// Exports legacy: calculados sobre el array estático (ahora vacío).
export const presidente = derivePresidente(cabildo);
export const sindica = deriveSindica(cabildo);
export const regidores = deriveRegidores(cabildo);
export const dif = deriveDIF(cabildo);

export default cabildo;
