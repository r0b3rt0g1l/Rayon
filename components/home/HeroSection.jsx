import { getHeroSlides } from "@/lib/content";
import { heroSlides as fallbackSlides } from "@/components/home/heroSlides";
import { HeroCarousel } from "@/components/home/HeroCarousel";

export async function HeroSection() {
  const cmsSlides = await getHeroSlides();
  // null  → CMS no respondió (sin baseUrl, error de red, JSON inválido):
  //         usamos los slides locales del template como red de seguridad.
  // []    → CMS respondió OK pero sin slides activos: no mostrar nada
  //         (evita exponer accidentalmente slides hardcoded del template).
  // [...] → slides activos del CMS.
  if (cmsSlides === null) {
    return <HeroCarousel slides={fallbackSlides} />;
  }
  if (cmsSlides.length === 0) {
    return null;
  }
  return <HeroCarousel slides={cmsSlides} />;
}

export default HeroSection;
