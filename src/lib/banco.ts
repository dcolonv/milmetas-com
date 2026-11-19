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

export function listarMeta(m: Meta): MetaListada {
  const area = areaPorSlug.get(m.area)!;
  const total = Math.abs(m.cantidad - m.desde);
  const porDia = total / m.dias;
  // Short plans read better per day; anything longer, per week or per month.
  let ritmo: string;
  if (m.dias < 14) ritmo = `${conUnidad(porDia, m.unidad)} por día`;
  else if (porDia * 7 >= 1 || m.dias <= 92) ritmo = `${conUnidad(Math.min(porDia * 7, total), m.unidad)} por semana`;
  else ritmo = `${conUnidad(Math.min(porDia * 30.4375, total), m.unidad)} por mes`;

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
