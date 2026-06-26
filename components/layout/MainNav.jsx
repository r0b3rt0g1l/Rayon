"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Facebook } from "lucide-react";
import { municipalConfig } from "@/lib/municipalConfig";
import { navItems } from "@/components/layout/navItems";
import { NavLink } from "@/components/layout/NavLink";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/cn";

export function MainNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { identidad, redes } = municipalConfig;

  return (
    <motion.header
      initial={false}
      animate={{
        boxShadow: scrolled
          ? "0 4px 20px rgba(26, 26, 26, 0.10)"
          : "0 1px 0 rgba(229, 229, 229, 1)",
      }}
      transition={{ duration: 0.2 }}
      className={cn(
        "sticky top-0 z-40 border-b border-[var(--color-dorado)]/20 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/85",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:h-[88px]">
        <Link
          href="/"
          className="flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2 rounded-md"
          aria-label={`Ir al inicio del ${identidad.nombreCompleto}`}
        >
          <Image
            src="/escudo-baviacora-hd.png"
            alt=""
            width={621}
            height={717}
            priority
            className="h-12 w-auto shrink-0 md:h-16"
          />
          <div className="flex flex-col leading-tight">
            {/* Móvil (< 640px): nombre corto para no apretar al botón de menú.
                Tablet+ (≥ 640px): nombre oficial completo. */}
            <span className="font-display text-base font-bold text-[var(--color-text)] md:text-lg">
              <span className="sm:hidden">{identidad.nombreCorto}</span>
              <span className="hidden sm:inline">{identidad.nombreOficial}</span>
            </span>
            {/* Subtítulo "Administración 2024-2027" sólo en tablet+ para
                no saturar el header en pantallas pequeñas. */}
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-secondary)] sm:inline md:text-xs">
              Administración {identidad.administracion}
            </span>
          </div>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-stretch gap-5 lg:flex"
        >
          {navItems.map((item) =>
            item.children ? (
              <NavDropdown
                key={item.label}
                label={item.label}
                items={item.children}
                externalHref={item.externalHref}
                externalAriaLabel={item.externalAriaLabel}
              />
            ) : (
              <NavLink
                key={item.label}
                href={item.href}
                label={item.label}
                external={item.external}
              />
            ),
          )}
        </nav>

        {redes.facebook && (
          <a
            href={redes.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Facebook oficial de ${identidad.nombreCorto}`}
            className="hidden h-10 w-10 items-center justify-center rounded-full text-[#1877F2] transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2 lg:inline-flex"
          >
            <Facebook aria-hidden="true" className="h-5 w-5 fill-current" />
          </a>
        )}

        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}

export default MainNav;
