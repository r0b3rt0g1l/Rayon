"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ArrowUpRight,
  Image as ImageIcon,
} from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ¿El documento es PDF? (por tipo del CMS o por extensión de la URL).
function esPdfDoc(doc) {
  return doc?.tipo === "PDF" || /\.pdf(\?|$)/i.test(doc?.url || "");
}

// Miniatura vía transformación de URL de Cloudinary (sin procesar nada en el
// backend). Si el documento tiene PORTADA (carátula) personalizada, se usa esa
// como miniatura para cualquier tipo; si no, imagen → recorte 4:3, PDF → 1ª página.
function thumbSrc(doc) {
  // Portada personalizada (si existe) tiene prioridad, sea PDF o imagen.
  if (doc?.portadaUrl) {
    return doc.portadaUrl.includes("/image/upload/")
      ? doc.portadaUrl.replace(
          "/image/upload/",
          "/image/upload/w_640,ar_4:3,c_fill,g_auto,f_auto,q_auto/",
        )
      : doc.portadaUrl;
  }
  // Imagen → su propia imagen 4:3 (como hoy). PDF legado sin portada → 1ª página.
  const url = doc?.url;
  if (typeof url !== "string" || !url.includes("/image/upload/")) return null;
  const tx = esPdfDoc(doc)
    ? "pg_1,w_640,ar_4:3,c_fill,g_north,f_jpg,q_auto"
    : "w_640,ar_4:3,c_fill,g_auto,f_auto,q_auto";
  return url.replace("/image/upload/", `/image/upload/${tx}/`);
}

// Coverflow geométrico: la inclinación de cada tarjeta se calcula desde su
// posición REAL (px) respecto al centro del viewport, no desde los scroll snaps
// de embla. Así el efecto siempre se ve, incluso con 4 documentos.
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

// Mínimo de slides para un loop infinito sin huecos: embla necesita más ancho
// que el viewport para clonar. Con pocos documentos repetimos los MISMOS PDFs
// reales (no son documentos falsos) solo como búfer del loop.
const MIN_SLIDES = 12;

