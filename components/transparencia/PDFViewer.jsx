"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText } from "lucide-react";

export function PDFViewer({
  pdfUrl,
  title,
  subtitle,
  trigger,
  open: openProp,
  onOpenChange,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;

  const iframeSrc = !pdfUrl
    ? ""
    : pdfUrl.startsWith("http")
      ? pdfUrl
      : `${pdfUrl}#toolbar=1&navpanes=0&view=FitH`;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-[var(--color-guinda-deep)]/70 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-1/2 top-1/2 z-50 flex h-[92vh] w-[min(96vw,1180px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
              >
                <div className="flex items-center gap-3 border-b border-[var(--color-border)] bg-gradient-to-br from-[var(--color-guinda-deep)] to-[var(--color-guinda)] px-4 py-3 text-white sm:px-5 sm:py-4">
                  <div className="hidden rounded-full bg-white/15 p-2 sm:block">
                    <FileText className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Dialog.Title className="truncate font-display text-sm font-bold leading-tight md:text-base">
                      {title}
                    </Dialog.Title>
                    <Dialog.Description className="mt-0.5 truncate text-[11px] text-white/80 sm:text-xs">
                      {subtitle ?? "Documento oficial del Ayuntamiento"}
                    </Dialog.Description>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                    <a
                      href={pdfUrl}
                      download
                      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-white/25 bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)]"
                      aria-label={`Descargar ${title}`}
                    >
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="hidden sm:inline">Descargar</span>
                    </a>
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-white/25 bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)]"
                      aria-label="Abrir PDF en pestaña nueva"
                    >
                      <ExternalLink
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      <span className="hidden sm:inline">Pestaña</span>
                    </a>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label="Cerrar visor de PDF"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)]"
                      >
                        <X className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </Dialog.Close>
                  </div>
                </div>

                <div className="relative flex-1 bg-[var(--color-bg)]">
                  <iframe
                    src={iframeSrc}
                    title={title}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                  />
                </div>

                <div className="hidden border-t border-[var(--color-border)] bg-white px-4 py-2 text-[11px] text-[var(--color-text-muted)] sm:block">
                  Si el documento no se muestra, usa el botón{" "}
                  <strong>Pestaña</strong> o <strong>Descargar</strong> arriba.
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export default PDFViewer;
