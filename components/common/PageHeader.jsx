import { getContenido } from "@/lib/content";

// Encabezado de página reutilizable y editable desde el CMS por `clave`.
// Estilo claro (paleta blanco/cobre): fondo blanco-hueso (--color-surface) con
// borde inferior, título oscuro, eyebrow cobre, descripción gris, alineado a la
// izquierda. Solo título+descripción vienen del CMS; si la clave no existe (o está
// inactiva) usa el fallback del repo.
// El eyebrow/badge/ancho y el contenido extra (children) se pasan por props.
export async function PageHeader({
  clave,
  fallbackTitulo,
  fallbackDescripcion = null,
  eyebrow = null,
  badge = null,
  narrow = false,
  compact = false,
  children = null,
}) {
  const c = clave ? await getContenido(clave) : null;
  const titulo = c?.titulo || fallbackTitulo;
  const descripcion =
    c?.descripcion !== undefined && c?.descripcion !== null
      ? c.descripcion
      : fallbackDescripcion;

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div
        className={`mx-auto ${
          narrow ? "max-w-5xl" : "max-w-7xl"
        } px-4 text-left sm:px-6 ${compact ? "py-8 md:py-10" : "py-12 md:py-16"}`}
      >
        {badge
          ? badge
          : eyebrow
            ? (
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-dorado-700)]">
                {eyebrow}
              </p>
            )
            : null}
        <h1
          className={`mt-3 font-bold leading-tight tracking-tight text-balance text-[var(--color-text)] ${
            compact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl lg:text-5xl"
          }`}
        >
          {titulo}
        </h1>
        {descripcion ? (
          <p
            className={`max-w-3xl leading-relaxed text-[var(--color-text-secondary)] ${
              compact ? "mt-2 text-sm md:text-base" : "mt-4 text-base md:text-lg"
            }`}
          >
            {descripcion}
          </p>
        ) : null}
        {children}
      </div>
    </header>
  );
}

export default PageHeader;
