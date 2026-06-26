import Link from "next/link";
import { Facebook, MapPin, Mail, Clock, ExternalLink } from "lucide-react";
import { municipalConfig } from "@/lib/municipalConfig";
import { PrivacyDialog } from "@/components/layout/PrivacyDialog";

const accesoRapido = [
  { label: "Inicio", href: "/" },
  { label: "Gobierno", href: "/gobierno" },
  { label: "Acciones de Gobierno", href: "/acciones-de-gobierno" },
  {
    label: "Transparencia",
    href: municipalConfig.enlacesExternos.transparenciaSonora,
    external: true,
  },
  { label: "Turismo", href: "/turismo" },
  { label: "Galería", href: "/galeria" },
  { label: "Contacto", href: "/contacto" },
];

const transparenciaLinks = [
  { label: "Hub de Transparencia", href: "/transparencia" },
  { label: "SEvAC", href: "/transparencia/sevac" },
  { label: "Cabildo", href: "/gobierno/cabildo" },
];

export function Footer({ overlay = false }) {
  const { identidad, contacto, redes, developer } = municipalConfig;

  return (
    <footer
      className={
        overlay
          ? "text-[var(--color-cream)]"
          : "bg-[var(--color-guinda-deep)] text-[var(--color-cream)]"
      }
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <FooterColumn title="Acceso rápido">
          <ul className="space-y-2 text-sm">
            {accesoRapido.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} (abre en nueva pestaña)`}
                    className="inline-flex items-center gap-1.5 text-[var(--color-cream)]/80 transition hover:text-white hover:underline underline-offset-4"
                  >
                    {item.label}
                    <ExternalLink
                      aria-hidden="true"
                      className="h-3 w-3 opacity-70"
                    />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-[var(--color-cream)]/80 transition hover:text-white hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Contacto">
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-dorado)]"
              />
              <span className="text-[var(--color-cream)]/85">
                {contacto.direccionCompleta}
              </span>
            </li>
            {contacto.horarios && (
              <li className="flex items-start gap-2.5">
                <Clock
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-dorado)]"
                />
                <span className="text-[var(--color-cream)]/85">
                  {contacto.horarios}
                </span>
              </li>
            )}
            {/* Política Northa: cero contacto directo. El contacto es por formulario. */}
            <li className="flex items-start gap-2.5">
              <Mail
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-dorado)]"
              />
              <Link
                href="/contacto"
                className="text-[var(--color-cream)]/85 hover:text-white hover:underline underline-offset-4"
              >
                Escríbenos por el formulario
              </Link>
            </li>
          </ul>
        </FooterColumn>

        <FooterColumn title="Transparencia">
          <ul className="space-y-2 text-sm">
            {transparenciaLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[var(--color-cream)]/80 transition hover:text-white hover:underline underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Síguenos">
          <p className="mb-4 text-sm text-[var(--color-cream)]/70">
            Mantente al día con las acciones del Gobierno Municipal a través
            de nuestro canal oficial.
          </p>
          {redes.facebook ? (
            <Link
              href={redes.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Facebook oficial del ${identidad.nombreCompleto}`}
              className="group inline-flex items-center gap-3 rounded-xl bg-white/5 p-3 transition hover:bg-white/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-guinda)] text-white transition group-hover:bg-[var(--color-dorado)] group-hover:text-[var(--color-guinda-deep)]">
                <Facebook className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs uppercase tracking-[0.18em] text-[var(--color-cream)]/60">
                  Facebook oficial
                </span>
                <span className="block text-sm font-semibold text-white">
                  Página oficial
                </span>
              </span>
            </Link>
          ) : (
            <p className="rounded-xl border border-dashed border-white/20 bg-white/5 p-3 text-xs italic text-[var(--color-cream)]/60">
              TODO_MUNICIPIO: redes_sociales — URL oficial pendiente.
            </p>
          )}
        </FooterColumn>
      </div>

      <div className="flex justify-center pb-2">
        <span
          aria-hidden="true"
          className="block h-px w-32 bg-[var(--color-dorado)]"
        />
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-[var(--color-cream)]/65 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>
            © {developer.anioActual} {identidad.nombreCompleto} · Todos los
            derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <PrivacyDialog />
            <span aria-hidden="true" className="hidden md:inline opacity-40">
              ·
            </span>
            <p>
              Desarrollado por{" "}
              <span className="font-semibold text-white">
                {developer.nombre}
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="mb-4 font-display text-base font-semibold text-white">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default Footer;
