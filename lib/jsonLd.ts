// Structured data (schema.org JSON-LD) para el portal municipal.
// La organización (GovernmentOrganization) se inyecta site-wide en app/layout.js;
// los BreadcrumbList se inyectan por página vía <Breadcrumbs> (components/seo/JsonLd).
import { municipalConfig } from "@/lib/municipalConfig";

const { identidad, contacto, redes, servicios } = municipalConfig;
const SITE_URL: string = servicios.siteUrl;

/** GovernmentOrganization del Ayuntamiento (sin teléfono/correo: cero contacto directo). */
export function governmentOrganizationLd(): Record<string, unknown> {
  const sameAs = [redes.facebook, redes.instagram, redes.twitter, redes.youtube].filter(
    (u: unknown): u is string => typeof u === "string" && u.length > 0,
  );

  return {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: identidad.nombreCompleto,
    alternateName: identidad.nombreOficial,
    url: SITE_URL,
    logo: `${SITE_URL}/escudo-baviacora-hd.png`,
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${identidad.nombreCorto}, ${identidad.estado}`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: contacto.direccion || undefined,
      addressLocality: identidad.nombreCorto,
      addressRegion: identidad.estado,
      postalCode: contacto.cp || undefined,
      addressCountry: "MX",
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/** BreadcrumbList a partir de un trail [{name, path}] (path relativo al sitio). */
export function breadcrumbLd(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
