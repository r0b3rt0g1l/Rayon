import { Breadcrumbs } from "@/components/seo/JsonLd";
import { FileText, Eye } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { municipalConfig } from "@/lib/municipalConfig";
import { sevac } from "@/lib/sevac";
import { getSevac } from "@/lib/content";
import { PDFViewer } from "@/components/transparencia/PDFViewer";
import { SevacFiltros } from "@/components/transparencia/SevacFiltros";
import { PageHeader } from "@/components/common/PageHeader";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "SEvAC",
  description: sevac.descripcion,
  path: "/transparencia/sevac",
});

const CATEGORIA_LABEL = {
  BOLETIN_OFICIAL: "Boletín Oficial",
  INFORME_TRIMESTRAL: "Informe Trimestral",
  CUENTA_PUBLICA: "Cuenta Pública",
  PRESUPUESTO_EGRESOS: "Presupuesto de Egresos",
  LEY_INGRESOS: "Ley de Ingresos",
};

const CATEGORIA_BADGE = {
  BOLETIN_OFICIAL:
    "bg-[var(--color-dorado)]/15 text-[var(--color-dorado-700)] border-[var(--color-dorado)]/30",
  INFORME_TRIMESTRAL:
    "bg-[var(--color-guinda)]/10 text-[var(--color-guinda)] border-[var(--color-guinda)]/20",
  CUENTA_PUBLICA:
    "bg-[var(--color-guinda-deep)]/10 text-[var(--color-guinda-deep)] border-[var(--color-guinda-deep)]/20",
  PRESUPUESTO_EGRESOS:
    "bg-[var(--color-dorado)]/15 text-[var(--color-dorado-700)] border-[var(--color-dorado)]/30",
  LEY_INGRESOS:
    "bg-[var(--color-dorado)]/15 text-[var(--color-dorado-700)] border-[var(--color-dorado)]/30",
};

const BADGE_FALLBACK =
  "bg-[var(--color-guinda)]/10 text-[var(--color-guinda)] border-[var(--color-guinda)]/20";

function asString(v) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function SevacPage({ searchParams }) {
  const params = (await searchParams) ?? {};
  const anioRaw = asString(params.anio);
  const trimestreRaw = asString(params.trimestre);
  const anio = anioRaw ? Number(anioRaw) : undefined;
  const trimestre = trimestreRaw || undefined;

  const documentos = await getSevac({ anio, trimestre });
  const hayFiltros = Boolean(anio || trimestre);

  return (
    <main className="flex flex-1 flex-col">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Transparencia", path: "/transparencia" }, { name: "SEvAC", path: "/transparencia/sevac" }]} />
      <PageHeader
        clave="header-sevac"
        eyebrow="Armonización contable"
        fallbackTitulo="SEvAC"
        fallbackDescripcion={sevac.titulo}
        bg="bg"
        narrow
      >
        <p className="mt-3 max-w-3xl text-sm text-[var(--color-text-secondary)] md:text-base">
          {sevac.descripcionCorta}
        </p>
      </PageHeader>

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 md:py-16">
        <div className="space-y-5 text-base leading-relaxed text-[var(--color-text-secondary)]">
          <p>{sevac.descripcion}</p>
          <p>{sevac.marcoLegal}</p>
        </div>
      </section>

      <section
        aria-label="Documentos SEvAC"
        className="border-y border-[var(--color-border)] bg-white"
      >
        <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 md:py-16">
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-guinda)]">
              Publicaciones oficiales
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Documentos SEvAC
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[var(--color-text-secondary)]">
              Información financiera y presupuestal publicada por el{" "}
              {municipalConfig.identidad.nombreCompleto} en cumplimiento de la
              armonización contable. Los documentos se visualizan directamente
              en este portal.
            </p>
          </header>

          <div className="mb-6">
            <SevacFiltros
              anioActivo={anio}
              trimestreActivo={trimestre}
            />
          </div>

          {documentos.length === 0 ? (
            <p className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-8 text-center text-sm text-[var(--color-text-muted)]">
              {hayFiltros
                ? "No hay documentos para los filtros seleccionados."
                : "Aún no hay documentos publicados."}
            </p>
          ) : (
            <ul className="grid gap-4">
              {documentos.map((doc) => {
                const badge = CATEGORIA_BADGE[doc.categoria] ?? BADGE_FALLBACK;
                const label =
                  CATEGORIA_LABEL[doc.categoria] || doc.categoria || "Documento";
                const disponible = Boolean(doc.url);
                const subtitlePartes = [label];
                if (doc.anio != null) subtitlePartes.push(`Ejercicio ${doc.anio}`);
                if (doc.trimestre != null)
                  subtitlePartes.push(`Trim. ${doc.trimestre}`);
                const subtitle = subtitlePartes.join(" · ");

                return (
                  <li
                    key={doc.id}
                    className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] sm:flex-row sm:items-center"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--color-guinda)]/10 text-[var(--color-guinda)]">
                      <FileText className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="flex-1 leading-tight">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${badge}`}
                      >
                        {label}
                      </span>
                      <p className="mt-2 font-display text-base font-semibold text-[var(--color-text)] md:text-lg">
                        {doc.titulo}
                      </p>
                      {doc.descripcion && (
                        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                          {doc.descripcion}
                        </p>
                      )}
                      {(doc.anio != null || doc.trimestre != null) && (
                        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                          {doc.anio != null && <>Ejercicio {doc.anio}</>}
                          {doc.anio != null && doc.trimestre != null && " · "}
                          {doc.trimestre != null && <>Trim. {doc.trimestre}</>}
                        </p>
                      )}
                    </div>
                    {disponible ? (
                      <PDFViewer
                        pdfUrl={doc.url}
                        title={doc.titulo}
                        subtitle={subtitle}
                        trigger={
                          <button
                            type="button"
                            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[var(--color-guinda)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-guinda-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-2 sm:self-center"
                          >
                            <Eye className="h-4 w-4" aria-hidden="true" />
                            Ver documento
                          </button>
                        }
                      />
                    ) : (
                      <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[var(--color-text-muted)]/15 px-4 py-2 text-sm font-medium italic text-[var(--color-text-muted)] sm:self-center">
                        Próximamente disponible
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 md:py-12">
        <p className="rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-xs italic text-[var(--color-text-muted)]">
          Fuente: {sevac.fuente}
        </p>
      </section>
    </main>
  );
}
