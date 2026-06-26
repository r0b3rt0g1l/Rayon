"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";

export function NavLink({ href, label, className, external = false }) {
  const pathname = usePathname();
  // Un enlace externo nunca es la "página actual".
  const isActive = external
    ? false
    : href === "/"
      ? pathname === "/"
      : pathname?.startsWith(href);

  const classes = cn(
    "relative inline-flex h-full items-center gap-1.5 whitespace-nowrap px-1 py-2 text-sm font-medium uppercase tracking-normal transition-colors duration-200",
    isActive
      ? "text-[var(--color-guinda)]"
      : "text-[var(--color-text)] hover:text-[var(--color-guinda)]",
    className,
  );

  const inner = (
    <>
      <span className="relative">
        {label}
        <motion.span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left rounded-full bg-[var(--color-dorado)]"
          initial={false}
          animate={{ scaleX: isActive ? 1 : 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
      {external && <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />}
    </>
  );

  // Enlace externo (p. ej. portal estatal de transparencia): pestaña nueva.
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={classes}
      aria-current={isActive ? "page" : undefined}
    >
      {inner}
    </Link>
  );
}

export default NavLink;
