import { Footer } from "@/components/layout/Footer";

// Layout para TODAS las páginas excepto el home. Renderiza el footer global
// server-side (estático-seguro, sin usePathname). El home vive en app/page.js
// (raíz, sin este layout) y trae su propio footer fusionado dentro de la imagen
// de Historia, así que aquí no aplica. Los route groups no cambian las URLs.
export default function ConFooterLayout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
