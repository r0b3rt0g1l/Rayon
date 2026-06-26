import { municipalConfig } from "@/lib/municipalConfig";
import { buildMetadata } from "@/lib/seo";
import { getCabildo, getNoticiasRecientes, getPortadaHistoria, getInformacionImportante, getEstadisticas } from "@/lib/content";
import { HeroSection } from "@/components/home/HeroSection";
import { Estadisticas } from "@/components/home/Estadisticas";
import { AccionesRecientes } from "@/components/home/AccionesRecientes";
import { InformacionImportante } from "@/components/home/InformacionImportante";
import { Historia } from "@/components/home/Historia";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Inicio",
  description: `Portal institucional del ${municipalConfig.identidad.nombreOficial}. Transparencia, gobierno, turismo y servicios al ciudadano. Administración ${municipalConfig.identidad.administracion}.`,
});

export default async function HomePage() {
  // Lecturas en paralelo: noticias + portada de Historia. Ambas degradan
  // elegante a su fallback si el CMS no responde.
  const [noticiasRecientes, portadaUrl, cabildo, infoImportante, estadisticas] =
    await Promise.all([
      getNoticiasRecientes(3),
      getPortadaHistoria(),
      getCabildo(),
      getInformacionImportante(),
      getEstadisticas(),
    ]);
  const presidente =
    cabildo.find((m) => m.tipo === "presidente") ?? cabildo[0] ?? null;

  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <Estadisticas estadisticas={estadisticas} />
      <AccionesRecientes noticias={noticiasRecientes} presidente={presidente} />
      <InformacionImportante documentos={infoImportante} />
      <Historia portadaUrl={portadaUrl} />
    </main>
  );
}
