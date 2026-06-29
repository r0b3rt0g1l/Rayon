"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { municipalConfig } from "@/lib/municipalConfig";

// Hero CONTENIDO (rediseño): banner con márgenes blancos, esquinas redondeadas,
// imagen de fondo a TODO el ancho y texto + botón ENCIMA a la izquierda. Un
// degradado oscuro a la izquierda asegura contraste AA del texto blanco.
//
// Estructura del carrusel calcada del patrón probado del repo (BannerCarousel):
// viewport embla en FLUJO NORMAL (no absoluto) y el contenido (imagen + overlay
// + texto) DENTRO de cada slide. Así el autoplay/rotación funciona como antes.
export function HeroCarousel({ slides }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: slides.length > 1, duration: 36 },
    slides.length <= 1
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
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  // a11y: pausa autoplay cuando el foco de teclado entra a los controles.
  const getAutoplay = useCallback(
    () => emblaApi?.plugins?.()?.autoplay,
    [emblaApi],
  );
  const handleFocus = useCallback(() => getAutoplay()?.stop(), [getAutoplay]);
  const handleBlur = useCallback(
    (event) => {
      if (!sectionRef.current?.contains(event.relatedTarget)) {
        getAutoplay()?.play();
      }
    },
    [getAutoplay],
  );

  // Guard DESPUÉS de los hooks (rules-of-hooks): si no hay slides, no renderiza.
  if (!slides || slides.length === 0) return null;

  const showControls = slides.length > 1;

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carrusel"
      aria-label={`Vistas destacadas de ${municipalConfig.identidad.nombreCorto}`}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
      className="bg-[var(--color-surface)]"
    >
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="relative">
          {/* Viewport embla (flujo normal) */}
          <div
            ref={emblaRef}
            className="overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)]"
          >
            <ul className="flex">
              {slides.map((slide, index) => (
                <li
                  key={slide.id}
                  role="group"
                  aria-roledescription="diapositiva"
                  aria-label={`${index + 1} de ${slides.length}: ${slide.title}`}
                  className="relative shrink-0 grow-0 basis-full"
                >
                  <div className="relative min-h-[300px] w-full lg:min-h-[360px]">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1280px) 1216px, 100vw"
                      quality={85}
                      className="object-cover"
                    />
                    {/* Overlay de legibilidad: oscuro a la izquierda → transparente
                        a la derecha. Garantiza contraste AA del texto blanco. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"
                    />
                    {/* Texto + CTA del slide, a la izquierda y centrado vertical */}
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full max-w-xl px-6 text-left sm:px-10 lg:px-14">
                        {slide.eyebrow && (
                          <span className="mb-5 inline-flex w-fit items-center text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-dorado)]">
                            {slide.eyebrow}
                          </span>
                        )}
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-balance text-white md:text-4xl lg:text-5xl">
                          {slide.title}
                        </h1>
                        {slide.subtitle && (
                          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/90 md:text-base">
                            {slide.subtitle}
                          </p>
                        )}
                        {slide.cta?.href && (
                          <div className="mt-5">
                            <Link
                              href={slide.cta.href}
                              aria-label={`${slide.cta.label} — ${slide.title}`}
                              className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-cta-bg)] px-6 py-3 text-sm font-semibold text-[var(--color-cta-text)] shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[var(--color-cta-bg-hover)] hover:shadow-xl"
                            >
                              {slide.cta.label}
                              <ArrowRight
                                aria-hidden="true"
                                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                              />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Flechas */}
          {showControls && (
            <>
              <button
                type="button"
                aria-label="Diapositiva anterior"
                onClick={scrollPrev}
                className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition hover:border-[var(--color-dorado)] hover:text-[var(--color-dorado)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2 md:inline-flex"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Diapositiva siguiente"
                onClick={scrollNext}
                className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition hover:border-[var(--color-dorado)] hover:text-[var(--color-dorado)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2 md:inline-flex"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Dots, abajo a la izquierda alineados con el texto */}
              <div
                role="tablist"
                aria-label="Selector de diapositivas"
                className="absolute bottom-5 left-6 z-10 flex items-center gap-2 sm:left-10 lg:left-14"
              >
                {slides.map((_, index) => {
                  const isActive = index === selectedIndex;
                  return (
                    <button
                      key={index}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Ir a diapositiva ${index + 1}`}
                      onClick={() => scrollTo(index)}
                      className="group flex h-11 min-w-[44px] items-center justify-center px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2"
                    >
                      <motion.span
                        aria-hidden="true"
                        animate={{
                          width: isActive ? 32 : 8,
                          backgroundColor: isActive
                            ? "var(--color-dorado)"
                            : "rgba(255,255,255,0.55)",
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroCarousel;
