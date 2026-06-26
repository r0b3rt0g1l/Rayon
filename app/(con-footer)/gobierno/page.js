import { Breadcrumbs } from "@/components/seo/JsonLd";
import Link from "next/link";
import { Users, Network, FileText, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { municipalConfig } from "@/lib/municipalConfig";
import { getCabildo } from "@/lib/content";
import { GobiernoSubNav } from "@/components/gobierno/GobiernoSubNav";
import { CabildoSection } from "@/components/gobierno/CabildoSection";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Gobierno",
  description: `Conoce la estructura del ${municipalConfig.identidad.nombreCompleto}: cabildo completo, organigrama institucional y plan municipal de desarrollo.`,
  path: "/gobierno",
});

const accesos = [
  {
    href: "/gobierno/directorio",
    titulo: "Directorio del Cabildo",
    descripcion:
      "Vista en cuadrícula con cada integrante del Cabildo Municipal y la Presidencia del DIF. Click para ver detalles y datos de contacto.",
    icon: Users,
  },
  {
    href: "/gobierno/cabildo",
    titulo: "Cabildo",
    descripcion:
      "Personas que integran el Cabildo y la Presidencia del DIF Municipal. Las direcciones se publicarán conforme a las designaciones oficiales.",
    icon: Network,
  },
  {
    href: "/gobierno/plan-municipal",
    titulo: "Plan Municipal de Desarrollo",
    descripcion: `Ejes rectores, programas y compromisos del ${municipalConfig.identidad.nombreCompleto} para el periodo ${municipalConfig.identidad.administracion}.`,
    icon: FileText,
  },
];

export default async function GobiernoPage() {
  const lista = await getCabildo();

  return (
    <main className="flex flex-1 flex-col">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Gobierno", path: "/gobierno" }]} />
      <header className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
            Administración {municipalConfig.identidad.administracion}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Gobierno Municipal
          </h1>
          <p className="mt-4 max-w-3xl text-base text-[var(--color-text-secondary)] md:text-lg">
            Conoce la estructura institucional del Gobierno Municipal de{" "}
            {municipalConfig.identidad.nombreCorto}: el Cabildo, sus Direcciones,
            Organismos Descentralizados y el Plan Municipal de Desarrollo.
          </p>
        </div>
      </header>

      <GobiernoSubNav />

      <CabildoSection lista={lista} />

      <section className="bg-[var(--color-bg)] border-t border-[var(--color-border)]">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <header className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
              Otras secciones
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Más sobre el Gobierno Municipal
            </h2>
          </header>
          <ul className="grid gap-6 md:grid-cols-3">
            {accesos.map((s) => (
              <li key={s.href} className="flex">
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-white p-7 shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-guinda)]/30 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-guinda)]/10 text-[var(--color-guinda)] transition group-hover:bg-[var(--color-guinda)] group-hover:text-white">
                    <s.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-guinda)]">
                    {s.titulo}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {s.descripcion}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-guinda)]">
                    Ir a la sección
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
