# Municipio de Baviácora, Sonora

Sitio oficial del **H. Ayuntamiento de Baviácora, Sonora**. Administración 2024-2027.
Construido sobre `plantilla-municipal` (Next.js App Router, React 19, Tailwind CSS 4).

## 🚀 Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## 🔧 Variables de entorno

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_MUNICIPIO_SLUG=baviacora` — slug para los endpoints del CMS.
- `NEXT_PUBLIC_SITE_URL` — URL canónica (sitemap, robots, SEO).
- `NEXT_PUBLIC_API_URL` — backend CMS (opcional; vacío = solo fallbacks estáticos).
- `WEB3FORMS_ACCESS_KEY` / `NEXT_PUBLIC_WEB3FORMS_KEY` — endpoint de formularios.

## 📌 Estado de los datos

- **Confirmado:** identidad, contacto, redes (Facebook), cabildo + gabinete
  (8 integrantes), paleta verde/oro institucional, escudo HD.
- **Pendiente (no inventar):** lema, fundación, superficie/altitud/densidad/IDH,
  horarios, regidores 4-6 (el sitio oficial publica solo 3), correos/fotos
  individuales, hitos históricos, atractivos turísticos, noticias (entran por CMS).

Recuperación de la base anterior (Arivechi): rama `respaldo-base-arivechi-20260609`.

## 📚 Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · react-aria-components ·
@radix-ui · framer-motion · embla-carousel · next-cloudinary + sharp.
