import { getNoticiasRecientes } from "@/lib/noticias";
import { getNoticiaImageByCategoria } from "@/lib/unsplashImages";
import { getStockImage } from "@/lib/stockImage";

// TODO_MUNICIPIO: banner_destacado — banner principal del home (opcional).
// Para destacar un evento o comunicado, agregar el objeto correspondiente antes
// del spread de noticiasDestacadas, siguiendo la forma:
//   {
//     id, tipo: "comunicado", titulo, resumen, imagen, imagenAlt, link, fecha,
//   }

function pickImage({ id, categoria }) {
  const img = categoria
    ? getNoticiaImageByCategoria(categoria)
    : null;
  return {
    src: img?.src ?? getStockImage(id, 1280, 720),
    alt: img?.alt ?? "",
  };
}

const noticiasDestacadas = getNoticiasRecientes(4)
  .slice(0, 3)
  .map((n) => {
    const img = pickImage({ id: n.slug, categoria: n.categoria });
    return {
      id: n.slug,
      tipo: "noticia",
      titulo: n.titulo,
      resumen: n.extracto,
      imagen: img.src,
      imagenAlt: img.alt,
      link: `/acciones-de-gobierno/noticias/${n.slug}`,
      fecha: n.fecha,
    };
  });

export const bannersUnificados = [...noticiasDestacadas];
