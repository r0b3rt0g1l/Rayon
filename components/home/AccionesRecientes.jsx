"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NoticiasCarousel } from "@/components/home/NoticiasCarousel";
import { GobiernoMunicipalBox } from "@/components/home/GobiernoMunicipalBox";

export function AccionesRecientes({ noticias = [], presidente = null }) {
  return (
    <section
      aria-label="Acciones recientes del gobierno"
      className="bg-[var(--color-surface)]"
    >
      <div className="mx-auto max-w-7xl px-4 pt-1 pb-3 sm:px-6 md:pt-2 md:pb-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <div>
            {/* Acento decorativo cobre (rayita corta) encima del título */}
            <span
              aria-hidden="true"
              className="mb-2 block h-1 w-10 rounded-full bg-[var(--color-dorado)]"
            />
            <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--color-text)] md:text-3xl">
              Acciones de Gobierno
            </h2>
          </div>
          <Link
            href="/acciones-de-gobierno"
            className="group inline-flex items-center gap-1.5 rounded-full bg-[var(--color-cta-bg)] px-5 py-2.5 text-sm font-semibold text-[var(--color-cta-text)] shadow-md transition-all duration-200 hover:scale-105 hover:bg-[var(--color-cta-bg-hover)] hover:shadow-lg"
          >
            Ver todas
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Dos columnas: carrusel de noticias (izq) + recuadro Gobierno Municipal (der) */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          <div className="lg:col-span-2">
            {noticias.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-12 text-center text-sm text-[var(--color-text-muted)]">
                Próximamente publicaremos las acciones, comunicados y obras del
                Gobierno Municipal.
              </div>
            ) : (
              <NoticiasCarousel noticias={noticias} />
            )}
          </div>

          <aside className="lg:col-span-1">
            <GobiernoMunicipalBox presidente={presidente} />
          </aside>
        </div>
      </div>
    </section>
  );
}

export default AccionesRecientes;
