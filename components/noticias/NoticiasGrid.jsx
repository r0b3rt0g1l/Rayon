"use client";

import { motion } from "framer-motion";
import { CardPreview } from "@/components/noticias/CardPreview";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export function NoticiasGrid({ items, basePath, emptyLabel = "Sin publicaciones por ahora." }) {
  if (!items?.length) {
    return (
      <p className="rounded-xl border border-dashed border-[var(--color-border)] bg-white px-6 py-16 text-center text-sm text-[var(--color-text-secondary)]">
        {emptyLabel}
      </p>
    );
  }

  return (
    <motion.ul
      key={basePath}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item) => (
        <motion.li key={item.slug} variants={itemVariants} className="flex">
          <CardPreview item={item} basePath={basePath} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default NoticiasGrid;
