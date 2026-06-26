"use client";

import { motion, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NAV_OFFSET = 88;

export function ScrollIndicator({ scrollYProgress, heroRef }) {
  const reduce = useReducedMotion();
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2],
    [1, 1, 0],
  );

  const onClick = () => {
    if (typeof window === "undefined") return;
    const target = heroRef?.current?.nextElementSibling;
    const top = target
      ? target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
      : window.innerHeight - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Avanzar a la siguiente sección"
      style={reduce ? undefined : { opacity }}
      className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] rounded-md px-3 py-2"
    >
      <span className="text-sm font-medium tracking-wide text-white/80">
        Descubre más
      </span>
      <motion.span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white"
        animate={
          reduce
            ? undefined
            : {
                y: [0, 8, 0],
              }
        }
        transition={
          reduce
            ? undefined
            : {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      >
        <ChevronDown className="h-5 w-5" aria-hidden="true" />
      </motion.span>
    </motion.button>
  );
}

export default ScrollIndicator;
