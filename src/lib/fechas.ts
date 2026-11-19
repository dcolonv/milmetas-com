/**
 * Calendar dates as "YYYY-MM-DD" strings. All arithmetic goes through UTC day
 * numbers, so daylight-saving changes never add or drop a day.
 */

export type FechaISO = string;

const MS_DIA = 86_400_000;
const FORMATO = /^(\d{4})-(\d{2})-(\d{2})$/;

const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

function partes(fecha: string): [number, number, number] | null {
  const m = FORMATO.exec(fecha);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

/** Day number since 1970-01-01, or NaN when the string is not a real date. */
export function aDias(fecha: string): number {
  const p = partes(fecha);
  if (!p) return NaN;
  const [y, mo, d] = p;
  const ms = Date.UTC(y, mo - 1, d);
  const back = new Date(ms);
  // Date.UTC rolls 2027-02-30 over to March; reject anything that does not round-trip.
  if (back.getUTCFullYear() !== y || back.getUTCMonth() !== mo - 1 || back.getUTCDate() !== d) {
    return NaN;
  }
  return Math.round(ms / MS_DIA);
}

export function deDias(dias: number): FechaISO {
  return new Date(dias * MS_DIA).toISOString().slice(0, 10);
}

export function esFechaValida(fecha: string): boolean {
  return Number.isFinite(aDias(fecha));
}

/** Days from `desde` to `hasta`; negative when `hasta` is earlier. */
export function diasEntre(desde: FechaISO, hasta: FechaISO): number {
  return aDias(hasta) - aDias(desde);
}

export function sumarDias(fecha: FechaISO, dias: number): FechaISO {
  return deDias(aDias(fecha) + dias);
}

/** Today's date in the visitor's own time zone. */
export function hoyLocal(ahora: Date = new Date()): FechaISO {
  const y = ahora.getFullYear();
  const m = String(ahora.getMonth() + 1).padStart(2, "0");
  const d = String(ahora.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function finDeAnio(fecha: FechaISO): FechaISO {
  return `${fecha.slice(0, 4)}-12-31`;
}

/** "2 de abril de 2027". Written by hand so server and browser always agree. */
export function formatearFecha(fecha: FechaISO): string {
  const p = partes(fecha);
  if (!p || !esFechaValida(fecha)) return fecha;
  const [y, mo, d] = p;
  return `${d} de ${MESES[mo - 1]} de ${y}`;
}

/** "2 abr 2027" for tables and tight spaces. */
export function formatearFechaCorta(fecha: FechaISO): string {
  const p = partes(fecha);
  if (!p || !esFechaValida(fecha)) return fecha;
  const [y, mo, d] = p;
  return `${d} ${MESES[mo - 1].slice(0, 3)} ${y}`;
}
