import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";

export function AtractivoCard({ atractivo, featured = false }) {
  return (
    <Link
      href={`/turismo/${atractivo.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] focus-visible:-translate-y-1",
        featured && "lg:col-span-2",
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          featured ? "aspect-[16/9]" : "aspect-[4/3]",
        )}
      >
        <Image
          src={atractivo.portada}
          alt={atractivo.nombre}
          fill
          sizes={featured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-guinda-deep)]/60 via-transparent to-transparent opacity-80"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          {atractivo.tipo}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl font-bold leading-snug text-[var(--color-text)] transition-colors group-hover:text-[var(--color-guinda)] md:text-2xl">
          {atractivo.nombre}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {atractivo.descripcionCorta}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-[var(--color-guinda)]" />
            {atractivo.ubicacion}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-guinda)]">
            Conocer más
            <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default AtractivoCard;
