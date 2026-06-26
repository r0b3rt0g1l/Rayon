import { Breadcrumbs } from "@/components/seo/JsonLd";
import { MessageSquare } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { municipalConfig } from "@/lib/municipalConfig";
import { ContactoForm } from "@/components/contacto/ContactoForm";
import { ContactoInfo } from "@/components/contacto/ContactoInfo";
import { MapaEmbed } from "@/components/turismo/MapaEmbed";
import { PageHeader } from "@/components/common/PageHeader";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Contacto",
  description: `Contacta al ${municipalConfig.identidad.nombreCompleto}. Datos de contacto del Palacio Municipal, formulario de mensajes y ubicación geográfica.`,
  path: "/contacto",
});

export default function ContactoPage() {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  const { datos } = municipalConfig;

  return (
    <main className="flex flex-1 flex-col lg:h-[calc(100dvh-5.5rem)] lg:overflow-hidden">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Contacto", path: "/contacto" }]} />
      <PageHeader
        clave="header-contacto"
        compact
        badge={
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-dorado)]">
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            Estamos para servirte
          </span>
        }
        fallbackTitulo="Contacto"
        fallbackDescripcion={`Escríbenos para consultas, sugerencias o trámites con el ${municipalConfig.identidad.nombreCompleto}. Te responderemos a la brevedad.`}
        bg="bg"
      />

      {/* Desktop: el bloque ocupa el alto restante (100dvh - navbar) y se centra en
          vertical, sin scroll (overflow-hidden). En móvil se apila normalmente. */}
      <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-6 sm:px-6 lg:min-h-0">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-8">
          {/* Izquierda: formulario */}
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">
              Envíanos un mensaje
            </h2>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Los campos con asterisco (*) son obligatorios.
            </p>
            <div className="mt-3">
              <ContactoForm accessKey={accessKey} />
            </div>
          </div>

          {/* Derecha: mapa + datos de contacto (barra compacta) */}
          <div className="flex flex-col gap-4">
            <MapaEmbed
              lat={datos.coordenadas.lat}
              lon={datos.coordenadas.lon}
              label={municipalConfig.contacto.direccionCompleta || `Palacio Municipal · ${municipalConfig.contacto.ciudad}`}
              zoom={15}
              aspectClassName="aspect-[16/10] lg:aspect-[16/9]"
            />
            <ContactoInfo />
          </div>
        </div>
      </section>
    </main>
  );
}
