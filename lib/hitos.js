// Hitos históricos del municipio (línea del tiempo). Fallback estático VACÍO:
// mientras esté vacío, la sección de historia se muestra "en preparación".
// Al cargar los hitos reales del municipio, respaldar cada afirmación con fuente.
//
// Shape de cada hito:
//   { ano, titulo, descripcion, datoCurioso?, imagen?, escudo?, align: 'left'|'right' }

export const hitos = [
  {
    ano: '1638',
    titulo: 'Fundación como misión jesuita',
    descripcion:
      'El misionero jesuita Pedro Pantoja funda Nuestra Señora del Rosario de Nacameri, primer asentamiento formal en la zona habitada por los Pima Bajos.',
  },
  {
    ano: '1825',
    titulo: 'Nombre cambiado a Rayón',
    descripcion:
      'El pueblo adopta el nombre de Rayón en honor al general Ignacio López Rayón, héroe de la Independencia mexicana.',
  },
  {
    ano: '1850',
    titulo: 'Categoría de villa',
    descripcion:
      'Rayón obtiene la categoría de villa y se consolida como municipio del distrito de Ures, en el centro de Sonora.',
  },
  {
    ano: '1882',
    titulo: 'Registros civiles',
    descripcion:
      'Se inician los registros civiles formales en el municipio, marcando el inicio de la administración moderna de Rayón.',
  },
  {
    ano: '2024',
    titulo: 'Administración 2024-2027',
    descripcion:
      'El H. Ayuntamiento de Rayón inicia una nueva etapa de modernización y servicios digitales para sus ciudadanos.',
  },
];

export function getHitoByYear(year) {
  return hitos.find((h) => h.ano === String(year)) ?? null;
}

export default hitos;
