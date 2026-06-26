"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function HubCard({ icon, label, description, href, external = false, index = 0 }) {
  const Comp = external ? "a" : Link;
  const linkProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="flex"
    >
      <Comp
        {...linkProps}
        className={cn(
          "group relative flex h-full w-full flex-col gap-4 overflow-hidden rounded-2xl border-2 border-[var(--color-dorado)]/30 bg-white/5 p-6 backdrop-blur-sm transition duration-300 hover:border-[var(--color-dorado)] hover:bg-white/10 hover:shadow-[0_12px_40px_-12px_rgba(212,160,23,0.5)]",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-dorado)] text-[var(--color-guinda-deep)] transition group-hover:bg-white">
            {icon}
          </span>
          {external ? (
            <ArrowUpRight
              aria-hidden="true"
              className="h-5 w-5 text-white/40 transition group-hover:text-[var(--color-dorado)]"
            />
          ) : (
            <ArrowRight
              aria-hidden="true"
              className="h-5 w-5 text-white/40 transition group-hover:translate-x-1 group-hover:text-[var(--color-dorado)]"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="font-display text-xl font-bold leading-snug text-white transition group-hover:text-[var(--color-dorado)]">
            {label}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--color-cream)]/80">
            {description}
          </p>
        </div>
      </Comp>
    </motion.div>
  );
}

export default HubCard;
