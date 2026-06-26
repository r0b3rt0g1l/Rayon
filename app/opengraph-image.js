import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { municipalConfig } from "@/lib/municipalConfig";

const { nombreCompleto, administracion } = municipalConfig.identidad;
const { guinda, guindaProfundo, dorado } = municipalConfig.paleta;

export const runtime = "nodejs";
export const alt = `${nombreCompleto} · Administración ${administracion}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const escudoPath = join(process.cwd(), "public", "escudo-baviacora-hd.png");
  const escudoBuffer = await readFile(escudoPath);
  const escudoDataUrl = `data:image/png;base64,${escudoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${guinda} 0%, ${guindaProfundo} 100%)`,
          color: "#F5F5DC",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 25% 30%, rgba(212,160,23,0.18) 0, transparent 55%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.08) 0, transparent 55%)",
            display: "flex",
          }}
        />

        <img
          src={escudoDataUrl}
          alt=""
          width={220}
          height={220}
          style={{
            objectFit: "contain",
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.35))",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "18px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#F5F5DC",
              textAlign: "center",
              lineHeight: 1.15,
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {nombreCompleto}
          </div>
          <div
            style={{
              fontFamily:
                "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
              fontSize: 24,
              fontWeight: 600,
              // Dorado institucional (municipalConfig.paleta.dorado).
              color: dorado,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Administración {administracion}
          </div>
        </div>

      </div>
    ),
    { ...size },
  );
}
