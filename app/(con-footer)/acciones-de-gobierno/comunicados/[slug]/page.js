import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { comunicados, getNoticiaPorSlug, getNoticiasRelacionadas } from "@/lib/content";
import { NoticiaHero } from "@/components/noticias/NoticiaHero";
import { NoticiaContent } from "@/components/noticias/NoticiaContent";
import { ShareButtons } from "@/components/noticias/ShareButtons";
import { MasNoticias } from "@/components/noticias/MasNoticias";

export const revalidate = 60;

export async function generateStaticParams() {
  return comunicados.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getNoticiaPorSlug(slug);
  if (!item) return buildMetadata({ title: "Comunicado no encontrado", noIndex: true });

  return buildMetadata({
    title: item.titulo,
    description: item.extracto,
    path: `/acciones-de-gobierno/comunicados/${item.slug}`,
    image: item.imagen,
  });
}

export default async function ComunicadoPage({ params }) {
  const { slug } = await params;
  const item = await getNoticiaPorSlug(slug);

  if (!item) notFound();

  const relacionadas = await getNoticiasRelacionadas(slug, 3);

  return (
    <article className="flex flex-1 flex-col">
      <NoticiaHero item={item} kind="comunicado" backHref="/acciones-de-gobierno" />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[minmax(0,1fr)_280px]">
        <NoticiaContent content={item.contenido} />
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <ShareButtons
            slug={item.slug}
            basePath="/acciones-de-gobierno/comunicados"
            title={item.titulo}
          />
        </aside>
      </div>

      <MasNoticias items={relacionadas} basePath="/acciones-de-gobierno/noticias" />
    </article>
  );
}
