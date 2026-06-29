import Image from "next/image";
import { getContenido } from "@/lib/content";

// Banner hero reutilizable y editable desde el CMS por `clave`.
// - CON imagen de fondo: foto + degradado oscuro + texto blanco (legibilidad sobre la
//   fotografía, igual que el hero del home).
// - SIN imagen: banner claro (paleta blanco/cobre) — fondo --color-surface con borde
//   inferior, título en --color-text y descripción en gris secundario.
// Si no hay contenido utilizable (ni del CMS ni del fallback) → no se renderiza (null).
export async function BannerHero({
  clave,
  fallback = null,
  className = "",
  heading = "h2",
}) {
  const c = (clave ? await getContenido(clave) : null) ?? fallback;
  if (!c || (!c.titulo && !c.imagenUrl)) return null;
  const Heading = heading;
  const hasImage = Boolean(c.imagenUrl);

  return (
    <section
      aria-label={c.titulo || "Banner"}
      className={`${
        hasImage
          ? "relative isolate overflow-hidden bg-[var(--color-guinda-deep)]"
          : "border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      } ${className}`}
    >
      {hasImage ? (
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
      <div
        className={`mx-auto max-w-7xl px-4 py-16 text-left sm:px-6 md:py-24 ${
          hasImage ? "text-white" : ""
        }`}
      >
        {c.titulo ? (
          <Heading
            className={`text-3xl font-bold leading-tight tracking-tight text-balance md:text-4xl lg:text-5xl ${
              hasImage ? "" : "text-[var(--color-text)]"
            }`}
          >
            {c.titulo}
          </Heading>
        ) : null}
        {c.descripcion ? (
          <p
            className={`mt-3 max-w-2xl text-base leading-relaxed md:text-lg ${
              hasImage ? "text-white/90" : "text-[var(--color-text-secondary)]"
            }`}
          >
            {c.descripcion}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export default BannerHero;
