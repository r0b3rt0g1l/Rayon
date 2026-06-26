"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export function GaleriaLightbox({ images = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const open = openIndex !== null;
  const current = open ? images[openIndex] : null;

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);
  const prev = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, next, prev]);

  if (!images.length) return null;

  return (
    <>
      <ul className="grid gap-3 md:grid-cols-3">
        {images.map((img, idx) => (
          <li key={img.src} className="flex">
            <button
              type="button"
              onClick={() => setOpenIndex(idx)}
              aria-label={`Ampliar imagen: ${img.alt}`}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] transition duration-300 hover:shadow-[var(--shadow-card-hover)]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[var(--color-guinda-deep)]/0 transition group-hover:bg-[var(--color-guinda-deep)]/30"
              />
              <span
                aria-hidden="true"
                className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100"
              >
                <ZoomIn className="h-4 w-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root open={open} onOpenChange={(v) => !v && close()}>
        <AnimatePresence>
          {open && current && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-50 bg-[var(--color-guinda-deep)]/90 backdrop-blur-md"
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed inset-0 z-50 flex flex-col"
                >
                  <Dialog.Title className="sr-only">
                    {current.alt}
                  </Dialog.Title>
                  <Dialog.Description className="sr-only">
                    Imagen {openIndex + 1} de {images.length}. Use las flechas
                    del teclado para navegar.
                  </Dialog.Description>

                  <div className="flex items-center justify-between gap-4 px-4 py-4 text-white sm:px-6">
                    <p className="text-sm font-medium">
                      {openIndex + 1} / {images.length}
                    </p>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label="Cerrar visor de imagen"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20"
                      >
                        <X className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="relative flex-1">
                    <Image
                      key={current.src}
                      src={current.src}
                      alt={current.alt}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />

                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={prev}
                          aria-label="Imagen anterior"
                          className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-black/50 sm:left-6"
                        >
                          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={next}
                          aria-label="Imagen siguiente"
                          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-black/50 sm:right-6"
                        >
                          <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </>
                    )}
                  </div>

                  <p className="px-6 py-4 text-center text-sm text-white/80">
                    {current.alt}
                  </p>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
}

export default GaleriaLightbox;
