"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { UserRound } from "lucide-react";

export function SindicaCard({ sindica }) {
  if (!sindica) return null;

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex max-w-[400px] flex-col items-center gap-5 rounded-xl border-2 border-[var(--color-dorado)] bg-white p-8 text-center shadow-[var(--shadow-card)]"
    >
      <div className="relative h-[160px] w-[160px] overflow-hidden rounded-full ring-[3px] ring-[var(--color-guinda)] md:h-[200px] md:w-[200px]">
        {sindica.foto ? (
          <Image
            src={sindica.foto}
            alt={`Fotografía de ${sindica.nombre}`}
            fill
            sizes="200px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-guinda-deep)] to-[var(--color-guinda)] text-[var(--color-cream)]">
            <UserRound className="h-20 w-20" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-display text-[26px] font-bold leading-tight tracking-tight text-[var(--color-guinda-deep)]">
          {sindica.nombre}
        </h3>
        <p className="text-[15px] font-semibold text-[var(--color-guinda)]">
          Síndica Municipal Propietaria
        </p>
      </div>
    </motion.article>
  );
}

export default SindicaCard;
