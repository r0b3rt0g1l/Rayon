"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Facebook, ChevronRight, ExternalLink } from "lucide-react";
import { municipalConfig } from "@/lib/municipalConfig";
import { navItems } from "@/components/layout/navItems";
import { cn } from "@/lib/cn";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { identidad, redes } = municipalConfig;

  const handleClose = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Abrir menú de navegación"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[var(--color-text)] transition-colors hover:bg-[var(--color-guinda)]/5 hover:text-[var(--color-guinda)]"
        >
          <motion.span
            key={open ? "x" : "menu"}
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.18 }}
            aria-hidden="true"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.span>
        </button>
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
                className="fixed inset-0 z-40 bg-[var(--color-guinda-deep)]/40 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.32 }}
                className="fixed right-0 top-0 z-50 flex h-dvh w-full max-w-sm flex-col bg-white shadow-2xl"
                aria-label="Menú móvil"
              >
                <Dialog.Title className="sr-only">
                  Menú de navegación
                </Dialog.Title>
                <Dialog.Description className="sr-only">
                  Acceso a las secciones del Portal Institucional de {identidad.nombreCorto}.
                </Dialog.Description>

                <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
                  <Link
                    href="/"
                    onClick={handleClose}
                    className="flex items-center gap-3"
                    aria-label="Ir al inicio"
                  >
                    <Image
                      src="/escudo-baviacora-hd.png"
                      alt=""
                      width={621}
                      height={717}
                      className="h-10 w-auto"
                    />
                    <div className="leading-tight">
                      <p className="font-display text-sm font-bold">
                        {identidad.nombreCorto}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)]">
                        {identidad.administracion}
                      </p>
                    </div>
                  </Link>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Cerrar menú"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[var(--color-text)] transition-colors hover:bg-[var(--color-guinda)]/5 hover:text-[var(--color-guinda)]"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </Dialog.Close>
                </div>

                <nav
                  aria-label="Navegación móvil"
                  className="flex-1 overflow-y-auto px-2 py-4"
                >
                  <ul className="flex flex-col gap-1">
                    {navItems.map((item) =>
                      item.children ? (
                        <li key={item.label} className="mt-3 first:mt-0">
                          {item.externalHref ? (
                            <a
                              href={item.externalHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={handleClose}
                              aria-label={item.externalAriaLabel ?? item.label}
                              className="mx-4 mb-1 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-guinda)] hover:underline"
                            >
                              {item.label}
                              <ExternalLink
                                aria-hidden="true"
                                className="h-3 w-3"
                              />
                            </a>
                          ) : (
                            <p className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                              {item.label}
                            </p>
                          )}
                          <ul className="flex flex-col">
                            {item.children.map((child) => (
                              <MobileLink
                                key={child.href}
                                href={child.href}
                                label={child.label}
                                pathname={pathname}
                                onClick={handleClose}
                                indent
                              />
                            ))}
                          </ul>
                        </li>
                      ) : (
                        <MobileLink
                          key={item.href}
                          href={item.href}
                          label={item.label}
                          pathname={pathname}
                          onClick={handleClose}
                          external={item.external}
                        />
                      ),
                    )}
                  </ul>
                </nav>

                <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                    Síguenos
                  </p>
                  {redes.facebook ? (
                    <Link
                      href={redes.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleClose}
                      aria-label={`Facebook oficial de ${identidad.nombreCorto}`}
                      className="mt-3 inline-flex items-center gap-3 rounded-lg bg-[var(--color-guinda-deep)] px-4 py-3 text-white transition hover:bg-[var(--color-guinda)]"
                    >
                      <Facebook
                        aria-hidden="true"
                        className="h-10 w-10 rounded-full bg-white/10 p-2"
                      />
                      <span>
                        <span className="block text-xs uppercase tracking-widest text-white/70">
                          Facebook oficial
                        </span>
                        <span className="block text-sm font-semibold">
                          Página oficial
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <p className="mt-3 rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-xs italic text-[var(--color-text-muted)]">
                      TODO_MUNICIPIO: redes_sociales — URL oficial pendiente.
                    </p>
                  )}
                </div>
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function MobileLink({ href, label, pathname, onClick, indent = false, external = false }) {
  const isActive = external
    ? false
    : href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const classes = cn(
    "flex items-center justify-between rounded-md py-3 text-base font-medium transition-colors",
    indent ? "pl-7 pr-4" : "px-4",
    isActive
      ? "bg-[var(--color-guinda)] text-white"
      : "text-[var(--color-text)] hover:bg-[var(--color-guinda)]/5 hover:text-[var(--color-guinda)]",
  );

  // Enlace externo (portal estatal de Sonora): pestaña nueva, con ícono.
  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          className={classes}
        >
          <span>{label}</span>
          <ExternalLink
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-[var(--color-text-muted)]"
          />
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={classes}
        aria-current={isActive ? "page" : undefined}
      >
        <span>{label}</span>
        <ChevronRight
          aria-hidden="true"
          className={cn(
            "h-4 w-4 shrink-0 transition-colors",
            isActive ? "text-[var(--color-dorado)]" : "text-[var(--color-text-muted)]",
          )}
        />
      </Link>
    </li>
  );
}

export default MobileMenu;
