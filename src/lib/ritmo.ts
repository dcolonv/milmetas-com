/**
 * The maths of the Calculadora de metas. Pure functions, no React, no clock:
 * "today" is always passed in. The formulas are the ones published in
 * docs/SPEC.md section 3 and on the calculator page.
 */

import { aDias, diasEntre, esFechaValida, sumarDias, type FechaISO } from "./fechas";

/** Average month length in days: 365.25 / 12. */
export const DIAS_MES = 30.4375;
/** A plan cannot be longer than about a hundred years. */
export const MAX_DIAS = 36_500;
/** Largest absolute value accepted for the start and the target. */
export const MAX_VALOR = 1e12;
/** Share of the total that counts as slack before a plan is called late or early. */
export const TOLERANCIA = 0.05;

const EPS = 1e-9;

export type EntradaPlan = {
  /** Where the visitor starts ("Empiezo en"). */
  inicio: number;
  /** Where they want to get to ("Quiero llegar a"). */
  objetivo: number;
  desde: FechaISO;
  hasta: FechaISO;
  /** Days a week they will work on it, 1 to 7. */
  diasPorSemana: number;
};

export type CampoPlan = "inicio" | "objetivo" | "desde" | "hasta";
export type ErrorPlan = { campo: CampoPlan; mensaje: string };

export type Hito = { fraccion: number; dia: number; fecha: FechaISO; valor: number };

export type Plan = {
  /** D: days in the plan, counting both the start day and the deadline. */
  dias: number;
  /** T: total distance between start and target, always positive. */
  total: number;
  /** +1 when the number has to grow, -1 when it has to shrink (a debt). */
  sentido: 1 | -1;
  porDia: number;
  porSemana: number;
  porMes: number;
  porSesion: number;
  diasPorSemana: number;
  /** "One every N days" when the daily pace is below 1; otherwise null. */
  cadaNDias: number | null;
  hitos: Hito[];
};

export type Veredicto = "cumplida" | "sin-empezar" | "vencida" | "adelantado" | "a-tiempo" | "atrasado";

export type Avance = {
  /** E: days elapsed at the end of today, between 0 and D. */
  transcurridos: number;
  /** What the value should read at the end of today. */
  esperadoValor: number;
  /** How much of the total should be done at the end of today. */
  esperadoHecho: number;
  /** H: how much has been done, in the direction of the goal. Can be negative. */
  hecho: number;
  /** H / T, not clamped. */
  fraccion: number;
  /** Δ: done minus expected. Positive means ahead. */
  diferencia: number;
  /** Δ expressed in days of pace. */
  diferenciaDias: number;
  tolerancia: number;
  veredicto: Veredicto;
  /** R: what is left, never negative. */
  restante: number;
  /** L: days left after today. */
  diasRestantes: number;
  /** R / L. Null when there are no days left after today. */
  ritmoNuevoDia: number | null;
  /** H / E, the average pace so far. Null before the first day or with no progress. */
  ritmoActualDia: number | null;
  /** The date the goal is reached at the average pace so far. */
  proyeccion: FechaISO | null;
};

export function limitarDiasPorSemana(n: number): number {
  if (!Number.isFinite(n)) return 7;
  return Math.min(7, Math.max(1, Math.round(n)));
}

/** Why a value cannot be used, or null when it can. */
export function mensajeNumero(n: number): string | null {
  if (!Number.isFinite(n)) return "Escribe un número.";
  if (Math.abs(n) > MAX_VALOR) return "Ese número es demasiado grande. El máximo es un billón.";
  return null;
}

export function validarPlan(e: EntradaPlan): ErrorPlan[] {
  const errores: ErrorPlan[] = [];
  const numeroOk = (n: number) => mensajeNumero(n) === null;

  const errorInicio = mensajeNumero(e.inicio);
  const errorObjetivo = mensajeNumero(e.objetivo);
  if (errorInicio) errores.push({ campo: "inicio", mensaje: errorInicio });
  if (errorObjetivo) {
    errores.push({ campo: "objetivo", mensaje: errorObjetivo });
  } else if (numeroOk(e.inicio) && e.objetivo === e.inicio) {
    errores.push({
      campo: "objetivo",
      mensaje: "El valor al que quieres llegar tiene que ser distinto del valor inicial.",
    });
  }

  const desdeOk = esFechaValida(e.desde);
  const hastaOk = esFechaValida(e.hasta);
  if (!desdeOk) errores.push({ campo: "desde", mensaje: "Elige una fecha de inicio." });
  if (!hastaOk) {
    errores.push({ campo: "hasta", mensaje: "Elige una fecha límite." });
  } else if (desdeOk) {
    const span = diasEntre(e.desde, e.hasta);
    if (span < 0) {
      errores.push({ campo: "hasta", mensaje: "La fecha límite no puede ser anterior a la de inicio." });
    } else if (span + 1 > MAX_DIAS) {
      errores.push({ campo: "hasta", mensaje: "El plazo máximo es de 100 años." });
    }
  }
  return errores;
}

