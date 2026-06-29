import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { formatFechaLarga } from "@/lib/dates";

export function NoticiaHero({ item, kind = "noticia", backHref = "/acciones-de-gobierno" }) {
  const tieneFoto = item.imagen && /^https?:\/\//.test(item.imagen);
  return (
    <header className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 md:py-12">
        {/* Banner de altura fija y uniforme. La foto se muestra COMPLETA al centro
            (object-contain) y el espacio sobrante se rellena con la MISMA foto
            difuminada + oscurecida (blurred backdrop), evitando barras negras. */}
        <div
          className={`relative isolate flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl border border-[var(--color-border)] md:min-h-[420px] ${
            tieneFoto
              ? "bg-[var(--color-guinda-deep)] text-white"
              : "bg-[var(--color-bg)] text-[var(--color-text)]"
          }`}
        >
          {tieneFoto && (
            <>
              {/* Capa 1: fondo difuminado (misma foto, cubre todo, borrosa) */}
              <Image
                src={item.imagen}
                alt=""
                aria-hidden="true"
                fill
                quality={75}
                sizes="(min-width: 896px) 896px, 100vw"
                className="-z-10 scale-110 object-cover blur-2xl"
              />
              {/* Capa 2: oscurece SOLO el fondo (queda debajo de la foto central).
                  Suave (/20) para que se aprecie el color de la foto difuminada;
                  la legibilidad del título la da el degradado inferior (capa 4). */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-black/20"
              />
              {/* Capa 3: foto COMPLETA al centro, sin recortar ni deformar */}
              <Image
                src={item.imagen}
                alt={item.titulo}
                fill
                priority
                quality={85}
                sizes="(min-width: 896px) 896px, 100vw"
                className="-z-10 object-contain"
              />
              {/* Capa 4: degradado de legibilidad para el texto */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
              />
            </>
          )}

          <div className="relative z-10 mx-auto w-full max-w-4xl px-5 py-7 sm:px-8 md:py-9">
            <Link
              href={backHref}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-widest backdrop-blur-sm transition ${
                tieneFoto
                  ? "border-white/20 bg-white/5 text-[var(--color-cream)] hover:border-white/40 hover:bg-white/15"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-dorado)]/40 hover:bg-[var(--color-dorado)]/5"
              }`}
            >
              <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
              Volver a {kind === "comunicado" ? "comunicados" : "acciones de gobierno"}
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-dorado)] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
                <Tag aria-hidden="true" className="h-3 w-3" />
                {item.categoria}
              </span>
              {item.autor && (
                <span
                  className={`text-[11px] uppercase tracking-widest ${
                    tieneFoto ? "text-[var(--color-cream)]/70" : "text-[var(--color-text-muted)]"
                  }`}
                >
                  · {item.autor}
                </span>
              )}
            </div>

            <h1
              className={`mt-4 text-balance font-display text-2xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl ${
                tieneFoto ? "text-white" : "text-[var(--color-text)]"
              }`}
            >
              {item.titulo}
            </h1>

            {item.extracto && (
              <p
                className={`mt-4 max-w-3xl text-balance text-sm md:text-lg ${
                  tieneFoto ? "text-[var(--color-cream)]/90" : "text-[var(--color-text-secondary)]"
                }`}
              >
                {item.extracto}
              </p>
            )}

            <dl
              className={`mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm ${
                tieneFoto ? "text-[var(--color-cream)]/85" : "text-[var(--color-text-secondary)]"
              }`}
            >
              <div className="inline-flex items-center gap-2">
                <Calendar aria-hidden="true" className="h-4 w-4" />
                <dt className="sr-only">Fecha de publicación</dt>
                <dd>
                  <time dateTime={item.fecha}>{formatFechaLarga(item.fecha)}</time>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NoticiaHero;
