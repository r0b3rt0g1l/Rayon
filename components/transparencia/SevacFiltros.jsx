"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const TRIMESTRES = ["1", "2", "3", "4"];

export function SevacFiltros({ anioActivo, trimestreActivo }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentYear = new Date().getFullYear();
  const anios = [
    currentYear,
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
    currentYear - 4,
  ];

  function updateFilter(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  }

  function limpiar() {
    router.push(pathname, { scroll: false });
  }

  const hayFiltros = Boolean(anioActivo || trimestreActivo);
  const anioValue = anioActivo != null ? String(anioActivo) : "";
  const trimestreValue = trimestreActivo != null ? String(trimestreActivo) : "";

  return (
    <div className="flex flex-wrap items-end gap-3 sm:gap-4">
      <label className="flex flex-col gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
        Año
        <select
          value={anioValue}
          onChange={(e) => updateFilter("anio", e.target.value)}
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm font-normal tracking-normal text-[var(--color-text)] transition focus:border-[var(--color-guinda)] focus:outline-none focus:ring-2 focus:ring-[var(--color-dorado)]/30"
        >
          <option value="">Todos</option>
          {anios.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
        Trimestre
        <select
          value={trimestreValue}
          onChange={(e) => updateFilter("trimestre", e.target.value)}
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm font-normal tracking-normal text-[var(--color-text)] transition focus:border-[var(--color-guinda)] focus:outline-none focus:ring-2 focus:ring-[var(--color-dorado)]/30"
        >
          <option value="">Todos</option>
          {TRIMESTRES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      {hayFiltros && (
        <button
          type="button"
          onClick={limpiar}
          className="inline-flex h-[38px] items-center gap-1.5 self-end rounded-lg border border-[var(--color-border)] bg-white px-3 text-sm font-medium text-[var(--color-text-secondary)] transition hover:border-[var(--color-guinda)]/40 hover:text-[var(--color-guinda)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-dorado)] focus-visible:ring-offset-1"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}

export default SevacFiltros;
