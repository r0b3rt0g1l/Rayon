import { municipalConfig } from "./municipalConfig";

const SITE_URL = municipalConfig.servicios.siteUrl;

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
} = {}) {
  const fullTitle = title
    ? `${title} · ${municipalConfig.identidad.nombreOficial}`
    : `${municipalConfig.identidad.nombreCompleto} · Administración ${municipalConfig.identidad.administracion}`;

  const fullDescription =
    description ||
    `Portal institucional del ${municipalConfig.identidad.nombreOficial}, Sonora. Transparencia, gobierno, turismo y servicios al ciudadano. Administración ${municipalConfig.identidad.administracion}.`;

  const url = `${SITE_URL}${path}`;

  const openGraph = {
    type: "website",
    locale: "es_MX",
    url,
    siteName: municipalConfig.identidad.nombreOficial,
    title: fullTitle,
    description: fullDescription,
  };

  const twitter = {
    card: "summary_large_image",
    title: fullTitle,
    description: fullDescription,
  };

  // When a specific image is provided, use it.
  // When omitted, Next.js auto-detects app/opengraph-image.js.
  if (image) {
    const imageUrl = image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`;
    openGraph.images = [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: municipalConfig.identidad.nombreOficial,
      },
    ];
    twitter.images = [imageUrl];
  }

  return {
    title: fullTitle,
    description: fullDescription,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph,
    twitter,
  };
}

export const defaultViewport = {
  themeColor: municipalConfig.paleta.guinda,
  width: "device-width",
  initialScale: 1,
};
