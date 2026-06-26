import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock } from "lucide-react";

export function AtractivoHero({ atractivo }) {
  return (
    <header className="relative isolate min-h-[60vh] overflow-hidden bg-[var(--color-guinda-deep)] text-white">
      <Image
        src={atractivo.portada}
        alt={atractivo.nombre}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-guinda-deep)] via-[var(--color-guinda-deep)]/55 to-[var(--color-guinda-deep)]/15"
      />

      <div className="relative mx-auto flex min-h-[60vh] max-w-6xl flex-col justify-end px-4 py-12 sm:px-6 md:py-16">
        <Link
          href="/turismo"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-widest text-[var(--color-cream)] backdrop-blur-sm transition hover:border-white/40 hover:bg-white/15"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          Volver a turismo
        </Link>

        <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-dorado)] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-guinda-deep)]">
          {atractivo.tipo}
        </span>

        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          {atractivo.nombre}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[var(--color-cream)]/90 md:text-lg">
          {atractivo.descripcionCorta}
        </p>

        <dl className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-[var(--color-cream)]/85">
          <div className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[var(--color-dorado)]" aria-hidden="true" />
            <dt className="sr-only">Ubicación</dt>
            <dd>{atractivo.ubicacion}</dd>
          </div>
          <div className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-[var(--color-dorado)]" aria-hidden="true" />
            <dt className="sr-only">Horario</dt>
            <dd>{atractivo.horario}</dd>
          </div>
        </dl>
      </div>
    </header>
  );
}

export default AtractivoHero;
