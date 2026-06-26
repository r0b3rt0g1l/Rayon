import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CardPreview } from "@/components/noticias/CardPreview";

export function MasNoticias({ items = [], basePath = "/acciones-de-gobierno/noticias" }) {
  if (!items.length) return null;

  return (
    <section
      aria-label="Más noticias relacionadas"
      className="border-t border-[var(--color-border)] bg-[var(--color-bg)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
              Sigue informado
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Más publicaciones
            </h2>
          </div>
          <Link
            href="/acciones-de-gobierno"
            className="group inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--color-guinda)]/20 bg-[var(--color-guinda)]/5 px-4 py-2 text-sm font-semibold text-[var(--color-guinda)] transition hover:bg-[var(--color-guinda)] hover:text-white"
          >
            Ver todas
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug} className="flex">
              <CardPreview item={item} basePath={basePath} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default MasNoticias;
