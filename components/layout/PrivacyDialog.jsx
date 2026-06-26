"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Eye } from "lucide-react";
import { municipalConfig } from "@/lib/municipalConfig";
import { PDFViewer } from "@/components/transparencia/PDFViewer";

export function PrivacyDialog({ trigger }) {
  const [open, setOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const { identidad, contacto } = municipalConfig;

  function handleOpenPdf() {
    setOpen(false);
    setTimeout(() => setPdfOpen(true), 220);
  }

  return (
    <>
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {trigger ?? (
          <button
            type="button"
            className="text-sm text-[var(--color-cream)]/80 underline-offset-4 transition hover:text-white hover:underline"
          >
            Aviso de Privacidad
          </button>
        )}
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-[var(--color-guinda-deep)]/60 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
              >
                <div className="flex items-start gap-4 border-b border-[var(--color-border)] bg-gradient-to-br from-[var(--color-guinda-deep)] to-[var(--color-guinda)] px-6 py-5 text-white">
                  <div className="rounded-full bg-white/15 p-2">
                    <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <Dialog.Title className="font-display text-xl font-bold">
                      Aviso de Privacidad
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-sm text-white/80">
                      {identidad.nombreOficial}, Sonora
                    </Dialog.Description>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Cerrar aviso de privacidad"
                      className="-mt-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5 text-sm leading-relaxed text-[var(--color-text)]">
                  <section>
                    <p>
                      El <strong>{identidad.nombreOficial}</strong>, con
                      domicilio en {contacto.direccionCompleta}, es el
                      responsable del tratamiento de los datos personales que
                      nos proporcione, los cuales serán protegidos conforme a
                      lo establecido en la <em>Ley General de Protección de
                      Datos Personales en Posesión de Sujetos Obligados</em>,
                      la <em>Ley General de Transparencia y Acceso a la
                      Información Pública</em>, y demás normatividad aplicable.
                    </p>
                  </section>

                  <section>
                    <h4 className="mb-1 font-display text-base font-semibold text-[var(--color-guinda-deep)]">
                      Finalidades del tratamiento
                    </h4>
                    <p>
                      Los datos personales recabados serán utilizados para
                      atender solicitudes de información pública, dar respuesta
                      a consultas ciudadanas, gestionar trámites y servicios
                      municipales y mantener comunicación institucional con
                      las y los habitantes del municipio.
                    </p>
                  </section>

                  <section>
                    <h4 className="mb-1 font-display text-base font-semibold text-[var(--color-guinda-deep)]">
                      Datos personales recabados
                    </h4>
                    <p>
                      A través de los formularios de este portal podemos
                      recabar: nombre completo, correo electrónico, número
                      telefónico, localidad de residencia y la descripción
                      libre del asunto, consulta o solicitud que el
                      interesado registre. No se recaban datos personales
                      sensibles a través de los formularios públicos del
                      sitio.
                    </p>
                  </section>

                  <section>
                    <h4 className="mb-1 font-display text-base font-semibold text-[var(--color-guinda-deep)]">
                      Transferencias
                    </h4>
                    <p>
                      No se realizan transferencias de datos personales que
                      requieran del consentimiento del titular, salvo aquellas
                      que sean necesarias para atender requerimientos de
                      información de autoridades competentes en términos de
                      las leyes aplicables.
                    </p>
                  </section>

                  <section>
                    <h4 className="mb-1 font-display text-base font-semibold text-[var(--color-guinda-deep)]">
                      Derechos ARCO
                    </h4>
                    <p>
                      Usted puede ejercer los derechos de Acceso,
                      Rectificación, Cancelación y Oposición sobre el
                      tratamiento de sus datos personales, así como revocar el
                      consentimiento que para tal fin haya otorgado, ante la
                      Unidad de Transparencia Municipal o bien a través de la{" "}
                      <a
                        href={
                          municipalConfig.enlacesExternos
                            .plataformaNacionalTransparencia
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4"
                      >
                        Plataforma Nacional de Transparencia
                      </a>
                      .
                    </p>
                  </section>

                  <section>
                    <h4 className="mb-1 font-display text-base font-semibold text-[var(--color-guinda-deep)]">
                      Cambios al aviso
                    </h4>
                    <p>
                      El presente aviso de privacidad podrá sufrir
                      modificaciones, cambios o actualizaciones derivadas de
                      nuevos requerimientos legales. Cualquier cambio será
                      informado a través de este portal institucional.
                    </p>
                  </section>

                  <p className="mt-2 rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-xs italic text-[var(--color-text-muted)]">
                    Aviso de Privacidad Simplificado. El documento oficial
                    publicado por el Ayuntamiento puede consultarse y
                    descargarse desde el botón inferior.
                  </p>
                </div>

                <div className="flex flex-col-reverse items-stretch gap-3 border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-4 sm:flex-row sm:items-center sm:justify-end">
                  {municipalConfig.enlacesExternos.avisoPrivacidadPdf && (
                    <button
                      type="button"
                      onClick={handleOpenPdf}
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--color-border)] bg-white px-4 py-2 text-center text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-guinda)] hover:text-[var(--color-guinda)]"
                    >
                      <Eye className="h-4 w-4" aria-hidden="true" />
                      Ver Aviso oficial
                    </button>
                  )}
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="rounded-md bg-[var(--color-guinda)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-guinda-deep)]"
                    >
                      Entendido
                    </button>
                  </Dialog.Close>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>

    <PDFViewer
      pdfUrl={municipalConfig.enlacesExternos.avisoPrivacidadPdf}
      title="Aviso de Privacidad"
      subtitle={identidad.nombreCompleto}
      open={pdfOpen}
      onOpenChange={setPdfOpen}
    />
    </>
  );
}

export default PrivacyDialog;
