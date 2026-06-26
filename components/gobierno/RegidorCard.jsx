"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { UserRound } from "lucide-react";

export function RegidorCard({ regidor }) {
  if (!regidor) return null;

  const tipoCargo = regidor.cargo || "Regidor/a Propietario/a";

  return (
    <motion.article
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white p-6 text-center shadow-[var(--shadow-card)]"
    >
      <div className="relative h-[140px] w-[140px] overflow-hidden rounded-full ring-2 ring-[var(--color-guinda)] md:h-[160px] md:w-[160px]">
        {regidor.foto ? (
          <Image
            src={regidor.foto}
            alt={`Fotografía de ${regidor.nombre}`}
            fill
            sizes="160px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-guinda-deep)] to-[var(--color-guinda)] text-[var(--color-cream)]">
            <UserRound className="h-16 w-16" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-1">
        <h3 className="line-clamp-2 font-display text-lg font-bold leading-snug text-[var(--color-guinda-deep)]">
          {regidor.nombre}
        </h3>
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          {tipoCargo}
        </p>
      </div>
      {/* Política Northa: cero contacto directo (sin mailto:/tel:). */}
    </motion.article>
  );
}

export default RegidorCard;
