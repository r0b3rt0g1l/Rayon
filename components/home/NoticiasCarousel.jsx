"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { formatFechaLarga } from "@/lib/dates";
import { getNoticiaImageByCategoria } from "@/lib/unsplashImages";

// Banner-carrusel compacto de noticias (una a la vez): imagen de fondo + degradado
// oscuro + título encima, cada slide enlaza a su detalle. Calcado del patrón embla
// del hero (HeroCarousel.jsx) — el que SÍ rota. Autoplay reduce-aware: con
// prefers-reduced-motion no auto-gira, pero flechas/dots siguen funcionando.
export function NoticiasCarousel({ noticias = [] }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: noticias.length > 1, duration: 36 },
    reduce || noticias.length <= 1
      ? []
      : [
          // 7s (el hero usa 6s) para que ambos carruseles roten DESFASADOS y no
          // cambien de imagen en el mismo instante.
          Autoplay({
            delay: 7000,
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

  // a11y: pausar autoplay al enfocar con teclado los controles.
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

  if (!noticias.length) return null;

  const showControls = noticias.length > 1;

  return (
    <div
      ref={sectionRef}
      aria-roledescription="carrusel"
      aria-label="Noticias recientes"
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
      className="relative lg:h-full"
    >
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] lg:h-full"
      >
        <ul className="flex lg:h-full">
          {noticias.map((noticia, index) => {
            const tieneFoto =
              noticia.imagen && /^https?:\/\//.test(noticia.imagen);
            const img = tieneFoto
              ? { src: noticia.imagen, alt: noticia.titulo }
              : getNoticiaImageByCategoria(noticia.categoria);
            return (
              <li
                key={noticia.slug}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${index + 1} de ${noticias.length}: ${noticia.titulo}`}
                className="relative shrink-0 grow-0 basis-full lg:h-full"
              >
                <Link
                  href={`/acciones-de-gobierno/noticias/${noticia.slug}`}
                  className="group relative block aspect-[2/1] w-full overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[var(--color-dorado)] lg:aspect-auto lg:h-full"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    quality={85}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Degradado oscuro para contraste del título (criterio del hero) */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end gap-1.5 p-4 text-white md:p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-dorado)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-guinda-deep)] shadow-sm">
                        <Tag aria-hidden="true" className="h-3 w-3" />
                        {noticia.categoria}
                      </span>
                      {noticia.fecha && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/80">
                          <Calendar aria-hidden="true" className="h-3 w-3" />
                          <time dateTime={noticia.fecha}>
                            {formatFechaLarga(noticia.fecha)}
                          </time>
                        </span>
                      )}
                    </div>
                    <h3 className="line-clamp-2 text-base font-bold leading-snug text-white md:text-xl">
                      {noticia.titulo}
                    </h3>
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
            aria-label="Noticia anterior"
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition hover:border-[var(--color-dorado)] hover:text-[var(--color-dorado)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2 md:inline-flex"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Noticia siguiente"
            onClick={scrollNext}
            className="absolute right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition hover:border-[var(--color-dorado)] hover:text-[var(--color-dorado)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2 md:inline-flex"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <div
            role="tablist"
            aria-label="Selector de noticia"
            className="absolute bottom-4 right-4 z-10 flex items-center gap-2"
          >
            {noticias.map((_, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Ir a la noticia ${index + 1}`}
                  onClick={() => scrollTo(index)}
                  className="group flex h-8 min-w-[28px] items-center justify-center px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2"
                >
                  <motion.span
                    aria-hidden="true"
                    animate={{
                      width: isActive ? 28 : 8,
                      backgroundColor: isActive
                        ? "#B5732E"
                        : "rgba(255,255,255,0.6)",
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
  );
}

export default NoticiasCarousel;
