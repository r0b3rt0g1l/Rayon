"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";

export function NavDropdown({
  label,
  items,
  externalHref,
  externalAriaLabel,
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isAnyChildActive = items.some((item) =>
    pathname?.startsWith(item.href),
  );

  const triggerColor = isAnyChildActive || open
    ? "text-[var(--color-guinda)]"
    : "text-[var(--color-text)] hover:text-[var(--color-guinda)]";

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <div className="group relative inline-flex h-full items-center gap-1">
        {externalHref ? (
          <a
            href={externalHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={externalAriaLabel ?? label}
            className={cn(
              "relative inline-flex h-full items-center gap-1.5 whitespace-nowrap px-1 py-2 text-sm font-medium uppercase tracking-normal transition-colors duration-200 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2",
              triggerColor,
            )}
          >
            <span className="relative">
              {label}
              <motion.span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left rounded-full bg-[var(--color-dorado)]"
                initial={false}
                animate={{ scaleX: isAnyChildActive || open ? 1 : 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
            <ExternalLink
              aria-hidden="true"
              className="h-[14px] w-[14px] opacity-70"
            />
          </a>
        ) : null}

        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            aria-label={
              externalHref
                ? `Ver más opciones de ${label}`
                : undefined
            }
            className={cn(
              "relative inline-flex h-full items-center gap-1 whitespace-nowrap px-1 py-2 text-sm font-medium uppercase tracking-normal transition-colors duration-200 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2",
              triggerColor,
              externalHref && "px-1",
            )}
          >
            {!externalHref && (
              <span className="relative">
                {label}
                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left rounded-full bg-[var(--color-dorado)]"
                  initial={false}
                  animate={{ scaleX: isAnyChildActive || open ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            )}
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </button>
        </DropdownMenu.Trigger>
      </div>

      <AnimatePresence>
        {open && (
          <DropdownMenu.Portal forceMount>
            <DropdownMenu.Content
              align="start"
              sideOffset={12}
              asChild
            >
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="z-50 min-w-[260px] rounded-lg border border-[var(--color-border)] bg-white p-2 shadow-[var(--shadow-card-hover)]"
              >
                <div className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  {label}
                </div>
                {items.map((item) => {
                  const isActive = pathname?.startsWith(item.href);
                  return (
                    <DropdownMenu.Item key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium outline-none transition-colors",
                          isActive
                            ? "bg-[var(--color-guinda)] text-white"
                            : "text-[var(--color-text)] hover:bg-[var(--color-guinda)]/10 hover:text-[var(--color-guinda)] focus:bg-[var(--color-guinda)]/10 focus:text-[var(--color-guinda)] data-[highlighted]:bg-[var(--color-guinda)]/10 data-[highlighted]:text-[var(--color-guinda)] data-[highlighted]:ring-2 data-[highlighted]:ring-inset data-[highlighted]:ring-[var(--color-guinda)]",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-1.5 w-1.5 rounded-full transition-colors",
                            isActive
                              ? "bg-[var(--color-dorado)]"
                              : "bg-[var(--color-border)] group-hover:bg-[var(--color-dorado)]",
                          )}
                        />
                        {item.label}
                      </Link>
                    </DropdownMenu.Item>
                  );
                })}
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  );
}

export default NavDropdown;
