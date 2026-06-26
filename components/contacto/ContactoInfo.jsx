import Link from "next/link";
import { MapPin, Facebook } from "lucide-react";
import { municipalConfig } from "@/lib/municipalConfig";

// Barra de datos compacta (una sola tarjeta horizontal) para que la página de
// contacto entre en el viewport sin scroll en desktop. Política Northa: cero
// contacto directo — NO se exponen teléfono ni correo; el contacto es por el
// formulario de esta página.
export function ContactoInfo() {
  const { contacto, redes } = municipalConfig;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-card)] md:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Dirección */}
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-guinda)]/10 text-[var(--color-guinda)]">
            <MapPin className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              Palacio Municipal de {municipalConfig.identidad.nombreCorto}
            </p>
            <p className="mt-1 text-sm font-medium text-[var(--color-text)]">
              {contacto.direccionCompleta}
            </p>
          </div>
        </div>

        {/* Facebook oficial */}
        {redes.facebook ? (
          <Link
            href={redes.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Facebook oficial del ${municipalConfig.identidad.nombreCompleto}`}
            className="group inline-flex shrink-0 items-center gap-3 rounded-xl border border-[var(--color-border)] px-3 py-2 transition hover:border-[var(--color-guinda)]/40 hover:bg-[var(--color-guinda)]/5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-guinda)] text-white transition group-hover:bg-[var(--color-dorado)] group-hover:text-[var(--color-guinda-deep)]">
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                Facebook oficial
              </span>
              <span className="block text-sm font-semibold text-[var(--color-text)]">
                Página oficial
              </span>
            </span>
          </Link>
        ) : (
          <p className="shrink-0 rounded-xl border border-dashed border-[var(--color-border)] px-3 py-2 text-xs italic text-[var(--color-text-muted)]">
            TODO_MUNICIPIO: redes_sociales — URL oficial pendiente.
          </p>
        )}
      </div>

      <p className="mt-3 text-xs text-[var(--color-text-secondary)]">
        Para comunicarte con el Ayuntamiento, utiliza el formulario. Te responderemos a la brevedad.
      </p>
    </div>
  );
}

export default ContactoInfo;
