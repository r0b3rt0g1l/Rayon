"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";
import { municipalConfig } from "@/lib/municipalConfig";

const SITE_URL = municipalConfig.servicios.siteUrl;

function WhatsAppIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M19.05 4.91A10.06 10.06 0 0 0 11.97 2C6.5 2 2.05 6.45 2.05 11.92c0 1.75.46 3.46 1.33 4.96L2 22l5.25-1.38a9.93 9.93 0 0 0 4.72 1.2h.01c5.47 0 9.92-4.45 9.92-9.92 0-2.65-1.04-5.14-2.85-7zM11.97 20.16h-.01a8.24 8.24 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 0 1-1.27-4.39c0-4.55 3.7-8.25 8.27-8.25 2.21 0 4.28.86 5.84 2.42a8.21 8.21 0 0 1 2.42 5.84c0 4.55-3.7 8.25-8.26 8.25zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.13-.55.13-.16.25-.64.81-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.38-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42-.14-.01-.31-.01-.47-.01-.16 0-.43.06-.65.31-.23.25-.85.83-.85 2.03s.87 2.36 1 2.52c.13.16 1.72 2.62 4.16 3.67.58.25 1.04.4 1.39.51.58.18 1.12.16 1.54.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29z" />
    </svg>
  );
}

function buildShareTargets(url, text) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text);
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    x: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
    whatsapp: `https://api.whatsapp.com/send?text=${t}%20${u}`,
  };
}

export function ShareButtons({ slug, basePath, title }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}${basePath}/${slug}`;
  const text = `${title} · ${municipalConfig.identidad.nombreCompleto}`;
  const targets = buildShareTargets(url, text);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* noop */
    }
  };

  const items = [
    {
      key: "facebook",
      label: "Facebook",
      Icon: Facebook,
      href: targets.facebook,
      tone: "bg-[#1877F2] text-white",
    },
    {
      key: "x",
      label: "X (Twitter)",
      Icon: Twitter,
      href: targets.x,
      tone: "bg-[#0F1419] text-white",
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      Icon: WhatsAppIcon,
      href: targets.whatsapp,
      tone: "bg-[#25D366] text-white",
    },
  ];

  return (
    <aside
      aria-label="Compartir esta publicación"
      className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
        Compartir
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map(({ key, label, Icon, href, tone }) => (
          <li key={key}>
            <motion.a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Compartir en ${label}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full shadow-sm transition ${tone}`}
            >
              <Icon className="h-4 w-4" />
            </motion.a>
          </li>
        ))}
        <li>
          <motion.button
            type="button"
            onClick={onCopy}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Copiar enlace al portapapeles"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-4 text-sm font-medium text-[var(--color-text)] transition hover:border-[var(--color-guinda)] hover:text-[var(--color-guinda)]"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                Enlace copiado
              </>
            ) : (
              <>
                <LinkIcon className="h-4 w-4" aria-hidden="true" />
                Copiar enlace
              </>
            )}
          </motion.button>
        </li>
      </ul>
    </aside>
  );
}

export default ShareButtons;
