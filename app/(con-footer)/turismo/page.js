import { Breadcrumbs } from "@/components/seo/JsonLd";
import { UtensilsCrossed, Hammer } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { municipalConfig } from "@/lib/municipalConfig";
import { gastronomia, artesanias } from "@/lib/atractivos";
import { getAtractivos } from "@/lib/content";
import { AtractivoCard } from "@/components/turismo/AtractivoCard";
import { BannerHero } from "@/components/common/BannerHero";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Turismo",
  description: `Atractivos turísticos del ${municipalConfig.identidad.nombreOficial}: patrimonio colonial, naturaleza y la Ruta del Río Sonora.`,
  path: "/turismo",
});

export default async function TurismoPage() {
  const atractivos = await getAtractivos();
  return (
    <main className="flex flex-1 flex-col">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Turismo", path: "/turismo" }]} />
      <BannerHero
        clave="banner-turismo"
        heading="h1"
        fallback={{
          clave: "banner-turismo",
          titulo: `Descubre ${municipalConfig.identidad.nombreCorto}`,
          descripcion:
            "Patrimonio colonial de la época de la misión, naturaleza del Río Sonora y monumentos del municipio. Baviácora forma parte de la Ruta del Río Sonora (COFETUR) y, desde 2011, de la Ruta Gastronómica.",
          imagenUrl: null,
          activo: true,
        }}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        <h2 className="mb-8 font-display text-2xl font-bold tracking-tight text-[var(--color-text)] md:text-3xl">
          Atractivos turísticos
        </h2>
        {atractivos.length === 0 ? (
          <p className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-8 text-center text-sm text-[var(--color-text-muted)]">
            El inventario turístico está en preparación.
          </p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {atractivos.map((atractivo) => (
              <li key={atractivo.slug} className="flex">
                <AtractivoCard atractivo={atractivo} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section
        aria-label="Gastronomía y artesanías"
        className="bg-[var(--color-bg)] border-t border-[var(--color-border)]"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-guinda)]/10 text-[var(--color-guinda)]">
                <UtensilsCrossed className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
                  Sabores de {municipalConfig.identidad.nombreCorto}
                </p>
                <h2 className="font-display text-xl font-bold text-[var(--color-text)] md:text-2xl">
                  Gastronomía tradicional
                </h2>
              </div>
            </div>
            {gastronomia.platillos.length === 0 &&
            gastronomia.dulces.length === 0 ? (
              <p className="mt-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Baviácora forma parte de la Ruta Gastronómica del Río Sonora
                (desde 2011). El catálogo de platillos y dulces típicos del
                municipio está en preparación.
              </p>
            ) : (
              <div className="mt-6 grid gap-4">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Platillos típicos
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {gastronomia.platillos.map((p) => (
                      <li
                        key={p}
                        className="rounded-full bg-[var(--color-bg)] px-3 py-1 text-sm text-[var(--color-text)]"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Conservas y dulces
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {gastronomia.dulces.map((d) => (
                      <li
                        key={d}
                        className="rounded-full bg-[var(--color-dorado)]/10 px-3 py-1 text-sm text-[var(--color-dorado-700)]"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-dorado)]/15 text-[var(--color-dorado-700)]">
                <Hammer className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-dorado-700)]">
                  Hecho a mano
                </p>
                <h2 className="font-display text-xl font-bold text-[var(--color-text)] md:text-2xl">
                  Artesanías locales
                </h2>
              </div>
            </div>
            {artesanias.length === 0 ? (
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                El catálogo de artesanías típicas de{" "}
                {municipalConfig.identidad.nombreCorto} está en preparación.
              </p>
            ) : (
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {artesanias.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm font-medium text-[var(--color-text)]"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-dorado)]" />
                    {a}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
