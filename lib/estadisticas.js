// Fallback estático de las estadísticas del home (Baviácora). Se muestra MIENTRAS
// el CMS no tenga estadísticas propias cargadas (sección "Estadísticas" del admin).
// En cuanto el municipio cargue las suyas, el CMS tiene prioridad
// (ver lib/content/index.ts → getEstadisticas).
//
// Per-repo (multi-tenant): al clonar a otro municipio, ajustar estos valores o
// dejar el arreglo vacío. Los 3 primeros son datos VERIFICADOS (de municipalConfig);
// los otros 3 quedan "Por designar" hasta confirmarse. Iconos: PNG en /public.
import { municipalConfig } from "./municipalConfig";

const { poblacion2020, superficieKm2, comunidades } = municipalConfig.datos;

export const estadisticas = [
  {
    id: "default-poblacion",
    titulo: "Población",
    valor: poblacion2020 ? poblacion2020.toLocaleString("es-MX") : "Por designar",
    iconoUrl: "/icons/estadisticas/student.png",
    orden: 0,
  },
  {
    id: "default-superficie",
    titulo: "Superficie",
    valor: superficieKm2 ? `${superficieKm2} km²` : "Por designar",
    iconoUrl: "/icons/estadisticas/drought.png",
    orden: 1,
  },
  {
    id: "default-comunidades",
    titulo: "Comunidades",
    valor: comunidades != null ? String(comunidades) : "Por designar",
    iconoUrl: "/icons/estadisticas/multiple.png",
    orden: 2,
  },
  {
    id: "default-programas",
    titulo: "Programas",
    valor: "Por designar",
    iconoUrl: "/icons/estadisticas/to-do-list.png",
    orden: 3,
  },
  {
    id: "default-obras",
    titulo: "Obras realizadas",
    valor: "Por designar",
    iconoUrl: "/icons/estadisticas/pencil.png",
    orden: 4,
  },
  {
    id: "default-inversion",
    titulo: "Inversión pública",
    valor: "Por designar",
    iconoUrl: "/icons/estadisticas/deal.png",
    orden: 5,
  },
];

export default estadisticas;
