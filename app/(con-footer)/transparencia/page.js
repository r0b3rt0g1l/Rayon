import { Breadcrumbs } from "@/components/seo/JsonLd";
import {
  Network,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { municipalConfig } from "@/lib/municipalConfig";
import { HubCard } from "@/components/transparencia/HubCard";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Transparencia",
  description: `Hub de Transparencia del ${municipalConfig.identidad.nombreCompleto}: información pública, leyes, estructura orgánica, SEvAC y enlaces a las plataformas nacional y estatal de transparencia.`,
  path: "/transparencia",
});

const ICON_CLASS = "h-6 w-6";

const cards = [
  {
    icon: <Network className={ICON_CLASS} aria-hidden="true" />,
    label: "Cabildo",
    description:
      "Integrantes del Cabildo Municipal: Presidencia, Sindicatura y Regidurías.",
    href: "/gobierno/cabildo",
  },
  {
    icon: <BarChart3 className={ICON_CLASS} aria-hidden="true" />,
    label: "SEvAC",
    description:
      "Sistema de Evaluaciones de la Armonización Contable: cumplimiento por categoría e informes trimestrales del ejercicio fiscal.",
    href: "/transparencia/sevac",
  },
  {
    icon: <ExternalLink className={ICON_CLASS} aria-hidden="true" />,
    label: "Plataforma Nacional de Transparencia",
    description:
      "Acceso al Sistema Nacional de Transparencia donde se concentra la información de los sujetos obligados de México.",
    href: municipalConfig.enlacesExternos.plataformaNacionalTransparencia,
    external: true,
  },
  {
    icon: <ExternalLink className={ICON_CLASS} aria-hidden="true" />,
    label: "Portal Estatal de Transparencia",
    description: `Información pública del ${municipalConfig.identidad.nombreOficial} disponible en el Portal de Transparencia del Estado.`,
    href: municipalConfig.enlacesExternos.transparenciaSonora,
    external: true,
  },
];

export default function TransparenciaHubPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Transparencia", path: "/transparencia" }]} />
      <section
        aria-label="Hub de Transparencia"
        className="relative isolate overflow-hidden bg-[var(--color-guinda)] text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_85%_15%,rgba(212,160,23,0.6)_0,transparent_45%),radial-gradient(circle_at_15%_85%,white_0,transparent_45%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-cream)] backdrop-blur-sm">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-dorado)]"
              />
              Hub institucional
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-[var(--color-cream)] md:text-5xl lg:text-6xl">
              Transparencia para el Pueblo de {municipalConfig.identidad.nombreCorto}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-[var(--color-cream)]/85 md:text-lg">
              Información pública, marco legal, evaluaciones SEvAC y el
              organigrama completo del Ayuntamiento — todo en un solo lugar.
            </p>
          </div>

          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((c, i) => (
              <li key={c.label} className="flex">
                <HubCard
                  icon={c.icon}
                  label={c.label}
                  description={c.description}
                  href={c.href}
                  external={c.external}
                  index={i}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
