import { municipalConfig } from "@/lib/municipalConfig";

const SITE_URL = municipalConfig.servicios.siteUrl;

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
