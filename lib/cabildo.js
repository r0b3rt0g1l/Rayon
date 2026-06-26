// Cabildo y gabinete de Baviácora — administración 2024-2027.
// Datos CONFIRMADOS desde el sitio oficial (baviacora.gob.mx, categorías Cabildo
// y "Gabinete y dependencias", nov-2025). NO inventar nombres: lo no confirmado
// queda fuera (regidores 4-6 no publicados, DIF sin titular confirmado, suplentes,
// correos y fotos individuales no publicados). El shape mantiene `tipo` en
// minúsculas para alinear con CabildoSection, DirectorioGrid y el mapeo del CMS.
export const cabildo = [
  {
    id: 'presidente',
    tipo: 'presidente',
    orden: 1,
    nombre: 'Jesús Francisco Martín Miranda Villa',
    cargo: 'Presidente Municipal',
    administracion: '2024-2027',
    comisiones: [],
    bio: null,
    email: null,
    telefono: null,
    foto: null,
  },
  {
    id: 'sindica',
    tipo: 'sindica',
    orden: 2,
    nombre: 'Sandra Amada Juárez Romero',
    cargo: 'Síndica Municipal',
    administracion: '2024-2027',
    comisiones: [],
    bio: null,
    email: null,
    telefono: null,
    foto: null,
  },
  {
    id: 'regidor-1',
    tipo: 'regidor',
    orden: 3,
    nombre: 'Francisco Antonio Villa Alday',
    cargo: 'Regidor',
    administracion: '2024-2027',
    comisiones: [],
    bio: null,
    email: null,
    telefono: null,
    foto: null,
  },
  {
    id: 'regidor-2',
    tipo: 'regidor',
    orden: 4,
    nombre: 'Francisca Edith Espinoza Montero',
    cargo: 'Regidora',
    administracion: '2024-2027',
    comisiones: [],
    bio: null,
    email: null,
    telefono: null,
    foto: null,
  },
  {
    id: 'regidor-3',
    tipo: 'regidor',
    orden: 5,
    // El sitio oficial escribe el apellido como "SANEZ CORDOVA"; probable forma
    // correcta "Sáenz Córdova". <<VERIFICAR ortografía oficial>>
    nombre: 'Francisca Aidee Sáenz Córdova',
    cargo: 'Regidora',
    administracion: '2024-2027',
    comisiones: [],
    bio: null,
    email: null,
    telefono: null,
    foto: null,
  },
  {
    id: 'secretario',
    tipo: 'secretario',
    orden: 6,
    nombre: 'José Luis Félix Barceló',
    cargo: 'Secretario Municipal',
    administracion: '2024-2027',
    comisiones: [],
    bio: null,
    email: null,
    telefono: null,
    foto: null,
  },
  {
    id: 'tesorera',
    tipo: 'tesorero',
    orden: 7,
    nombre: 'María Esmeralda Miranda Ahumada',
    cargo: 'Tesorera Municipal',
    administracion: '2024-2027',
    comisiones: [],
    bio: null,
    email: null,
    telefono: null,
    foto: null,
  },
  {
    id: 'contralor',
    tipo: 'contralor',
    orden: 8,
    nombre: 'Francisca Elizabeth Corella García',
    cargo: 'Órgano Interno de Control',
    administracion: '2024-2027',
    comisiones: [],
    bio: null,
    email: null,
    telefono: null,
    foto: null,
  },
];

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

// Exports legacy: calculados sobre el array estático.
export const presidente = derivePresidente(cabildo);
export const sindica = deriveSindica(cabildo);
export const regidores = deriveRegidores(cabildo);
export const dif = deriveDIF(cabildo);

export default cabildo;
