"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { UserRound } from "lucide-react";
import {
  derivePresidente,
  deriveSindica,
  deriveRegidores,
  deriveDIF,
} from "@/lib/cabildo";
import { PresidenteCard } from "@/components/gobierno/PresidenteCard";
import { SindicaCard } from "@/components/gobierno/SindicaCard";
import { RegidorCard } from "@/components/gobierno/RegidorCard";
import { DivisorJerarquico } from "@/components/gobierno/DivisorJerarquico";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function CabildoSection({ lista }) {
  const presidente = derivePresidente(lista);
  const sindica = deriveSindica(lista);
  const regidores = deriveRegidores(lista);
  const dif = deriveDIF(lista);

  return (
    <section
      aria-label="Cabildo Municipal"
      className="bg-white py-16 md:py-[120px]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
            Honorable Cabildo Constitucional
          </p>
          <h2 className="mt-3 font-display text-[36px] font-bold leading-tight tracking-tight text-[var(--color-guinda-deep)] md:text-5xl">
            Cabildo Municipal
          </h2>
          <p className="mt-3 text-lg text-[var(--color-text-secondary)]">
            Administración 2024-2027
          </p>
        </header>

        {presidente && (
          <section
            id="presidencia"
            className="mt-12 scroll-mt-[144px] md:mt-16"
          >
            <PresidenteCard presidente={presidente} />
          </section>
        )}

        {(presidente || sindica) && <DivisorJerarquico />}

        {sindica && (
          <section id="sindica" className="scroll-mt-[144px]">
            <header className="mb-8 text-center md:mb-10">
              <h3 className="font-display text-2xl font-bold tracking-tight text-[var(--color-guinda-deep)] md:text-[28px]">
                Sindicatura Municipal
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                Representación legal del Ayuntamiento
              </p>
            </header>
            <SindicaCard sindica={sindica} />
          </section>
        )}

        {regidores.length > 0 && <DivisorJerarquico />}

        {regidores.length > 0 && (
          <section id="regidores" className="scroll-mt-[144px]">
            <header className="mb-10 text-center md:mb-12">
              <h3 className="font-display text-2xl font-bold tracking-tight text-[var(--color-guinda-deep)] md:text-[28px]">
                Regidurías
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                {regidores.length === 1
                  ? "Una reguría propietaria del Cabildo Municipal"
                  : `${regidores.length} regidurías propietarias del Cabildo Municipal`}
              </p>
            </header>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={containerVariants}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5"
            >
              {regidores.map((r) => (
                <motion.li key={r.id} variants={itemVariants} className="flex">
                  <RegidorCard regidor={r} />
                </motion.li>
              ))}
            </motion.ul>
          </section>
        )}

        {dif && <DivisorJerarquico />}

        {dif && (
          <section id="dif" className="scroll-mt-[144px]">
            <header className="mb-10 text-center md:mb-12">
              <h3 className="font-display text-2xl font-bold tracking-tight text-[var(--color-guinda-deep)] md:text-[28px]">
                Sistema DIF Municipal
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                Desarrollo Integral de la Familia
              </p>
            </header>

            <motion.article
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="mx-auto flex max-w-[440px] flex-col items-center gap-5 rounded-xl border-2 border-[var(--color-dorado)] bg-white p-8 text-center shadow-[var(--shadow-card)]"
            >
              <div className="relative h-[160px] w-[160px] overflow-hidden rounded-full ring-[3px] ring-[var(--color-guinda)] md:h-[200px] md:w-[200px]">
                {dif.foto ? (
                  <Image
                    src={dif.foto}
                    alt={`Fotografía de ${dif.nombre}`}
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
                <h4 className="font-display text-2xl font-bold leading-tight tracking-tight text-[var(--color-guinda-deep)]">
                  {dif.nombre}
                </h4>
                <p className="text-[15px] font-semibold text-[var(--color-guinda)]">
                  {dif.cargo}
                </p>
                {dif.bio && (
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {dif.bio}
                  </p>
                )}
              </div>
            </motion.article>
          </section>
        )}
      </div>
    </section>
  );
}

export default CabildoSection;
