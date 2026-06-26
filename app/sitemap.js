import { atractivos } from "@/lib/atractivos";
import { municipalConfig } from "@/lib/municipalConfig";

const SITE_URL = municipalConfig.servicios.siteUrl;

export default function sitemap() {
  const now = new Date();

  const fixed = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/gobierno", priority: 0.9, changeFrequency: "monthly" },
    { path: "/gobierno/directorio", priority: 0.8, changeFrequency: "monthly" },
    {
      path: "/gobierno/cabildo",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: "/gobierno/plan-municipal",
      priority: 0.7,
      changeFrequency: "monthly",
    },
    { path: "/acciones-de-gobierno", priority: 0.9, changeFrequency: "daily" },
    { path: "/transparencia", priority: 0.8, changeFrequency: "monthly" },
    {
      path: "/transparencia/sevac",
      priority: 0.6,
      changeFrequency: "monthly",
    },
    { path: "/turismo", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contacto", priority: 0.7, changeFrequency: "monthly" },
  ];

  const turismoSlugs = atractivos.map((a) => ({
    path: `/turismo/${a.slug}`,
    priority: 0.7,
    changeFrequency: "yearly",
  }));

  return [...fixed, ...turismoSlugs].map((entry) => ({
    url: `${SITE_URL}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
