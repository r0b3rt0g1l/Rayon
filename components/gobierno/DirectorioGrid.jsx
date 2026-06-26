"use client";

import Image from "next/image";
import { useState } from "react";
import { PersonDetailModal } from "@/components/gobierno/PersonDetailModal";
import { isPendingName } from "@/lib/cabildo";

const TIPO_LABEL = {
  presidente: "Presidencia Municipal",
  sindica: "Sindicatura Municipal",
  regidor: "Regiduría",
  dif: "DIF Municipal",
  secretario: "Secretaría Municipal",
  tesorero: "Tesorería Municipal",
  contralor: "Órgano Interno de Control",
  cabildo: "Otras áreas",
};

function getInitials(nombre) {
  const cleaned = String(nombre ?? "")
    .replace(/^(c\.|lic\.|dr\.|ing\.|prof\.|mtro\.|mtra\.)\s+/i, "")
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function CardAvatar({ src, nombre }) {
  if (src) {
    return (
      <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-white shadow-[var(--shadow-card)]">
        <Image
          src={src}
          alt={`Fotografía de ${nombre}`}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>
    );
  }
  // Cuando el nombre es un placeholder "[PENDIENTE: …]", no calculamos
  // iniciales (saldrían "[S", "[R", etc.). Mostramos un avatar gris neutro.
  if (isPendingName(nombre)) {
    return (
      <div
        aria-hidden="true"
        className="h-24 w-24 rounded-full bg-[var(--color-border)] ring-4 ring-white shadow-[var(--shadow-card)]"
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-guinda-deep)] to-[var(--color-guinda)] font-display text-2xl font-bold text-[var(--color-dorado)] ring-4 ring-white shadow-[var(--shadow-card)]"
    >
      {getInitials(nombre)}
    </div>
  );
}

export function DirectorioGrid({ people = [] }) {
  const [selected, setSelected] = useState(null);

  if (people.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-8 text-center text-sm italic text-[var(--color-text-muted)]">
        No hay personas registradas en el directorio.
      </p>
    );
  }

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {people.map((person) => {
          // Bucket "cabildo" (tipo=OTRO y tipos sin mapear): mostramos el cargo
          // real en vez de la etiqueta genérica "Otras áreas". Fallback a "Otras
          // áreas" si no hubiera cargo (no debería: el backend exige cargo).
          const tipoLabel =
            person.tipo === "cabildo"
              ? person.cargo?.trim() || "Otras áreas"
              : TIPO_LABEL[person.tipo] ?? "Cabildo";
          const isPending = isPendingName(person.nombre);
          return (
            <li key={person.id} className="flex">
              <button
                type="button"
                onClick={() => setSelected(person)}
                aria-label={
                  isPending
                    ? `${tipoLabel} — por designar`
                    : `Ver detalles de ${person.nombre}`
                }
                className="group flex h-full w-full flex-col items-center rounded-2xl border border-[var(--color-border)] bg-white p-6 text-center shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-guinda)]/20 hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2"
              >
                <CardAvatar src={person.foto} nombre={person.nombre} />
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
                  {tipoLabel}
                </p>
                {isPending ? (
                  <h3 className="mt-2 font-display text-base font-medium italic leading-snug text-[var(--color-text-muted)] md:text-lg">
                    Por designar
                  </h3>
                ) : (
                  <h3 className="mt-2 font-display text-base font-bold leading-snug text-[var(--color-text)] transition-colors group-hover:text-[var(--color-guinda)] md:text-lg">
                    {person.nombre}
                  </h3>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <PersonDetailModal
        person={selected}
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </>
  );
}

export default DirectorioGrid;
