/** What a goal of the bank needs to be shown in a list: its link into the calculator and its weekly pace. */

import { areaPorSlug } from "@/data/areas";
import type { Horizonte, Meta } from "@/data/metas";
import { enlaceCalculadora } from "./enlace";
import { conUnidad } from "./formato";

export type MetaListada = {
  id: string;
  area: string;
  areaNombre: string;
  texto: string;
  horizonte: Horizonte;
  /** "≈ 56.000 pasos por semana" */
  ritmo: string;
  href: string;
};

const PERIODOS: [nombre: string, dias: number][] = [
  ["día", 1],
  ["semana", 7],
  ["mes", 30.4375],
  ["año", 365.25],
];

/**
 * The pace in the shortest period where it reaches at least one unit:
 * "20 páginas por día", "3 sesiones por semana", "1 libro por mes", "2 países por año".
 */
export function ritmoLegible(total: number, dias: number, unidad: string): string {
  const porDia = total / dias;
  const [nombre, periodo] = PERIODOS.find(([, d]) => porDia * d >= 1) ?? PERIODOS[PERIODOS.length - 1];
  return `${conUnidad(Math.min(porDia * periodo, total), unidad)} por ${nombre}`;
}

export function listarMeta(m: Meta): MetaListada {
  const area = areaPorSlug.get(m.area)!;
  const ritmo = ritmoLegible(Math.abs(m.cantidad - m.desde), m.dias, m.unidad);

  return {
    id: m.id,
    area: m.area,
    areaNombre: area.nombre,
    texto: m.texto,
    horizonte: m.horizonte,
    ritmo: `≈ ${ritmo}`,
    href: enlaceCalculadora({
      meta: m.texto,
      de: m.desde,
      a: m.cantidad,
      u: m.unidad,
      dias: m.dias,
      ruta: area.calculadora,
    }),
  };
}
