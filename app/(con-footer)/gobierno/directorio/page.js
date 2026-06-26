import { Breadcrumbs } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { municipalConfig } from "@/lib/municipalConfig";
import { getCabildo } from "@/lib/content";
import { ordenarPorJerarquia } from "@/lib/cabildo";
import { DirectorioOrganigrama } from "@/components/gobierno/DirectorioOrganigrama";
import { PageHeader } from "@/components/common/PageHeader";

// Bajamos el revalidate de 3600 → 60 ahora que el directorio se administra
// desde el CMS y los cambios deben verse rápido en producción.
export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Directorio del Gobierno Municipal",
  description: `Directorio oficial del ${municipalConfig.identidad.nombreCompleto}: Presidencia, Sindicatura, gabinete (Secretaría, Tesorería y Contraloría) y comisarías. Las Regidurías se consultan en la sección Cabildo. Administración ${municipalConfig.identidad.administracion}.`,
  path: "/gobierno/directorio",
});

// Orden de jerarquía para el directorio (por campo `tipo`). Los regidores NO se
// listan aquí (se ven en /gobierno/cabildo); además se filtran explícitamente abajo.
const ORDEN_DIRECTORIO = [
  "presidente",
  "sindica",
  "secretario",
  "tesorero",
  "contralor",
  "cabildo", // OTRO (p. ej. comisarías)
];

export default async function DirectorioPage() {
  // getCabildo() ya resuelve CMS-o-fallback (ver lib/content).
  // El Directorio excluye a las Regidurías (siguen en /gobierno/cabildo y en el
  // CMS; aquí solo se ocultan). Es un filtro de visualización, no borra datos.
  const lista = ordenarPorJerarquia(await getCabildo(), ORDEN_DIRECTORIO).filter(
    (p) => p.tipo !== "regidor",
  );

  return (
    <main className="flex flex-1 flex-col">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Gobierno", path: "/gobierno" }, { name: "Directorio", path: "/gobierno/directorio" }]} />
      <PageHeader
        clave="header-directorio"
        eyebrow="Directorio"
        fallbackTitulo="Directorio del Gobierno Municipal"
        fallbackDescripcion={`Conoce a las personas que integran el Gobierno Municipal de ${municipalConfig.identidad.nombreCorto}: Presidencia, Sindicatura, el gabinete (Secretaría, Tesorería y Contraloría) y las comisarías de la Administración ${municipalConfig.identidad.administracion}. Las Regidurías se consultan en la sección Cabildo. Selecciona una persona para ver sus datos.`}
        bg="white"
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        <DirectorioOrganigrama people={lista} />
      </section>
    </main>
  );
}
