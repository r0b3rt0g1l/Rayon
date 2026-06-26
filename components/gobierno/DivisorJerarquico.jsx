"use client";

import { motion } from "framer-motion";

export function DivisorJerarquico() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto my-12 flex justify-center md:my-20"
    >
      <motion.span
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 80, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="block h-[2px] rounded-full bg-[var(--color-dorado)]"
      />
    </div>
  );
}

export default DivisorJerarquico;
