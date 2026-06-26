"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Los cuadros de datos del inicio se editan en el CMS (sección "Estadísticas")
// y llegan por props desde app/page.js (getEstadisticas). Sin fallback a datos
// hardcodeados: si el municipio no tiene estadísticas, la sección se oculta.

const cardsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};
const cardItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// "Por designar"/vacío → estilo atenuado (dato aún no confirmado).
function esPendiente(valor) {
  return !valor || /por\s+designar/i.test(valor);
}

export function Estadisticas({ estadisticas = [] }) {
  const reduce = useReducedMotion();

  // Sin estadísticas en el CMS → no se muestra la sección (multi-tenant: cada
  // municipio configura las suyas; ninguno hereda datos de otro).
  if (!estadisticas || estadisticas.length === 0) return null;

  return (
    <section aria-label="Datos del municipio" className="relative z-10">
      <div className="mx-auto max-w-7xl px-6 pb-2">
        {/* Barra única blanca que flota sobre el hero (overlap con -mt). Las
            celdas se dividen por líneas sutiles; el número de columnas se adapta. */}
        <motion.dl
          variants={reduce ? undefined : cardsContainer}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="relative z-10 mx-auto -mt-8 grid max-w-5xl grid-cols-2 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)] sm:grid-cols-3 lg:-mt-12 lg:grid-cols-6"
        >
          {estadisticas.map((e) => {
            const pending = esPendiente(e.valor);
            return (
              <motion.div
                key={e.id}
                variants={reduce ? undefined : cardItem}
                className="flex flex-col items-center gap-1 bg-white p-4 text-center"
              >
                {e.iconoUrl ? (
                  <Image
                    src={e.iconoUrl}
                    alt=""
                    aria-hidden="true"
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                  />
                ) : (
                  <span aria-hidden="true" className="h-6 w-6" />
                )}
                <dt className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                  {e.titulo}
                </dt>
                <dd
                  className={`text-lg font-bold md:text-xl ${
                    pending
                      ? "italic text-[var(--color-text-muted)]"
                      : "text-[var(--color-text)]"
                  }`}
                >
                  {e.valor || "Por designar"}
                </dd>
              </motion.div>
            );
          })}
        </motion.dl>

        <div className="mx-auto mt-4 flex max-w-5xl justify-end">
          <Link
            href="/turismo"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-cta-bg)] px-6 py-3 text-sm font-semibold text-[var(--color-cta-text)] shadow-md transition-all duration-200 hover:scale-105 hover:bg-[var(--color-cta-bg-hover)] hover:shadow-lg"
          >
            Descubre el turismo
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Estadisticas;
