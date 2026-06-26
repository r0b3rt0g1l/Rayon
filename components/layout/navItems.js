import { municipalConfig } from "@/lib/municipalConfig";

export const navItems = [
  { label: "Inicio", href: "/" },
  {
    label: "Gobierno",
    children: [
      { label: "Directorio", href: "/gobierno/directorio" },
      { label: "Cabildo", href: "/gobierno/cabildo" },
      { label: "Plan Municipal", href: "/gobierno/plan-municipal" },
    ],
  },
  {
    label: "Transparencia",
    href: municipalConfig.enlacesExternos.transparenciaSonora,
    external: true,
  },
  { label: "SEvAC", href: "/transparencia/sevac" },
  { label: "Acciones de Gobierno", href: "/acciones-de-gobierno" },
  { label: "Turismo", href: "/turismo" },
  { label: "Contacto", href: "/contacto" },
];
