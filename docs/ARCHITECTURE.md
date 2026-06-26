# Arquitectura — plantilla-municipal

Arquitectura de la plantilla sobre la que se construye el portal de Baviácora (y de
cualquier otro municipio). Cuatro piezas: **capa de datos**, **tokens/diseño**,
**structured data (JSON-LD)** y **parametrización por municipio**.

## Visión general
Portal público en **Next.js 16 (App Router)** + **React 19** + **Tailwind CSS 4**. El sitio
es agnóstico de la herramienta de contenido: lee todo a través de una capa de datos tipada
que trae contenido del CMS si hay backend, o cae a fallbacks estáticos si no. Una sola
plantilla sirve a N municipios cambiando `municipalConfig`, los tokens de color y el slug.

```
Backend CMS (Express + Prisma + PostgreSQL/Supabase, multi-tenant por slug)
        │  GET /api/municipios/:slug/<recurso>
        ▼
lib/content/cms.ts      ← ÚNICO punto de conexión (fetch + mappers + tri-state)
        ▼
lib/content/index.ts    ← API pública tipada (getters con fallback + caché 30s)
        ▼
app/**/page.js, components/**   ← consumen SOLO @/lib/content
        ▲
lib/*.js (fallbacks)    ← cabildo, noticias, heroSlides… cuando no hay CMS
```

## 1. Capa de datos (`lib/content/`)
- **`cms.ts`** — único que habla con el backend. `cmsFetch(path)` arma
  `${NEXT_PUBLIC_API_URL}/api/municipios/${NEXT_PUBLIC_MUNICIPIO_SLUG}${path}`, con
  `AbortController` (timeout 8s) e ISR `revalidate: 60`. Devuelve JSON o `null`. Encima,
  fetchers por recurso (`cmsHeroSlides`, `cmsNoticias`, `cmsCabildo`, `cmsDocumentos`,
  `cmsSevac`, `cmsImagenes`, `cmsPortadaHistoria`) que filtran activos, ordenan y **mapean**
  el shape crudo del CMS (`RawCmsItem`) al shape tipado del portal.
- **`index.ts`** — API pública. Getters (`getHeroSlides`, `getNoticias`, `getCabildo`,
  `getDocumentos`, `getSevac`, `getImagenes`, …) que aplican el **fallback** y, en
  noticias/imágenes, una **caché en memoria de 30s**. Las páginas importan SOLO de aquí.
- **`types.ts`** — fuente de verdad de los shapes (`Funcionario`, `Noticia`, `Documento`,
  `ImagenGaleria`, `HeroSlide`, …) y `RawCmsItem = Record<string, any>`.

### Contrato tri-state (clave de la arquitectura)
- `null` → sin API / error / inválido → **fallback estático**.
- `[]` → CMS OK pero vacío → el consumidor decide (ocultar, no exponer hardcode).
- `[...]` → datos del CMS.

Conectar otro CMS = reescribir SOLO `cms.ts` (base URL, slug, rutas y mappers). El resto del
sitio no se entera.

## 2. Tokens / diseño (`app/globals.css`)
Tailwind CSS 4 con **`@theme`**: todos los colores, tipografías y sombras son **tokens**
(`--color-*`, `--font-*`, `--shadow-*`).
- **Color institucional verde/oro.** `--color-guinda*` (verde `#2D4F1B`/`#1F3813`/`#4A7C2E`)
  — el nombre `guinda` es heredado de la plantilla; el color es **verde**. Oro
  `--color-dorado*`. CTA crema `--color-cta-*`.
- Tipografías: `--font-display` (Playfair, títulos), `--font-sans` (Inter, cuerpo),
  serif (Lora), mono.
- Todo color/tipo/espaciado se toma de los tokens; **nunca** valores hard-coded sueltos.
  `municipalConfig.paleta` espeja estos valores (sincronizados).
- A11y de base en `@layer base`: foco visible (`:focus-visible` dorado),
  `prefers-reduced-motion`, contraste AA documentado en comentarios.

## 3. Structured data / JSON-LD (`lib/jsonLd.ts`)
- **`governmentOrganizationLd()`** → `GovernmentOrganization` (nombre, url, logo,
  areaServed, address, `sameAs` de redes). **Omite teléfono y correo** por la política de
  cero contacto directo. Inyectado site-wide en `app/layout.js` vía `<JsonLd>`
  (`components/seo/JsonLd`).
- **`breadcrumbLd(items)`** → `BreadcrumbList` por página, a partir de un trail
  `{name, path}`.
- Todo se alimenta de `municipalConfig` → cambia solo con la config del municipio.

## 4. Parametrización por municipio (`lib/municipalConfig.js`)
Fuente ÚNICA de los datos del municipio: `identidad`, `datos`, `clima`,
`actividadesEconomicas`, `localidades`, `contacto`, `redes`, `enlacesExternos`,
**`paleta`**, `servicios`, `developer`. Principios:
- **Solo datos confirmados**; lo demás `null`/`''` con `<<PENDIENTE>>`. No se inventa.
- Alimenta SEO/metadata, JSON-LD, footer, páginas de gobierno/turismo, etc.
- `servicios.siteUrl` cae a `NEXT_PUBLIC_SITE_URL`. La clave de Web3Forms NO se centraliza
  aquí (la leen los formularios desde `NEXT_PUBLIC_WEB3FORMS_KEY`).

### Clonar la plantilla a otro municipio
1. `lib/municipalConfig.js` — identidad, datos, contacto, redes, enlaces.
2. `app/globals.css` `@theme` + `municipalConfig.paleta` — tokens de color (mantener los
   nombres de variable).
3. `.env` — `NEXT_PUBLIC_MUNICIPIO_SLUG`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`.
4. Fallbacks `lib/*.js` y assets (`public/`, escudo) — mientras el CMS se llena.

## Despliegue
- **Portal**: Vercel (ISR `revalidate: 60`). `NEXT_PUBLIC_*` se hornea en build → cambiar
  vars exige rebuild.
- **Backend**: Render (`cmsmunicipal.onrender.com`), free tier (duerme tras inactividad →
  primer fetch lento; el timeout de 8s puede provocar fallback puntual en ISR).
- **Admin**: `cms-admin` (Next.js, un municipio por sesión).
