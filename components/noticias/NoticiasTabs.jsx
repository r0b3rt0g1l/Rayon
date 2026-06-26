"use client";

import { useMemo, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import { NoticiasGrid } from "@/components/noticias/NoticiasGrid";
import { cn } from "@/lib/cn";

const TAB_DEFS = [
  {
    value: "noticias",
    label: "Noticias",
    icon: Newspaper,
    basePath: "/acciones-de-gobierno/noticias",
  },
];

export function NoticiasTabs({ noticias = [] }) {
  const [tab, setTab] = useState("noticias");

  const sortedNoticias = useMemo(
    () =>
      [...noticias].sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
      ),
    [noticias],
  );
  return (
    <Tabs.Root value={tab} onValueChange={setTab}>
      <Tabs.List
        aria-label="Tipo de publicación"
        className="relative flex w-full max-w-lg items-center gap-2 rounded-full border border-[var(--color-border)] bg-white p-1 shadow-[var(--shadow-card)]"
      >
        {TAB_DEFS.map(({ value, label, icon: Icon }) => {
          const isActive = tab === value;
          return (
            <Tabs.Trigger
              key={value}
              value={value}
              className={cn(
                "relative z-10 flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold uppercase tracking-wider transition-colors duration-200",
                isActive
                  ? "text-white"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-guinda)]",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="noticias-tabs-pill"
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-full bg-[var(--color-guinda)]"
                  transition={{ type: "spring", duration: 0.5, bounce: 0.18 }}
                />
              )}
              <Icon aria-hidden="true" className="h-4 w-4" />
              <span>{label}</span>
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>

      <div className="mt-10">
        <Tabs.Content value="noticias">
          <NoticiasGrid
            items={sortedNoticias}
            basePath="/acciones-de-gobierno/noticias"
            emptyLabel="Aún no hay noticias publicadas."
          />
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
}

export default NoticiasTabs;
