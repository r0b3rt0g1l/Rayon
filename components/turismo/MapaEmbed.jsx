import { MapPin, ExternalLink } from "lucide-react";

// `aspectClassName` permite override del ratio (p. ej. banner ancho en Contacto).
// Default conserva el 16/10 usado en Turismo, así que esos consumidores no cambian.
export function MapaEmbed({ lat, lon, label, zoom = 14, aspectClassName = "aspect-[16/10]" }) {
  if (lat == null || lon == null) return null;
  const src = `https://www.google.com/maps?q=${lat},${lon}&z=${zoom}&hl=es&output=embed`;
  const externalUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

  return (
    <figure className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]">
      <div className={`${aspectClassName} w-full overflow-hidden`}>
        <iframe
          title={`Mapa de ubicación: ${label}`}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-3 text-sm">
        <span className="inline-flex items-center gap-2 text-[var(--color-text-secondary)]">
          <MapPin aria-hidden="true" className="h-4 w-4 text-[var(--color-guinda)]" />
          {label}
        </span>
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-guinda)] hover:underline"
        >
          Abrir en Google Maps
          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      </figcaption>
    </figure>
  );
}

export default MapaEmbed;
