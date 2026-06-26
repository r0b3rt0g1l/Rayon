# CLAUDE.md — Portal Municipal de Baviácora

Memoria de trabajo para Claude Code: contexto, reglas duras y estado actual del
proyecto. Léelo antes de tocar el repo.

## Qué es
Sitio oficial del **H. Ayuntamiento de Baviácora, Sonora** (administración 2024-2027):
portal institucional público con gobierno, transparencia, turismo, noticias y servicios
al ciudadano. Construido sobre `plantilla-municipal`, una plantilla reutilizable que se
parametriza por municipio (`lib/municipalConfig.js`). Desarrollado por Northa Digital.

## Stack
- **Next.js 16** (App Router) · **React 19** · **Tailwind CSS 4** (tokens en `@theme`,
  `app/globals.css`).
- UI: `react-aria-components`, `@radix-ui/*`, `framer-motion`, `embla-carousel`,
  `lucide-react`. Imágenes: `next-cloudinary` + `sharp`.
- **Capa de datos tipada en TypeScript**: `lib/content/` (`cms.ts`, `index.ts`,
  `types.ts`). El resto es `.js`/`.jsx`; **los módulos nuevos van en TypeScript**.
- Scripts: `npm run dev | build | start | lint | typecheck` (`tsc --noEmit`).

## Conexión al CMS — punto ÚNICO
Todo el contenido dinámico entra por **`lib/content/`**. El único archivo que habla con
el backend es **`lib/content/cms.ts`**:
- Lee `NEXT_PUBLIC_API_URL` (base) y `NEXT_PUBLIC_MUNICIPIO_SLUG` (slug).
- Arma `${API_URL}/api/municipios/${SLUG}/<recurso>` (recursos: `hero`, `noticias`,
  `imagenes`, `documentos`, `sevac`, `funcionarios`, `portada-historia`).
- `fetch` con timeout 8s (`AbortController`) e ISR `next: { revalidate: 60 }`.
- Las páginas consumen SOLO `@/lib/content` (index.ts), nunca `cms.ts` directo.
- ⚠️ `NEXT_PUBLIC_*` se **hornea en build time**: cambiar las vars en Vercel exige un
  **rebuild**, no basta redeploy del artefacto viejo.

### Patrón de fallback estático (tri-state)
Cada getter devuelve:
- **`null`** → sin API / error de red / respuesta inválida → cae al **fallback estático**
  del repo (`lib/*.js`: `cabildo.js`, `noticias.js`, `heroSlides`, …).
- **`[]`** → CMS OK pero sin items activos → el consumidor decide (p. ej. el hero NO
  muestra nada, para no exponer slides hardcoded de la plantilla).
- **`[...]`** → datos reales del CMS.

Ej.: `components/home/HeroSection.jsx` — `null` usa `heroSlides` local; `[]` no renderiza;
datos → carrusel del CMS.

## Regla de privacidad DURA — cero contacto directo
- **Prohibido exponer contacto directo**: nada de `mailto:` ni `tel:` en el código fuente
  ni en el build/dist. Las únicas menciones en `src` son comentarios que explican la
  política (`components/gobierno/PresidenteCard.jsx`, `RegidorCard.jsx`).
- Todo contacto va por **formulario/modal** (Web3Forms): `app/contacto/` y
  `app/transparencia/informacion-publica/`.
- `municipalConfig.contacto` guarda teléfono/correo institucionales como **dato**, pero la
  UI NO los renderiza como enlaces de contacto.
- El **JSON-LD** (`lib/jsonLd.ts → governmentOrganizationLd`) omite teléfono y correo a
  propósito.
- Nunca pongas datos personales (teléfonos/correos particulares) en el contenido.

## Parametrización por municipio
`lib/municipalConfig.js` es la fuente única de identidad y datos: `identidad`, `datos`,
`contacto`, `redes`, `enlacesExternos`, **`paleta`**, `servicios`. Regla de oro: **solo
datos CONFIRMADOS**; lo no confirmado se queda en `null`/`''` con marca `<<PENDIENTE>>` —
**no se inventa**. Clonar a otro municipio = cambiar este archivo + tokens + slug.

## Color institucional (fix guinda/verde)
La paleta de Baviácora es **verde/oro**, NO guinda/vino. Los nombres `--color-guinda*` se
**heredan de la plantilla**; el valor real es verde:
- `--color-guinda: #2D4F1B` (verde profundo), `-deep: #1F3813`, `-soft: #4A7C2E`; oro
  `--color-dorado: #E5B53D`.
- Definida en `app/globals.css` (`@theme`) y espejada en `municipalConfig.paleta`; ambos
  llevan el comentario aclaratorio de que `guinda` es solo el nombre de variable heredado.
- Al documentar o nombrar colores: di **verde institucional** y aclara que `guinda` es el
  nombre de la variable.

## Convenciones
- **TypeScript** para módulos nuevos (sin `any` salvo `RawCmsItem`).
- **Accesibilidad WCAG 2.1 AA**: labels, foco visible, contraste, `prefers-reduced-motion`,
  `alt` (`react-aria-components`).
- **Rendimiento**: Lighthouse ≥ 95; LCP del hero cuidado; `next/image` calidades `[75,85,90]`.
- **SEO**: `GovernmentOrganization` site-wide en `app/layout.js`; `BreadcrumbList` por página.
- Diseño: color/tipografía/espaciado SOLO desde tokens `@theme`, nunca valores sueltos.

## Estado actual (jun 2026)
- ✅ **Conectado al CMS de producción** (`cmsmunicipal.onrender.com`): municipio dado de
  alta, `NEXT_PUBLIC_API_URL` + `NEXT_PUBLIC_MUNICIPIO_SLUG` configuradas en Vercel,
  **pipeline verificado de punta a punta** (el contenido cargado en el admin aparece en el
  portal).
- ✅ Identidad, contacto, redes (Facebook), cabildo + gabinete (8), paleta verde/oro,
  escudo HD, capa `lib/content`, JSON-LD, privacidad y a11y/lint a código-100.
- ⏳ **Pendientes externos** (no de código): fotos reales del municipio; dominio
  **baviacora.gob.mx** (hoy apunta a un WordPress viejo, falta migrar el DNS al portal);
  **Web3Forms** (clave de formularios — se hace al final).
- ⏳ Datos `<<PENDIENTE>>` en `municipalConfig`: lema, fundación, métricas
  (superficie/altitud/IDH), horarios — entran cuando se confirmen.

## Backend / admin (repos hermanos)
- **Backend CMS**: Express + Prisma + PostgreSQL (Supabase), **multi-tenant por slug**,
  endpoints `/api/municipios/:slug/<recurso>`. Hospedado en Render.
- **Admin**: `cms-admin` (Next.js), un municipio por sesión; el personal del ayuntamiento
  carga ahí el contenido.
- ⚠️ Render free duerme tras inactividad: el primer fetch tras dormir puede acercarse al
  timeout de 8s (riesgo de fallback puntual en ISR).
