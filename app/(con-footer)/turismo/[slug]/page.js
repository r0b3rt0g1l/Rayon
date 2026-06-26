import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { municipalConfig } from "@/lib/municipalConfig";
import {
  getAtractivos,
  getAtractivoPorSlug,
  getAtractivosCercanos,
} from "@/lib/content";
import { AtractivoHero } from "@/components/turismo/AtractivoHero";
import { GaleriaLightbox } from "@/components/turismo/GaleriaLightbox";
import { MapaEmbed } from "@/components/turismo/MapaEmbed";
import { AtractivoCard } from "@/components/turismo/AtractivoCard";

export const revalidate = 86400;

export async function generateStaticParams() {
  const atractivos = await getAtractivos();
  return atractivos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const atractivo = await getAtractivoPorSlug(slug);
  if (!atractivo) return buildMetadata({ title: "Atractivo no encontrado", noIndex: true });

  return buildMetadata({
    title: atractivo.nombre,
    description: atractivo.descripcionCorta,
    path: `/turismo/${atractivo.slug}`,
    image: atractivo.portada,
  });
}

export default async function AtractivoPage({ params }) {
  const { slug } = await params;
  const atractivo = await getAtractivoPorSlug(slug);

  if (!atractivo) notFound();

  const cercanos = await getAtractivosCercanos(slug, 3);

  return (
    <main className="flex flex-1 flex-col">
      <Breadcrumbs
        items={[
          { name: "Inicio", path: "/" },
          { name: "Turismo", path: "/turismo" },
          { name: atractivo.nombre, path: `/turismo/${atractivo.slug}` },
        ]}
      />
      <AtractivoHero atractivo={atractivo} />

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="space-y-12">
            <article className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
                Sobre este atractivo
              </p>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Conoce {atractivo.nombre}
              </h2>
              <p className="font-body text-[1.0625rem] leading-[1.75] text-[var(--color-text)]">
                {atractivo.descripcionLarga}
              </p>
            </article>

            <section aria-label={`Galería de ${atractivo.nombre}`} className="space-y-5">
              <header>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
                  Galería
                </p>
                <h3 className="mt-1 font-display text-xl font-bold tracking-tight md:text-2xl">
                  Imágenes para inspirar tu visita
                </h3>
              </header>
              <GaleriaLightbox images={atractivo.galeria} />
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
                Información práctica
              </p>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                    Tipo
                  </dt>
                  <dd className="mt-1 font-semibold text-[var(--color-text)]">
                    {atractivo.tipo}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                    Ubicación
                  </dt>
                  <dd className="mt-1 text-[var(--color-text)]">
                    {atractivo.ubicacion}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                    Horario / temporada
                  </dt>
                  <dd className="mt-1 text-[var(--color-text)]">
                    {atractivo.horario ?? "Por confirmar — coordinar con el municipio."}
                  </dd>
                </div>
              </dl>
            </div>

            {atractivo.coordenadas?.lat != null &&
            atractivo.coordenadas?.lon != null ? (
              <MapaEmbed
                lat={atractivo.coordenadas.lat}
                lon={atractivo.coordenadas.lon}
                label={`${atractivo.nombre} · ${municipalConfig.identidad.nombreCorto}`}
              />
            ) : (
              <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white p-6 text-sm italic text-[var(--color-text-muted)] shadow-[var(--shadow-card)]">
                Ubicación exacta por confirmar con el municipio.
              </div>
            )}
          </aside>
        </div>
      </section>

      {cercanos.length > 0 && (
        <section
          aria-label="Atractivos cercanos"
          className="border-t border-[var(--color-border)] bg-[var(--color-bg)]"
        >
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
                  Sigue explorando
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">
                  Otros atractivos de {municipalConfig.identidad.nombreCorto}
                </h3>
              </div>
              <Link
                href="/turismo"
                className="group inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--color-guinda)]/20 bg-[var(--color-guinda)]/5 px-4 py-2 text-sm font-semibold text-[var(--color-guinda)] transition hover:bg-[var(--color-guinda)] hover:text-white"
              >
                Ver todos
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cercanos.map((a) => (
                <li key={a.slug} className="flex">
                  <AtractivoCard atractivo={a} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
