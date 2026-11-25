import type { Predeterminados } from "@/lib/enlace";
import { sumarDias } from "@/lib/fechas";
import { conUnidad, formatearNumero } from "@/lib/formato";
import { calcularPlan } from "@/lib/ritmo";

/** The pace does not depend on when the plan starts, so any start day gives the page's example figures. */
const DIA_CUALQUIERA = "2027-01-01";

/**
 * What the server sends in place of the calculator: the same footprint, with
 * the pace of the page's example plan already worked out by the calculator's
 * own function. A reader without JavaScript, or a crawler that does not run
 * it, gets the answer for the example instead of a loading notice, and the
 * calculator shows the same figures when it takes over.
 */
export function Esqueleto({ pre }: { pre: Predeterminados }) {
  const plan = calcularPlan({
    inicio: pre.de,
    objetivo: pre.a,
    desde: DIA_CUALQUIERA,
    hasta: sumarDias(DIA_CUALQUIERA, pre.dias - 1),
    diasPorSemana: pre.dps,
  });
  const n = formatearNumero;
  const cifras: [titulo: string, valor: number][] = [
    ["Por día", plan.porDia],
    ["Por semana", plan.porSemana],
    ["Por mes", plan.porMes],
  ];
  if (plan.diasPorSemana < 7) cifras.push(["Por sesión", plan.porSesion]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" aria-busy="true">
      <div className="min-h-[640px] rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <h2 className="text-xl font-bold">Tu meta</h2>
        <p className="mt-2 text-muted">Cargando la calculadora…</p>
      </div>
      <div className="min-h-[640px] rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <h2 className="text-xl font-bold [overflow-wrap:anywhere]">{pre.meta}</h2>
        <p className="mt-2 text-[0.98rem]">
          Plan de ejemplo: {conUnidad(plan.total, pre.u)} en {n(plan.dias)} días son{" "}
          <strong>{conUnidad(plan.porDia, pre.u)} al día</strong>, {n(plan.porSemana)} por semana y {n(plan.porMes)} al
          mes
          {plan.diasPorSemana < 7
            ? `. Con ${plan.diasPorSemana} días por semana, ${conUnidad(plan.porSesion, pre.u)} por sesión`
            : ""}
          {plan.cadaNDias !== null ? `. Eso es 1 cada ${n(plan.cadaNDias)} días` : ""}.
        </p>
        <dl className={`mt-4 grid grid-cols-2 gap-2 ${cifras.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
          {cifras.map(([titulo, valor], i) => (
            <div
              key={titulo}
              className={`rounded-xl border border-line bg-paper px-3 py-3 ${cifras.length === 3 && i === 2 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <dt className="text-sm font-semibold text-muted">{titulo}</dt>
              <dd className="mt-0.5 [overflow-wrap:anywhere]">
                <span className="cifra text-2xl font-extrabold text-ink sm:text-[1.7rem]">{n(valor)}</span>
                {/* The unit is free text and cannot be made singular, so "1 libros" is avoided by leaving it out. */}
                {pre.u && n(valor) !== "1" ? <span className="ml-1.5 break-words text-sm text-muted">{pre.u}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-sm text-muted">
          En un momento podrás cambiar las cifras y las fechas, y ver los hitos y si vas a tiempo.
        </p>
      </div>
    </div>
  );
}
