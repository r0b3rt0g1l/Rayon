"use client";

import { useState } from "react";
import { Organigrama } from "@/components/gobierno/Organigrama";
import { PersonDetailModal } from "@/components/gobierno/PersonDetailModal";
import { derivePresidente, deriveSindica } from "@/lib/cabildo";

// Pinta el Directorio como organigrama (mismo estilo que el Cabildo) y CONSERVA el
// modal de detalle al hacer clic en cualquier persona. Recibe la lista ya filtrada y
// ordenada por la página (sin regidores): Presidente y Síndica como cabezas; el resto
// (gabinete: Secretaría/Tesorería/Contraloría + comisarías/OTRO) como subordinados.
export function DirectorioOrganigrama({ people = [] }) {
  const [selected, setSelected] = useState(null);

  if (!people || people.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-8 text-center text-sm italic text-[var(--color-text-muted)]">
        No hay personas registradas en el directorio.
      </p>
    );
  }

  const presidente = derivePresidente(people);
  const sindica = deriveSindica(people);
  // El resto del directorio (la página ya excluyó a los regidores). Conserva el
  // orden que trae `people` (ordenarPorJerarquia en la página).
  const subordinados = people.filter(
    (p) => p && p.tipo !== "presidente" && p.tipo !== "sindica",
  );

  return (
    <>
      <Organigrama
        presidente={presidente}
        sindica={sindica}
        subordinados={subordinados}
        onSelect={setSelected}
      />
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

export default DirectorioOrganigrama;
