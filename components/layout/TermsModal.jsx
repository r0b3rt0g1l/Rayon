"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollText } from "lucide-react";
import { municipalConfig } from "@/lib/municipalConfig";

export function TermsModal({ open, onAccept, onDecline }) {
  const { identidad } = municipalConfig;

  return (
    <Dialog.Root open={open} onOpenChange={() => {}}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[70] bg-[var(--color-guinda-deep)]/60 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              onEscapeKeyDown={(e) => e.preventDefault()}
              onPointerDownOutside={(e) => e.preventDefault()}
              onInteractOutside={(e) => e.preventDefault()}
            >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-1/2 top-1/2 z-[70] flex max-h-[90vh] w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
              >
                <div className="flex items-start gap-4 border-b border-[var(--color-border)] bg-gradient-to-br from-[var(--color-guinda-deep)] to-[var(--color-guinda)] px-6 py-5 text-white">
                  <div className="rounded-full bg-white/15 p-2">
                    <ScrollText className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <Dialog.Title className="font-display text-xl font-bold">
                      Términos y Condiciones de Uso
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-sm text-white/80">
                      {identidad.nombreOficial}, Sonora
                    </Dialog.Description>
                  </div>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5 text-sm leading-relaxed text-[var(--color-text)]">
                  <p>
                    Bienvenida y bienvenido al Portal Institucional del{" "}
                    <strong>{identidad.nombreOficial}</strong>. Antes de
                    continuar, le solicitamos leer y aceptar los siguientes
                    términos:
                  </p>

                  <ol className="list-decimal space-y-3 pl-5">
                    <li>
                      <strong>Carácter informativo.</strong> Este portal es de
                      carácter institucional e informativo. La información
                      publicada se ofrece con base en lo dispuesto por la{" "}
                      <em>
                        Ley General de Transparencia y Acceso a la Información
                        Pública
                      </em>{" "}
                      y la{" "}
                      <em>
                        Ley de Transparencia y Acceso a la Información Pública
                        del Estado de Sonora
                      </em>
                      .
                    </li>
                    <li>
                      <strong>Veracidad de la información.</strong> El{" "}
                      {identidad.nombreOficial} procura mantener la información
                      actualizada y veraz; sin embargo, no garantiza la
                      ausencia de errores u omisiones. Para trámites oficiales,
                      acuda a las oficinas correspondientes o consulte los
                      canales formales del Ayuntamiento.
                    </li>
                    <li>
                      <strong>Datos personales.</strong> La recolección y
                      tratamiento de datos personales se rige por el aviso de
                      privacidad institucional disponible en este portal. Al
                      usar el sitio usted acepta dicho tratamiento conforme a
                      la{" "}
                      <em>
                        Ley de Protección de Datos Personales en Posesión de
                        Sujetos Obligados del Estado de Sonora
                      </em>
                      .
                    </li>
                    <li>
                      <strong>Uso adecuado.</strong> Queda prohibido el uso
                      indebido del portal, la alteración de sus contenidos,
                      así como la reproducción no autorizada de materiales
                      protegidos por derechos de autor.
                    </li>
                    <li>
                      <strong>Enlaces externos.</strong> Los enlaces a
                      portales externos son responsabilidad exclusiva de sus
                      respectivos titulares.
                    </li>
                  </ol>

                  <p>
                    Al hacer clic en <strong>&ldquo;Acepto&rdquo;</strong>{" "}
                    usted manifiesta haber leído y consentido estos términos.
                    Si no está de acuerdo, seleccione{" "}
                    <strong>&ldquo;No acepto&rdquo;</strong> para salir.
                  </p>

                  <p className="mt-2 rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-xs italic text-[var(--color-text-muted)]">
                    Términos y Condiciones · Versión preliminar. El documento
                    integral será publicado por la Unidad de Transparencia
                    Municipal una vez validado oficialmente.
                  </p>
                </div>

                <div className="flex flex-col-reverse items-stretch gap-3 border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-4 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    type="button"
                    onClick={onDecline}
                    className="rounded-md border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-text-muted)] hover:bg-[var(--color-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2"
                  >
                    No acepto
                  </button>
                  <button
                    type="button"
                    onClick={onAccept}
                    autoFocus
                    className="rounded-md bg-[var(--color-guinda)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-guinda-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2"
                  >
                    Acepto
                  </button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export default TermsModal;
