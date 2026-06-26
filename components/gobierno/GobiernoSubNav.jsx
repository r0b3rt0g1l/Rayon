"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/cn";

const NAV_OFFSET = 144;

const items = [
  { id: "presidencia", label: "Presidencia" },
  { id: "sindica", label: "Síndica Municipal" },
  { id: "regidores", label: "Regidores" },
  { id: "dif", label: "Sistema DIF" },
];

export function GobiernoSubNav() {
  const ids = useMemo(() => items.map((i) => i.id), []);
  const active = useScrollSpy(ids);

  const onClick = (e, id) => {
    e.preventDefault();
    if (typeof window === "undefined") return;
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Subnavegación de Gobierno"
      className="sticky top-[88px] z-40 h-14 border-b border-[var(--color-border)] bg-white/95 shadow-[0_2px_12px_rgba(26,26,26,0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-white/85"
    >
      <div className="mx-auto flex h-full max-w-7xl items-stretch gap-1 overflow-x-auto px-4 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => onClick(e, item.id)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative inline-flex shrink-0 items-center px-5 py-4 text-[15px] font-medium tracking-wide transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] rounded-md",
                isActive
                  ? "text-[var(--color-guinda-deep)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-guinda-deep)]",
              )}
            >
              <span>{item.label}</span>
              {isActive && (
                <motion.span
                  layoutId="gobiernoSubNavIndicator"
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-[var(--color-dorado)]"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}

export default GobiernoSubNav;
