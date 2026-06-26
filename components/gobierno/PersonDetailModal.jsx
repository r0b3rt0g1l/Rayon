"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Copy, UserRound } from "lucide-react";
import { useToast } from "@/hooks/useToast";

const TIPO_LABEL = {
  presidente: "Presidencia Municipal",
  sindica: "Sindicatura Municipal",
  regidor: "Regiduría",
  dif: "DIF Municipal",
  secretario: "Secretaría Municipal",
  tesorero: "Tesorería Municipal",
  contralor: "Órgano Interno de Control",
  cabildo: "Otras áreas",
};

function isPendingName(nombre) {
  return typeof nombre === "string" && nombre.startsWith("[PENDIENTE");
}

function getInitials(nombre) {
  const cleaned = String(nombre ?? "")
    .replace(/^c\.\s*/i, "")
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function PersonDetailModal({ person, open, onOpenChange }) {
  const toast = useToast();

  if (!person) return null;

  const isOtrasAreas = person.tipo === "cabildo";
  // Bucket "cabildo" (tipo=OTRO y tipos sin mapear): el eyebrow muestra el cargo
  // real en lugar de "Otras áreas"; abajo se omite la línea de cargo para no
  // duplicarlo. Fallback a "Otras áreas" si no hubiera cargo.
  const tipoLabel = isOtrasAreas
    ? person.cargo?.trim() || "Otras áreas"
    : TIPO_LABEL[person.tipo] ?? "Cabildo";
  const isPending = isPendingName(person.nombre);
  // Cuando el nombre es placeholder no calculamos iniciales (saldrían "[P")
  // ni mostramos el placeholder crudo. Mostramos "Por designar" en su lugar.
  const initials = isPending ? null : getInitials(person.nombre);
  const displayNombre = isPending ? "Por designar" : person.nombre;

  const handleCopy = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.show(`${label} copiado al portapapeles`);
    } catch {
      toast.show("No se pudo copiar — copia manualmente");
    }
  };

  const hasContact = Boolean(person.email || person.telefono);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[60] bg-[var(--color-guinda-deep)]/60 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-1/2 top-1/2 z-[60] w-[min(94vw,768px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl"
              >
                <Dialog.Title className="sr-only">
                  {displayNombre}
                </Dialog.Title>
                <Dialog.Description className="sr-only">
                  {isOtrasAreas ? tipoLabel : `${tipoLabel} · ${person.cargo}`}
                </Dialog.Description>

                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Cerrar"
                    className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[var(--color-text)] shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </Dialog.Close>

                <div className="grid max-h-[90vh] grid-cols-1 overflow-hidden md:grid-cols-[2fr_3fr]">
                  <div className="relative flex aspect-square w-full items-center justify-center bg-gradient-to-br from-[var(--color-guinda-deep)] to-[var(--color-guinda)] md:aspect-auto md:h-full md:min-h-[420px]">
                    {person.foto ? (
                      <Image
                        src={person.foto}
                        alt={`Fotografía de ${displayNombre}`}
                        fill
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-center">
                        {isPending ? (
                          <span
                            aria-hidden="true"
                            className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-[var(--color-dorado)]/60 text-[var(--color-cream)]/70"
                          >
                            <UserRound className="h-12 w-12" />
                          </span>
                        ) : (
                          <span
                            aria-hidden="true"
                            className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-[var(--color-dorado)] font-display text-4xl font-bold text-[var(--color-dorado)]"
                          >
                            {initials}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-[var(--color-cream)]/80">
                          <UserRound
                            aria-hidden="true"
                            className="h-3.5 w-3.5"
                          />
                          {isPending ? "Por designar" : "Foto pendiente"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex max-h-[90vh] flex-col overflow-y-auto p-6 md:p-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
                      {tipoLabel}
                    </p>
                    {isPending ? (
                      <h2 className="mt-2 font-display text-2xl font-medium italic leading-tight tracking-tight text-[var(--color-text-muted)] md:text-3xl">
                        Por designar
                      </h2>
                    ) : (
                      <h2 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-[var(--color-text)] md:text-3xl">
                        {person.nombre}
                      </h2>
                    )}
                    {!isOtrasAreas && (
                      <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)]">
                        {person.cargo}
                      </p>
                    )}
                    {person.administracion && (
                      <p className="mt-0.5 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                        Administración {person.administracion}
                      </p>
                    )}

                    {person.bio && (
                      <p className="mt-5 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                        {person.bio}
                      </p>
                    )}

                    {hasContact && (
                      <div className="mt-6 space-y-1.5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                          Contacto
                        </p>
                        {person.email && (
                          <ContactItem
                            icon={Mail}
                            label="Correo"
                            value={person.email}
                            onClick={() =>
                              handleCopy(person.email, "Correo")
                            }
                          />
                        )}
                        {person.telefono && (
                          <ContactItem
                            icon={Phone}
                            label="Teléfono"
                            value={person.telefono}
                            onClick={() =>
                              handleCopy(person.telefono, "Teléfono")
                            }
                          />
                        )}
                      </div>
                    )}

                    {!hasContact && !person.bio && (
                      <p className="mt-6 rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-xs italic text-[var(--color-text-muted)]">
                        Datos de contacto pendientes de publicación oficial.
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function ContactItem({ icon: Icon, label, value, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:-translate-y-0.5 hover:bg-[var(--color-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-guinda)]/10 text-[var(--color-guinda)]">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="flex-1 leading-tight">
        <span className="block text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
          {label}
        </span>
        <span className="mt-0.5 block text-sm font-medium text-[var(--color-text)]">
          {value}
        </span>
      </span>
      <Copy
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-[var(--color-text-muted)] opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <span className="sr-only">Copiar al portapapeles</span>
    </button>
  );
}

export default PersonDetailModal;
