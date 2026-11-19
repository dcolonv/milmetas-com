/** Reading and writing numbers the way Spanish speakers type them. */

const MILES_CON_PUNTO = /^-?\d{1,3}(\.\d{3})+$/;

/**
 * Parses "1.234,5", "1234,5", "1234.5", "3.000" and "-12".
 * Returns NaN for anything that is not a number.
 */
export function leerNumero(texto: string): number {
  const t = texto.trim().replace(/\s/g, "");
  if (t === "" || !/^-?[\d.,]+$/.test(t)) return NaN;

  let normal: string;
  if (t.includes(",") && t.includes(".")) {
    // Both present: the last one is the decimal mark.
    normal =
      t.lastIndexOf(",") > t.lastIndexOf(".")
        ? t.replace(/\./g, "").replace(",", ".")
        : t.replace(/,/g, "");
  } else if (t.includes(",")) {
    if ((t.match(/,/g) ?? []).length > 1) return NaN;
    normal = t.replace(",", ".");
  } else if (MILES_CON_PUNTO.test(t)) {
    // "3.000" is three thousand in Spanish.
    normal = t.replace(/\./g, "");
  } else {
    normal = t;
  }

  if (!/^-?\d*\.?\d+$/.test(normal) && !/^-?\d+\.$/.test(normal)) return NaN;
  const n = Number(normal);
  return Number.isFinite(n) ? n : NaN;
}

function grupos(entero: string): string {
  // Spanish style: no separator for four digits (3000), a point from five (12.000).
  if (entero.length <= 4) return entero;
  return entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Decimal comma, at most two decimals for everyday figures and up to four
 * for values under 1, so a pace of 0.0329 does not show as 0,03.
 * Written by hand (no Intl) so the server and every browser print the same text.
 */
export function formatearNumero(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  let decimales = 2;
  if (abs > 0 && abs < 0.1) decimales = 4;
  else if (abs < 1) decimales = 3;

  const fijo = abs.toFixed(decimales);
  const [entero, fraccion = ""] = fijo.split(".");
  const fraccionLimpia = fraccion.replace(/0+$/, "");
  const cuerpo = fraccionLimpia ? `${grupos(entero)},${fraccionLimpia}` : grupos(entero);
  const esCero = Number(fijo) === 0;
  return n < 0 && !esCero ? `-${cuerpo}` : cuerpo;
}

/** A number in the form a text input should show it: plain digits, decimal comma. */
export function numeroParaCampo(n: number): string {
  if (!Number.isFinite(n)) return "";
  return String(n).replace(".", ",");
}

export function formatearPorcentaje(fraccion: number): string {
  if (!Number.isFinite(fraccion)) return "—";
  return `${formatearNumero(Math.round(fraccion * 1000) / 10)} %`;
}

/** "3 libros", "1 libro" is not attempted: the unit is whatever the visitor typed. */
export function conUnidad(n: number, unidad: string): string {
  const u = unidad.trim();
  return u ? `${formatearNumero(n)} ${u}` : formatearNumero(n);
}

export function plural(n: number, uno: string, varios: string): string {
  return Math.abs(n) === 1 ? uno : varios;
}
