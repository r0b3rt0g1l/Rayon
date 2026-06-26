import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { municipalConfig } from "@/lib/municipalConfig";

export const metadata = buildMetadata({
  title: "Página no encontrada",
  description: `La página que buscas no se encuentra disponible. Verifica la URL o regresa al inicio del Portal Institucional de ${municipalConfig.identidad.nombreCorto}.`,
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-1 items-center justify-center overflow-hidden bg-[var(--color-guinda)] px-6 py-20 text-center text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_25%_25%,rgba(212,160,23,0.6)_0,transparent_55%),radial-gradient(circle_at_80%_75%,white_0,transparent_55%)]"
      />

      <div className="relative flex max-w-2xl flex-col items-center gap-8">
        <span
          aria-hidden="true"
          className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-[var(--color-dorado)]/40 bg-white/5 backdrop-blur-sm"
        >
          <FileQuestion className="h-24 w-24 text-[var(--color-dorado)]" />
        </span>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-dorado)]">
            Error 404
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-balance text-[var(--color-cream)] md:text-5xl lg:text-[48px]">
            Página no encontrada
          </h1>
          <p className="text-lg text-white/80 md:text-xl">
            Verifica la URL o regresa al inicio.
          </p>
        </div>

        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-dorado)] px-7 py-3.5 text-sm font-semibold text-[var(--color-guinda-deep)] shadow-lg transition hover:bg-white hover:shadow-xl"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
          />
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
}
