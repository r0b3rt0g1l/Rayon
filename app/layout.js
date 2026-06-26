import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { inter } from "@/lib/fonts";
import { municipalConfig } from "@/lib/municipalConfig";
import { buildMetadata, defaultViewport } from "@/lib/seo";
import { MainNav } from "@/components/layout/MainNav";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ToastProvider } from "@/components/ui/Toast";
import { TermsModalGate } from "@/components/layout/TermsModalGate";
import { JsonLd } from "@/components/seo/JsonLd";
import { governmentOrganizationLd } from "@/lib/jsonLd";
import "./globals.css";

const { nombreOficial, nombreCompleto, administracion } = municipalConfig.identidad;
const ROOT_TITLE = `${nombreCompleto} | ${administracion}`;
const ROOT_DESCRIPTION = `Sitio oficial del ${nombreOficial}. Administración ${administracion}. Trámites, transparencia, gobierno y servicios para la ciudadanía.`;

const baseMetadata = buildMetadata();

export const metadata = {
  ...baseMetadata,
  title: ROOT_TITLE,
  description: ROOT_DESCRIPTION,
  openGraph: {
    ...baseMetadata.openGraph,
    title: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
  },
  twitter: {
    ...baseMetadata.twitter,
    title: ROOT_TITLE,
    description: ROOT_DESCRIPTION,
  },
};
export const viewport = defaultViewport;

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={inter.variable}
    >
      <body className="min-h-dvh flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <JsonLd data={governmentOrganizationLd()} />
        <a
          href="#contenido-principal"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-md focus-visible:bg-[var(--color-guinda)] focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-white"
        >
          Saltar al contenido principal
        </a>
        <ToastProvider>
          <TermsModalGate />
          <MainNav />
          <div id="contenido-principal" className="flex flex-1 flex-col">
            {children}
          </div>
          <ScrollToTop />
        </ToastProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
