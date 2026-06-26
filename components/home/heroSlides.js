import { heroImages } from "@/lib/unsplashImages";
import { municipalConfig } from "@/lib/municipalConfig";

// Slides del hero (fallback estático). Al clonar la plantilla, ajusta el copy
// y agrega más entradas a META manteniendo los `id` alineados con `heroImages`
// en lib/unsplashImages.js. La identidad se toma de municipalConfig.
const META = [
  {
    id: "bienvenida",
    eyebrow: `${municipalConfig.identidad.nombreCorto}, ${municipalConfig.identidad.estado}`,
    title: `Bienvenidos a ${municipalConfig.identidad.nombreCorto}`,
    subtitle:
      "Pueblo de origen ópata y misión jesuita de 1639, en la región del Río Sonora.",
    cta: { label: "Conoce el Municipio", href: "/turismo" },
    align: "center",
  },
  {
    id: "gobierno",
    eyebrow: `Administración ${municipalConfig.identidad.administracion}`,
    title: municipalConfig.identidad.nombreCompleto,
    subtitle:
      "Una administración cercana a la gente, con transparencia, rendición de cuentas y trabajo en equipo.",
    cta: { label: "Conoce el Gobierno", href: "/gobierno/directorio" },
    align: "center",
  },
];

const imagesById = Object.fromEntries(heroImages.map((i) => [i.id, i]));

export const heroSlides = META.map((meta) => {
  const img = imagesById[meta.id];
  return {
    ...meta,
    image: img.src,
    alt: img.alt,
    credit: img.credit,
  };
});

export default heroSlides;
