"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { UserRound, Award } from "lucide-react";
import { municipalConfig } from "@/lib/municipalConfig";

export function PresidenteCard({ presidente }) {
  if (!presidente) return null;

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative isolate mx-auto max-w-[480px] overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-guinda)] to-[var(--color-guinda-deep)] p-8 text-white shadow-[0_20px_60px_-15px_rgba(31,56,19,0.55)] md:p-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_25%_25%,rgba(212,160,23,0.6)_0,transparent_55%),radial-gradient(circle_at_80%_75%,white_0,transparent_55%)]"
      />

      <div className="relative flex flex-col items-center gap-6 text-center">
        <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full ring-4 ring-[var(--color-dorado)] md:h-[240px] md:w-[240px]">
          {presidente.foto ? (
            <Image
              src={presidente.foto}
              alt={`Fotografía de ${presidente.nombre}`}
              fill
              sizes="240px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-dorado)]/30 to-[var(--color-guinda-deep)]/40 text-[var(--color-cream)]">
              <UserRound className="h-[120px] w-[120px]" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-dorado)]/30 bg-[var(--color-dorado)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--color-dorado)]">
            <Award className="h-3.5 w-3.5" aria-hidden="true" />
            Presidente Municipal
          </span>
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-white md:text-[32px]">
            {presidente.nombre}
          </h3>
          <p className="text-base font-semibold uppercase tracking-wider text-[var(--color-dorado)]">
            {presidente.cargo}
          </p>
          <p className="text-sm text-white/70">
            Administración {municipalConfig.identidad.administracion}
          </p>
        </div>

        {/* Política Northa: cero contacto directo. No se renderizan mailto:/tel:
            aquí; el contacto institucional va por formulario / modal (directorio). */}
      </div>
    </motion.article>
  );
}

export default PresidenteCard;
