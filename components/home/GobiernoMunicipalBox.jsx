import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { municipalConfig } from "@/lib/municipalConfig";

// Recuadro "Gobierno Municipal" (estilo propuesta de Fabiola): encabezado pequeño
// + "Ver más" ARRIBA/fuera de la tarjeta; dentro, foto del presidente a la
// IZQUIERDA (vertical, alto completo) y texto a la DERECHA (cargo → nombre →
// frase → botón). Lado a lado en escritorio; apilado solo en móvil. Datos reales
// del CMS. Sin teléfono/correo (privacidad dura).
export function GobiernoMunicipalBox({ presidente = null }) {
  const tieneFoto =
    presidente?.foto && /^https?:\/\//.test(presidente.foto);

  return (
    <div className="flex flex-col">
      {/* Encabezado fuera de la tarjeta: rótulo + "Ver más" */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-dorado-700)]">
          Gobierno Municipal
        </p>
        <Link
          href="/gobierno/directorio"
          className="text-xs font-semibold text-[var(--color-dorado-700)] underline-offset-4 hover:underline"
        >
          Ver más
        </Link>
      </div>

      {/* Tarjeta: foto izquierda + texto derecha (lado a lado; apila en móvil) */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)] sm:flex-row">
        {tieneFoto && (
          <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-[var(--color-bg)] sm:aspect-auto sm:w-32 sm:self-stretch">
            <Image
              src={presidente.foto}
              alt={presidente.nombre}
              fill
              sizes="(min-width: 640px) 160px, 100vw"
              quality={85}
              className="object-cover object-top"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-1 p-4">
          {presidente ? (
            <>
              <p className="text-xs font-medium capitalize text-[var(--color-dorado-700)]">
                {presidente.cargo.toLowerCase()}
              </p>
              <h3 className="text-lg font-bold capitalize leading-snug text-[var(--color-text)]">
                {presidente.nombre.toLowerCase()}
              </h3>
              <p className="text-[13px] text-[var(--color-text-secondary)]">
                Al servicio de la ciudadanía de{" "}
                {municipalConfig.identidad.nombreCorto}.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold leading-snug text-[var(--color-text)]">
                Conoce a tu gobierno
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Integrantes del Ayuntamiento y sus áreas, al servicio de la
                ciudadanía.
              </p>
            </>
          )}

          <Link
            href="/gobierno/cabildo"
            className="group mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-cta-bg)] px-4 py-2 text-sm font-semibold text-[var(--color-cta-text)] shadow-md transition-all duration-200 hover:scale-105 hover:bg-[var(--color-cta-bg-hover)] hover:shadow-lg"
          >
            Conoce al cabildo
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GobiernoMunicipalBox;
