"use client";

import Link from "next/link";
import { ArrowLeft, AlertCircle, RotateCcw } from "lucide-react";

// Error boundary por segmento (App Router). Captura excepciones de render en
// el contenido de la página y muestra una pantalla digna con "Reintentar"
// (reset) en lugar de una pantalla blanca. El layout (nav/footer) se conserva.
// Usa los tokens --color-* de Baviácora (verde/oro), igual que not-found.js.
export default function Error({ reset }) {
  return (
    <main className="relative isolate flex min-h-[70vh] flex-1 items-center justify-center overflow-hidden bg-[var(--color-guinda)] px-6 py-20 text-center text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_25%_25%,rgba(212,160,23,0.6)_0,transparent_55%),radial-gradient(circle_at_80%_75%,white_0,transparent_55%)]"
      />

      <div className="relative flex max-w-2xl flex-col items-center gap-8">
        <span
          aria-hidden="true"
          className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-[var(--color-dorado)]/40 bg-white/5 backdrop-blur-sm"
        >
          <AlertCircle className="h-20 w-20 text-[var(--color-dorado)]" />
        </span>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-dorado)]">
            Algo salió mal
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-balance text-[var(--color-cream)] md:text-5xl">
            Tuvimos un problema al mostrar esta página
          </h1>
          <p className="text-lg text-white/80 md:text-xl">
            Puedes reintentar o volver al inicio. Si el problema persiste,
            inténtalo de nuevo más tarde.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-dorado)] px-7 py-3.5 text-sm font-semibold text-[var(--color-guinda-deep)] shadow-lg transition hover:bg-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-guinda)]"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            Reintentar
          </button>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-guinda)]"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            />
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
