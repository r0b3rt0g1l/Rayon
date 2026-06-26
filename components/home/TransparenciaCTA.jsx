import Link from "next/link";
import { Users, Network, BarChart3, ArrowRight } from "lucide-react";
import { municipalConfig } from "@/lib/municipalConfig";

const pillars = [
  { icon: Users, label: "Cabildo" },
  { icon: Network, label: "Estructura Orgánica" },
  { icon: BarChart3, label: "SEvAC" },
];

export function TransparenciaCTA() {
  return (
    <section
      aria-label="Transparencia institucional"
      className="relative isolate overflow-hidden bg-[var(--color-guinda)] text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_85%_15%,rgba(212,160,23,0.6)_0,transparent_45%),radial-gradient(circle_at_15%_85%,white_0,transparent_45%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-cream)] backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-dorado)]"
            />
            Transparencia institucional
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Transparencia para el pueblo de {municipalConfig.identidad.nombreCorto}
          </h2>
          <p className="mt-4 max-w-xl text-base text-[var(--color-cream)]/85 md:text-lg">
            Información pública, leyes, evaluaciones SEvAC y el organigrama
            completo del Ayuntamiento — todo en un solo lugar.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/transparencia"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-cta-bg)] px-6 py-3 text-sm font-semibold text-[var(--color-cta-text)] shadow-lg transition hover:bg-[var(--color-cta-bg-hover)]"
            >
              Ir al Hub de Transparencia
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4">
          {pillars.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex flex-col items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm transition hover:border-[var(--color-dorado)]/60 hover:bg-white/10"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-dorado)] text-[var(--color-guinda-deep)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-sm font-semibold text-white">{label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TransparenciaCTA;
