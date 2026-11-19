/**
 * The calculator's form state and its round trip through the query string,
 * so every plan has a link. Keys are short and in Spanish because they show
 * in the address bar: meta, de, a, u, desde, hasta, dps, llevo (and `dias`
 * on links from the bank, meaning "starts today, lasts this many days").
 */

import { esFechaValida, sumarDias, type FechaISO } from "./fechas";
import { leerNumero, numeroParaCampo } from "./formato";
import { MAX_DIAS, limitarDiasPorSemana, validarPlan, type EntradaPlan, type ErrorPlan } from "./ritmo";

export const MAX_NOMBRE = 80;
export const MAX_UNIDAD = 24;

/** Everything is kept as the text the visitor typed. */
export type EstadoForm = {
  meta: string;
  de: string;
  a: string;
  u: string;
  desde: string;
  hasta: string;
  dps: string;
  llevo: string;
};

export type Predeterminados = {
  meta: string;
  de: number;
  a: number;
  u: string;
  dias: number;
  dps: number;
};

type Lector = { get(clave: string): string | null; has(clave: string): boolean };

const CLAVES = ["meta", "de", "a", "u", "desde", "hasta", "dps", "llevo", "dias"] as const;

export function estadoInicial(query: Lector | null, hoy: FechaISO, pre: Predeterminados): EstadoForm {
  const tieneQuery = query !== null && CLAVES.some((k) => query.has(k));
  const q = (k: string) => (tieneQuery ? (query!.get(k) ?? "").trim() : "");

  const numero = (clave: string, porDefecto: number) => {
    const n = leerNumero(q(clave));
    return numeroParaCampo(Number.isFinite(n) ? n : porDefecto);
  };

  let dias = pre.dias;
  const diasQuery = Number.parseInt(q("dias"), 10);
  if (Number.isInteger(diasQuery) && diasQuery >= 1 && diasQuery <= MAX_DIAS) dias = diasQuery;

  const desde = esFechaValida(q("desde")) ? q("desde") : hoy;
  const hasta = esFechaValida(q("hasta")) ? q("hasta") : sumarDias(desde, dias - 1);

  const dpsQuery = Number.parseInt(q("dps"), 10);
  const dps = limitarDiasPorSemana(Number.isInteger(dpsQuery) ? dpsQuery : pre.dps);

  const llevoNumero = leerNumero(q("llevo"));

  return {
    meta: (tieneQuery ? q("meta") : pre.meta).slice(0, MAX_NOMBRE),
    de: numero("de", pre.de),
    a: numero("a", pre.a),
    u: (tieneQuery ? q("u") : pre.u).slice(0, MAX_UNIDAD),
    desde,
    hasta,
    dps: String(dps),
    llevo: Number.isFinite(llevoNumero) ? numeroParaCampo(llevoNumero) : "",
  };
}

export function estadoAQuery(estado: EstadoForm): string {
  const p = new URLSearchParams();
  if (estado.meta.trim()) p.set("meta", estado.meta.trim());
  p.set("de", estado.de.trim());
  p.set("a", estado.a.trim());
  if (estado.u.trim()) p.set("u", estado.u.trim());
  p.set("desde", estado.desde);
  p.set("hasta", estado.hasta);
  if (estado.dps !== "7") p.set("dps", estado.dps);
  if (estado.llevo.trim()) p.set("llevo", estado.llevo.trim());
  return p.toString();
}

export type Interpretado = {
  entrada: EntradaPlan;
  /** The current value; equals the start when "Hoy llevo" is empty. */
  actual: number;
  errores: (ErrorPlan | { campo: "llevo"; mensaje: string })[];
};

export function interpretar(estado: EstadoForm): Interpretado {
  const entrada: EntradaPlan = {
    inicio: leerNumero(estado.de),
    objetivo: leerNumero(estado.a),
    desde: estado.desde,
    hasta: estado.hasta,
    diasPorSemana: limitarDiasPorSemana(Number.parseInt(estado.dps, 10)),
  };
  const errores: Interpretado["errores"] = validarPlan(entrada);

  let actual = entrada.inicio;
  if (estado.llevo.trim() !== "") {
    actual = leerNumero(estado.llevo);
    if (!Number.isFinite(actual)) errores.push({ campo: "llevo", mensaje: "Escribe un número, o deja el campo vacío." });
  }
  return { entrada, actual, errores };
}

/** Link from the bank: the plan starts the day it is opened. */
export function enlaceCalculadora(opciones: {
  meta: string;
  a: number;
  u: string;
  dias: number;
  de?: number;
  ruta?: string;
}): string {
  const p = new URLSearchParams();
  p.set("meta", opciones.meta.slice(0, MAX_NOMBRE));
  p.set("de", numeroParaCampo(opciones.de ?? 0));
  p.set("a", numeroParaCampo(opciones.a));
  p.set("u", opciones.u);
  p.set("dias", String(opciones.dias));
  return `${opciones.ruta ?? "/calculadora"}?${p.toString()}`;
}