/** Call only with input that passed `validarPlan`. */
export function calcularPlan(e: EntradaPlan): Plan {
  const dias = diasEntre(e.desde, e.hasta) + 1;
  const total = Math.abs(e.objetivo - e.inicio);
  const sentido: 1 | -1 = e.objetivo >= e.inicio ? 1 : -1;
  const diasPorSemana = limitarDiasPorSemana(e.diasPorSemana);

  const porDia = total / dias;
  const porSemana = Math.min(porDia * 7, total);
  const porMes = Math.min(porDia * DIAS_MES, total);
  const porSesion = porSemana / diasPorSemana;

  const hitos: Hito[] = [0.25, 0.5, 0.75, 1].map((fraccion) => {
    const dia = Math.max(1, Math.ceil(fraccion * dias - EPS));
    return {
      fraccion,
      dia,
      fecha: sumarDias(e.desde, dia - 1),
      valor: e.inicio + sentido * fraccion * total,
    };
  });

  return {
    dias,
    total,
    sentido,
    porDia,
    porSemana,
    porMes,
    porSesion,
    diasPorSemana,
    cadaNDias: porDia < 1 ? dias / total : null,
    hitos,
  };
}

/**
 * Where the visitor stands on `hoy` with a current value of `actual`.
 * "Today" counts as a full day: the expected figure is for the end of the day.
 */
export function calcularAvance(e: EntradaPlan, plan: Plan, actual: number, hoy: FechaISO): Avance {
  const { dias, total, sentido, porDia } = plan;
  const hoyDias = aDias(hoy);
  const desdeDias = aDias(e.desde);
  const hastaDias = aDias(e.hasta);

  const transcurridos = Math.min(dias, Math.max(0, hoyDias - desdeDias + 1));
  const esperadoHecho = (total * transcurridos) / dias;
  const esperadoValor = e.inicio + sentido * esperadoHecho;

  const hecho = sentido * (actual - e.inicio);
  const fraccion = hecho / total;
  const diferencia = hecho - esperadoHecho;
  const diferenciaDias = diferencia / porDia;
  const tolerancia = Math.max(porDia, TOLERANCIA * total);

  let veredicto: Veredicto;
  if (hecho >= total - EPS) veredicto = "cumplida";
  else if (hoyDias < desdeDias) veredicto = "sin-empezar";
  else if (hoyDias > hastaDias) veredicto = "vencida";
  else if (diferencia > tolerancia + EPS) veredicto = "adelantado";
  else if (diferencia < -tolerancia - EPS) veredicto = "atrasado";
  else veredicto = "a-tiempo";

  const restante = Math.max(total - hecho, 0);
  const diasRestantes = dias - transcurridos;
  const ritmoNuevoDia = diasRestantes > 0 ? restante / diasRestantes : null;

  let ritmoActualDia: number | null = null;
  let proyeccion: FechaISO | null = null;
  if (transcurridos > 0 && hecho > EPS) {
    ritmoActualDia = hecho / transcurridos;
    const diasNecesarios = Math.max(1, Math.ceil(total / ritmoActualDia - EPS));
    if (veredicto !== "cumplida" && diasNecesarios <= MAX_DIAS * 10) {
      proyeccion = sumarDias(e.desde, diasNecesarios - 1);
    }
  }

  return {
    transcurridos,
    esperadoValor,
    esperadoHecho,
    hecho,
    fraccion,
    diferencia,
    diferenciaDias,
    tolerancia,
    veredicto,
    restante,
    diasRestantes,
    ritmoNuevoDia,
    ritmoActualDia,
    proyeccion,
  };
}
