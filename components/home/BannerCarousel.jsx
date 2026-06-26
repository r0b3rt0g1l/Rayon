"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Megaphone,
  Newspaper,
} from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { formatFechaLarga } from "@/lib/dates";
import { cn } from "@/lib/cn";

const TIPO_CONFIG = {
  comunicado: {
    label: "Comunicado",
    Icon: Megaphone,
    badgeClass:
      "bg-[var(--color-guinda)] text-white",
  },
  noticia: {
    label: "Noticia",
    Icon: Newspaper,
    badgeClass:
      "bg-[var(--color-dorado)] text-[var(--color-guinda-deep)]",
  },
};

export function BannerCarousel({ items = [] }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: items.length > 1, duration: 36 },
    reduce || items.length <= 1
      ? []
      : [
          Autoplay({
            delay: 6000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    // Estado por eventos (no síncrono en el effect). snaps = items.
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const getAutoplay = useCallback(
    () => emblaApi?.plugins?.()?.autoplay,
    [emblaApi],
  );

  const handleFocus = useCallback(() => {
    getAutoplay()?.stop();
  }, [getAutoplay]);

  const handleBlur = useCallback(
    (event) => {
      if (!sectionRef.current?.contains(event.relatedTarget)) {
        getAutoplay()?.play();
      }
    },
    [getAutoplay],
  );

  if (items.length === 0) return null;

  const showControls = items.length > 1;

  return (
    <section
      ref={sectionRef}
      aria-label="Avisos y noticias destacadas"
      aria-roledescription="carrusel"
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
      className="bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-12">
        <div className="relative">
          <div
            ref={emblaRef}
            className="overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
          >
            <ul className="flex">
              {items.map((item, index) => {
                const cfg = TIPO_CONFIG[item.tipo] ?? TIPO_CONFIG.noticia;
                const Icon = cfg.Icon;
                return (
                  <li
                    key={item.id}
                    role="group"
                    aria-roledescription="diapositiva"
                    aria-label={`${index + 1} de ${items.length}: ${item.titulo}`}
                    className="relative shrink-0 grow-0 basis-full"
                  >
                    <Link
                      href={item.link}
                      className="group relative block aspect-[4/3] w-full overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[var(--color-dorado)] md:aspect-[16/9]"
                    >
                      <Image
                        src={item.imagen}
                        alt={item.imagenAlt ?? ""}
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1280px) 1280px, 100vw"
                        quality={85}
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[var(--color-guinda-deep)]/85 via-[var(--color-guinda-deep)]/40 to-transparent"
                      />
                      <div className="absolute inset-0 flex flex-col justify-end gap-3 p-6 text-white md:p-10">
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] shadow-sm",
                              cfg.badgeClass,
                            )}
                          >
                            <Icon
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                            {cfg.label}
                          </span>
                          {item.fecha && (
                            <time
                              dateTime={item.fecha}
                              className="text-[11px] uppercase tracking-widest text-white/75"
                            >
                              {formatFechaLarga(item.fecha)}
                            </time>
                          )}
                        </div>
                        <h3 className="max-w-3xl font-display text-2xl font-bold leading-tight tracking-tight text-[var(--color-cream)] md:text-3xl lg:text-4xl">
                          {item.titulo}
                        </h3>
                        {item.resumen && (
                          <p className="hidden max-w-2xl text-sm text-white/85 sm:block md:text-base">
                            {item.resumen}
                          </p>
                        )}
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-dorado)] transition-all group-hover:gap-2.5">
                          Leer más
                          <ArrowRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {showControls && (
            <>
              <button
                type="button"
                aria-label="Diapositiva anterior"
                onClick={scrollPrev}
                className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2 lg:inline-flex"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Diapositiva siguiente"
                onClick={scrollNext}
                className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2 lg:inline-flex"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {showControls && (
          <div
            role="tablist"
            aria-label="Selector de diapositiva"
            className="mt-5 flex justify-center gap-2"
          >
            {items.map((_, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Ir a diapositiva ${index + 1}`}
                  onClick={() => scrollTo(index)}
                  className="group flex h-8 items-center justify-center rounded-full px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2"
                >
                  <motion.span
                    aria-hidden="true"
                    animate={{
                      width: isActive ? 32 : 8,
                      backgroundColor: isActive
                        ? "rgb(212, 160, 23)"
                        : "rgba(31,56,19,0.3)",
                    }}
                    transition={{
                      duration: reduce ? 0 : 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-1.5 rounded-full"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default BannerCarousel;
