import type { Ejemplo } from "@/data/presets";
import { estadoAQuery } from "@/lib/enlace";
import { formatearFecha } from "@/lib/fechas";
import { conUnidad, formatearNumero, numeroParaCampo } from "@/lib/formato";
import { calcularAvance, calcularPlan } from "@/lib/ritmo";

const VEREDICTO: Record<string, string> = {
  cumplida: "meta cumplida",
  adelantado: "vas adelantado",
  "a-tiempo": "vas a tiempo",
  atrasado: "vas atrasado",
  "sin-empezar": "aún no empieza",
  vencida: "plazo vencido",
};

/**
 * A worked example, computed at build time with the same functions the
 * calculator uses, so the published numbers can never drift from the tool.
 */
export function EjemploResuelto({ ejemplo, ruta }: { ejemplo: Ejemplo; ruta: string }) {
  const { entrada: e, unidad: u, revision } = ejemplo;
  const plan = calcularPlan(e);
  const avance = revision ? calcularAvance(e, plan, revision.actual, revision.hoy) : null;
  const n = formatearNumero;
  const query = estadoAQuery({
    meta: ejemplo.titulo,
    de: numeroParaCampo(e.inicio),
    a: numeroParaCampo(e.objetivo),
    u,
    desde: e.desde,
    hasta: e.hasta,
    dps: String(e.diasPorSemana),
    llevo: revision ? numeroParaCampo(revision.actual) : "",
  });

  return (
    <article className="rounded-2xl border border-line bg-surface p-5">
      <h3 className="text-lg font-bold">{ejemplo.titulo}</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-[1rem] marker:text-meta">
        <li>
          Del {formatearFecha(e.desde)} al {formatearFecha(e.hasta)} hay <strong>{n(plan.dias)} días</strong>, contando
          el primero y el último.
        </li>
        <li>
          Hay que {plan.sentido === 1 ? "sumar" : "bajar"} <strong>{conUnidad(plan.total, u)}</strong>: {n(plan.porDia)}{" "}
          al día, <strong>{n(plan.porSemana)} por semana</strong> y {n(plan.porMes)} al mes
          {e.diasPorSemana < 7 ? (
            <>
              . Con {e.diasPorSemana} sesiones por semana, <strong>{conUnidad(plan.porSesion, u)} por sesión</strong>
            </>
          ) : null}
          .
        </li>
        <li>
          Hitos: {plan.hitos.map((h) => `${n(h.valor)} el ${formatearFecha(h.fecha)}`).join("; ")}.
        </li>
        {avance && revision ? (
          <>
            <li>
              Revisión del {formatearFecha(revision.hoy)} con {conUnidad(revision.actual, u)}: han pasado{" "}
              {n(avance.transcurridos)} días y lo previsto era {n(avance.esperadoValor)}. La diferencia es{" "}
              {n(avance.diferencia)} y el margen, {n(avance.tolerancia)}: <strong>{VEREDICTO[avance.veredicto]}</strong>.
            </li>
            {avance.ritmoNuevoDia !== null ? (
              <li>
                Para llegar a la fecha faltan {conUnidad(avance.restante, u)} en {n(avance.diasRestantes)} días:{" "}
                <strong>{n(avance.ritmoNuevoDia * 7)} por semana</strong> desde el día siguiente.
                {avance.proyeccion ? ` Al ritmo llevado hasta entonces, la meta se alcanzaría el ${formatearFecha(avance.proyeccion)}.` : ""}
              </li>
            ) : null}
          </>
        ) : null}
      </ul>
      <p className="mt-3">
        {/* A plain link on purpose: it reloads the page so the calculator starts from this example. */}
        <a href={`${ruta}?${query}`} className="enlace font-semibold">
          Abrir este ejemplo en la calculadora
        </a>
      </p>
    </article>
  );
}
