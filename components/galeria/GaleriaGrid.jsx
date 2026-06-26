"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { CATEGORIAS_IMAGENES } from "@/lib/content";
import { cn } from "@/lib/cn";

export function GaleriaGrid({ imagenes }) {
  const [categoria, setCategoria] = useState("todas");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    if (categoria === "todas") return imagenes;
    return imagenes.filter((img) => img.categoria === categoria);
  }, [imagenes, categoria]);

  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, closeModal]);

  return (
    <div className="flex flex-col gap-8">
      <div
        role="tablist"
        aria-label="Filtrar imágenes por categoría"
        className="flex flex-wrap gap-2"
      >
        {CATEGORIAS_IMAGENES.map((cat) => {
          const active = categoria === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategoria(cat.value)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-[var(--color-guinda)] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300",
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-600">
            No hay imágenes en esta categoría todavía.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((img) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setSelected(img)}
              className="group relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-guinda)] focus-visible:ring-offset-2"
            >
              <Image
                src={img.url}
                alt={img.titulo || "Imagen de la galería"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {img.titulo && (
                  <h3 className="text-sm font-semibold text-white">
                    {img.titulo}
                  </h3>
                )}
                <span className="mt-1 text-xs uppercase tracking-wide text-[var(--color-dorado)]">
                  {img.categoria}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.titulo || "Vista ampliada"}
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={closeModal}
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] max-w-[90vw] flex-col items-center gap-4"
          >
            <div className="relative max-h-[80vh] max-w-[80vw]">
              <Image
                src={selected.url}
                alt={selected.titulo || "Imagen ampliada"}
                width={1600}
                height={1067}
                sizes="80vw"
                className="h-auto max-h-[80vh] w-auto max-w-[80vw] object-contain"
              />
            </div>
            {(selected.titulo || selected.descripcion) && (
              <div className="max-w-2xl text-center text-white">
                {selected.titulo && (
                  <h2 className="text-lg font-semibold">{selected.titulo}</h2>
                )}
                {selected.descripcion && (
                  <p className="mt-1 text-sm text-white/80">
                    {selected.descripcion}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GaleriaGrid;
