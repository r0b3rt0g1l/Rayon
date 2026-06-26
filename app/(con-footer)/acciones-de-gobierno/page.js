import { Breadcrumbs } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { municipalConfig } from "@/lib/municipalConfig";
import { getNoticias } from "@/lib/content";
import { NoticiasTabs } from "@/components/noticias/NoticiasTabs";
import { BannerHero } from "@/components/common/BannerHero";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Acciones de Gobierno",
  description: `Últimas noticias y comunicados oficiales del ${municipalConfig.identidad.nombreCompleto}. Mantente al día con las acciones, obras y avisos de la Administración ${municipalConfig.identidad.administracion}.`,
  path: "/acciones-de-gobierno",
});

export default async function AccionesDeGobiernoPage() {
  const noticias = await getNoticias();

  return (
    <main className="flex flex-1 flex-col">
      <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Acciones de Gobierno", path: "/acciones-de-gobierno" }]} />
      <BannerHero
        clave="banner-acciones"
        heading="h1"
        fallback={{
          clave: "banner-acciones",
          titulo: "Acciones de Gobierno",
          descripcion: `Noticias y comunicados oficiales de la Administración ${municipalConfig.identidad.administracion} del ${municipalConfig.identidad.nombreCompleto}.`,
          imagenUrl: null,
          activo: true,
        }}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-14">
        <NoticiasTabs noticias={noticias} />
      </section>
    </main>
  );
}