export function InformacionImportante({ documentos = [] }) {
  const reduce = useReducedMotion();

  const baseDocs = Array.isArray(documentos) ? documentos : [];
  const canLoop = baseDocs.length > 1;

  // Loop infinito real: duplicamos los documentos reales hasta ≥ MIN_SLIDES para
  // que siempre haya tarjetas en los lados. Como solo se ven 3 a la vez, nunca se
  // ve el mismo documento dos veces en pantalla.
  const slides = canLoop
    ? Array.from({
        length: Math.ceil(MIN_SLIDES / baseDocs.length),
      }).flatMap(() => baseDocs)
    : baseDocs;

  // Sin auto-avance: el usuario controla con flechas y swipe (drag activo por
  // defecto en embla). Loop infinito + centrado para el coverflow.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: canLoop,
    align: "center",
    duration: 30,
    dragFree: false,
  });

  const tweenNodes = useRef([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // --- Coverflow 3D geométrico (posición real de cada tarjeta vs. centro) ---
  const setTweenNodes = useCallback((api) => {
    tweenNodes.current = api
      .slideNodes()
      .map((n) => n.querySelector("[data-ii-card]"));
  }, []);

  const applyCoverflow = useCallback((api) => {
    const vp = api.rootNode().getBoundingClientRect();
    const vpCenter = vp.left + vp.width / 2;
    // Medimos el <li> (que NO lleva nuestro transform) para obtener la posición
    // real sin realimentación; el transform 3D va en el <a> interno. Con loop,
    // embla traslada los <li>, así que el rect ya refleja dónde está cada uno.
    api.slideNodes().forEach((li, i) => {
      const card = tweenNodes.current[i];
      if (!card) return;
      const r = li.getBoundingClientRect();
      if (!r.width) return;
      const dist = (r.left + r.width / 2 - vpCenter) / r.width; // firmada, en anchos de tarjeta
      const ad = Math.abs(dist);
      const scale = clamp(1 - ad * 0.12, 0.88, 1); // central ~1.0 · laterales ~0.88
      const opacity = clamp(1 - ad * 0.25, 0.75, 1); // central 1 · laterales ~0.75
      card.style.transform = `scale(${scale})`; // profundidad sutil: SIN rotateY/translateZ/perspective
      card.style.opacity = `${opacity}`;
      card.style.zIndex = String(Math.round(clamp(2 - ad, 0, 2))); // central ligeramente encima
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    // Con prefers-reduced-motion: sin efecto (tarjetas uniformes), pero navegable.
    if (reduce) return;
    setTweenNodes(emblaApi);
    // Init en rAF: el layout (anchos flex) ya está asentado al medir.
    const raf = requestAnimationFrame(() => applyCoverflow(emblaApi));
    const onReInit = (api) => {
      setTweenNodes(api);
      applyCoverflow(api);
    };
    const onScroll = (api) => applyCoverflow(api);
    emblaApi
      .on("reInit", onReInit)
      .on("scroll", onScroll)
      .on("slideFocus", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      emblaApi
        .off("reInit", onReInit)
        .off("scroll", onScroll)
        .off("slideFocus", onScroll);
      tweenNodes.current.forEach((n) => {
        if (n) {
          n.style.transform = "";
          n.style.opacity = "";
          n.style.zIndex = "";
        }
      });
    };
  }, [emblaApi, reduce, setTweenNodes, applyCoverflow]);

  if (baseDocs.length === 0) return null;
  const showControls = canLoop;

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Información relevante"
      className="bg-[var(--color-surface)]"
    >
      <div className="mx-auto max-w-7xl px-4 pt-3 pb-6 sm:px-6 md:pt-4 md:pb-8">
        <header className="mb-2">
          <span
            aria-hidden="true"
            className="mb-2 block h-1 w-9 rounded-full bg-[var(--color-dorado)]"
          />
          <h2 className="font-display text-xl font-bold tracking-tight text-[var(--color-text)] md:text-2xl">
            Información Relevante
          </h2>
          <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-[var(--color-text-secondary)] md:text-sm">
            Documentos oficiales para consulta y descarga.
          </p>
        </header>

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden py-3">
            <ul className="flex gap-2 sm:gap-3">
              {slides.map((doc, i) => {
                const esPdf = esPdfDoc(doc);
                const thumb = thumbSrc(doc);
                return (
                  <li
                    key={`${doc.id}-${i}`}
                    className="min-w-0 flex-[0_0_50%] sm:flex-[0_0_33%] lg:flex-[0_0_25%]"
                  >
                    <a
                      data-ii-card
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir ${doc.titulo} (${esPdf ? "PDF" : "imagen"}, nueva pestaña)`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)] transition-[box-shadow,border-color] duration-300 will-change-transform hover:border-[var(--color-dorado)]/50 hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-cream)]">
                        {thumb ? (
                          <Image
                            src={thumb}
                            alt={esPdf ? `Primera página de ${doc.titulo}` : doc.titulo}
                            fill
                            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                            className="object-cover object-top"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[var(--color-dorado-700)]">
                            {esPdf ? (
                              <FileText className="h-10 w-10" aria-hidden="true" />
                            ) : (
                              <ImageIcon className="h-10 w-10" aria-hidden="true" />
                            )}
                          </div>
                        )}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/15 to-transparent"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-cta-bg)] text-[var(--color-cta-text)] opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col gap-0.5 px-3 py-2.5">
                        <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug tracking-tight text-[var(--color-text)] transition-colors group-hover:text-[var(--color-guinda)]">
                          {doc.titulo}
                        </h3>
                        <span className="mt-auto inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--color-dorado-700)]">
                          {esPdf ? (
                            <FileText className="h-2.5 w-2.5" aria-hidden="true" />
                          ) : (
                            <ImageIcon className="h-2.5 w-2.5" aria-hidden="true" />
                          )}
                          {esPdf ? "PDF" : "Imagen"}
                        </span>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {showControls && (
            <>
              <button
                type="button"
                aria-label="Documento anterior"
                onClick={scrollPrev}
                className="absolute -left-2 top-1/2 z-30 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] shadow-md transition hover:border-[var(--color-dorado)] hover:text-[var(--color-dorado-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2 sm:-left-3 sm:h-10 sm:w-10"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Documento siguiente"
                onClick={scrollNext}
                className="absolute -right-2 top-1/2 z-30 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] shadow-md transition hover:border-[var(--color-dorado)] hover:text-[var(--color-dorado-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2 sm:-right-3 sm:h-10 sm:w-10"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default InformacionImportante;
