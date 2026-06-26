import { format, formatDistanceToNow, parseISO } from "date-fns";
import { es } from "date-fns/locale";

function toDate(value) {
  if (value instanceof Date) return value;
  if (typeof value === "string") return parseISO(value);
  return new Date(value);
}

export function formatFechaLarga(value) {
  return format(toDate(value), "d 'de' MMMM 'de' yyyy", { locale: es });
}

export function formatFechaCorta(value) {
  return format(toDate(value), "d MMM yyyy", { locale: es });
}

export function formatFechaIso(value) {
  return format(toDate(value), "yyyy-MM-dd");
}

export function tiempoRelativo(value) {
  return formatDistanceToNow(toDate(value), { locale: es, addSuffix: true });
}

export function tiempoLectura(content = "", wpm = 220) {
  const palabras = String(content).trim().split(/\s+/).filter(Boolean).length;
  const minutos = Math.max(1, Math.round(palabras / wpm));
  return `${minutos} min de lectura`;
}
