import { Breadcrumbs } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { municipalConfig } from "@/lib/municipalConfig";
import { getImagenes } from "@/lib/content";
import { GaleriaGrid } from "@/components/galeria/GaleriaGrid";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Galería",
  description: `Galería fotográfica del ${municipalConfig.identidad.nombreOficial}: eventos, lugares, funcionarios y momentos destacados.`,
  path: "/galeria",
});

export default async function GaleriaPage() {
  const imagenes = await getImagenes();

  return (
    <main className="flex flex-1 flex-col">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Galería", path: "/galeria" }]} />
      <section className="relative bg-[var(--color-guinda)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h1 className="font-display text-4xl font-bold text-[var(--color-cream)] md:text-5xl">
            Galería
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--color-cream)]/85">
            Imágenes del {municipalConfig.identidad.nombreOficial}: eventos,
            lugares, funcionarios y momentos destacados.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        {imagenes.length === 0 ? (
          <div className="rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600">
              No hay imágenes disponibles todavía. Pronto se publicará contenido
              aquí.
            </p>
          </div>
        ) : (
          <GaleriaGrid imagenes={imagenes} />
        )}
      </section>
    </main>
  );
}
