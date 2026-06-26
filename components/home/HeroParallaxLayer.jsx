"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Capa con efecto parallax. Recibe targetRef del contenedor padre (el hero)
 * y translada en Y proporcionalmente al scroll relativo a ese contenedor.
 *
 * Si el usuario prefiere reduced motion, no aplica transformación.
 */
export function HeroParallaxLayer({
  children,
  factor = 0.5,
  targetRef,
  className,
  ...rest
}) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -200 * factor]);

  return (
    <motion.div
      style={reduce ? undefined : { y, willChange: "transform" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default HeroParallaxLayer;
