import { breadcrumbLd } from "@/lib/jsonLd";

/** Renderiza un bloque de structured data JSON-LD. */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * BreadcrumbList por página. Uso:
 *   <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Gobierno", path: "/gobierno" }]} />
 * No renderiza UI visible (solo el <script> de structured data).
 */
export function Breadcrumbs({ items }) {
  return <JsonLd data={breadcrumbLd(items)} />;
}

export default JsonLd;
