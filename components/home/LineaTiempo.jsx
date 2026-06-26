"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { hitos } from "@/lib/hitos";
import { municipalConfig } from "@/lib/municipalConfig";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function HitoItem({ hito, reduce, isLast }) {
  return (
    <li
      role="region"
      aria-label={`Hito ${hito.ano}: ${hito.titulo}`}
      className={`relative pl-12 sm:pl-16 ${isLast ? "" : "pb-14 lg:pb-20"}`}
    >
      <span
        aria-hidden="true"
        className="absolute left-2 top-3 sm:left-3 z-10 block h-3.5 w-3.5 rounded-full bg-[var(--color-dorado)] ring-4 ring-[#FAFAF7]"
      />

      <motion.div
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "visible"}
        viewport={{ once: true, margin: "-15%" }}
        variants={itemVariants}
      >
        <p className="font-display text-5xl font-bold leading-none text-[var(--color-dorado)] lg:text-6xl">
          {hito.ano}
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold leading-snug text-[var(--color-guinda)] lg:text-3xl">
          {hito.titulo}
        </h3>
        <p className="mt-3 max-w-prose font-serif text-base leading-snug text-[var(--color-text-secondary)] lg:text-lg">
          {hito.descripcion}
        </p>
        {hito.datoCurioso && (
          <div className="mt-4 max-w-prose rounded-r border-l-4 border-[var(--color-dorado)] bg-white px-4 py-3 shadow-[var(--shadow-card)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
              Dato curioso
            </p>
            <p className="mt-1 font-serif text-sm leading-snug text-[var(--color-text-secondary)]">
              {hito.datoCurioso}
            </p>
          </div>
        )}
      </motion.div>
    </li>
  );
}

export function LineaTiempo() {
  const reduce = useReducedMotion();
  return (
    <section
      id="linea-del-tiempo"
      aria-label={`Línea del tiempo de ${municipalConfig.identidad.nombreCorto}`}
      className="bg-[#FAFAF7]"
    >
      <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
        <header className="mb-12 lg:mb-16">
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-dorado)]">
            <span
              aria-hidden="true"
              className="block h-px w-8 bg-[var(--color-dorado)]"
            />
            Línea del tiempo
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--color-guinda)] lg:text-4xl">
            Hitos de {municipalConfig.identidad.nombreCorto}
          </h2>
        </header>

        <ol className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 sm:left-[18px] top-2 bottom-2 w-px bg-[var(--color-dorado)]/40"
          />
          {hitos.map((hito, index) => (
            <HitoItem
              key={hito.ano}
              hito={hito}
              reduce={reduce}
              isLast={index === hitos.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

export default LineaTiempo;
