import Image from "next/image";
import { getContenido } from "@/lib/content";

// Banner hero reutilizable y editable desde el CMS por `clave`: imagen de fondo
// (opcional) + título + texto encima. Estilo minimalista como el hero: texto
// blanco, alineado a la izquierda, sobre guinda-deep. Si no hay contenido
// utilizable (ni del CMS ni del fallback) → no se renderiza (return null).
export async function BannerHero({
  clave,
  fallback = null,
  className = "",
  heading = "h2",
}) {
  const c = (clave ? await getContenido(clave) : null) ?? fallback;
  if (!c || (!c.titulo && !c.imagenUrl)) return null;
  const Heading = heading;

  return (
    <section
      aria-label={c.titulo || "Banner"}
      className={`relative isolate overflow-hidden bg-[var(--color-guinda-deep)] ${className}`}
    >
      {c.imagenUrl ? (
        <>
          <Image
            src={c.imagenUrl}
            alt=""
            fill
            sizes="100vw"
            className="-z-10 object-cover object-center"
          />
          {/* Degradado solo cuando hay imagen, para legibilidad del texto. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/40 to-black/20"
          />
        </>
      ) : null}
      <div className="mx-auto max-w-7xl px-4 py-16 text-left text-white sm:px-6 md:py-24">
        {c.titulo ? (
          <Heading className="text-3xl font-bold leading-tight tracking-tight text-balance md:text-4xl lg:text-5xl">
            {c.titulo}
          </Heading>
        ) : null}
        {c.descripcion ? (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            {c.descripcion}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export default BannerHero;
