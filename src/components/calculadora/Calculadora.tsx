"use client";

import { useSearchParams } from "next/navigation";
import { useId, useState, useSyncExternalStore } from "react";
import {
  MAX_NOMBRE,
  MAX_UNIDAD,
  estadoAQuery,
  estadoInicial,
  interpretar,
  type EstadoForm,
  type Predeterminados,
} from "@/lib/enlace";
import { diasEntre, finDeAnio, formatearFecha, formatearFechaCorta, hoyLocal, sumarDias } from "@/lib/fechas";
import { conUnidad, formatearNumero, formatearPorcentaje, plural } from "@/lib/formato";
import {
  borrarMeta,
  guardarMeta,
  leerMisMetas,
  leerMisMetasServidor,
  suscribirMisMetas,
  type MetaGuardada,
} from "@/lib/misMetas";
import { DIAS_MES, calcularAvance, calcularPlan, type Avance, type EntradaPlan, type Plan, type Veredicto } from "@/lib/ritmo";
import { Esqueleto } from "./Esqueleto";

const sinSuscripcion = () => () => {};
const hoyCliente = () => hoyLocal();
const hoyServidor = () => null;

const VEREDICTOS: Record<Veredicto, { etiqueta: string; clases: string }> = {
  cumplida: { etiqueta: "Meta cumplida", clases: "bg-ok-soft text-ok border-ok/30" },
  adelantado: { etiqueta: "Vas adelantado", clases: "bg-ok-soft text-ok border-ok/30" },
  "a-tiempo": { etiqueta: "Vas a tiempo", clases: "bg-ok-soft text-ok border-ok/30" },
  atrasado: { etiqueta: "Vas atrasado", clases: "bg-late-soft text-late border-late/30" },
  "sin-empezar": { etiqueta: "Aún no empieza", clases: "bg-wait-soft text-wait border-wait/30" },
  vencida: { etiqueta: "Plazo vencido", clases: "bg-wait-soft text-wait border-wait/30" },
};

const DURACIONES: { etiqueta: string; dias: number | "fin-de-anio" }[] = [
  { etiqueta: "30 días", dias: 30 },
  { etiqueta: "90 días", dias: 90 },
  { etiqueta: "6 meses", dias: 182 },
  { etiqueta: "1 año", dias: 365 },
  { etiqueta: "Fin de año", dias: "fin-de-anio" },
];

const campo =
  "mt-1 block min-h-11 w-full rounded-lg border border-line-strong bg-surface px-3 py-2 text-base text-ink placeholder:text-muted/70 focus-visible:outline-offset-0 aria-[invalid=true]:border-late";
const etiqueta = "block text-[0.95rem] font-semibold text-ink";

function dias1(n: number): string {
  return formatearNumero(Math.round(Math.abs(n) * 10) / 10);
}

function fraseVeredicto(v: Veredicto, a: Avance, e: EntradaPlan, unidad: string): string {
  const dif = conUnidad(Math.abs(a.diferencia), unidad);
  const dd = dias1(a.diferenciaDias);
  switch (v) {
    case "cumplida":
      return `Has llegado a ${conUnidad(e.objetivo, unidad)}. Puedes subir el listón o empezar la siguiente.`;
    case "sin-empezar":
      return `Tu plan empieza el ${formatearFecha(e.desde)}. Este es el ritmo que te espera.`;
    case "vencida":
      return `El plazo terminó el ${formatearFecha(e.hasta)} y faltan ${conUnidad(a.restante, unidad)}. Elige una fecha nueva para recalcular el ritmo.`;
    case "adelantado":
      return `Llevas ${dif} más de lo previsto para hoy: unos ${dd} ${plural(Number(dd.replace(",", ".")), "día", "días")} de ventaja.`;
    case "atrasado":
      return `Te faltan ${dif} para estar al día: unos ${dd} ${plural(Number(dd.replace(",", ".")), "día", "días")} de ritmo.`;
    default:
      return "Estás dentro del margen de lo previsto para hoy. Sigue con el mismo ritmo.";
  }
}

function Cifra({ titulo, valor, unidad, nota }: { titulo: string; valor: number; unidad: string; nota?: string }) {
  return (
    <div className="rounded-xl border border-line bg-paper px-3 py-3">
      <dt className="text-sm font-semibold text-muted">{titulo}</dt>
      <dd className="mt-0.5">
        <span className="cifra text-2xl font-extrabold text-ink sm:text-[1.7rem]">{formatearNumero(valor)}</span>
        {unidad ? <span className="ml-1.5 break-words text-sm text-muted">{unidad}</span> : null}
        {nota ? <span className="block text-xs text-muted">{nota}</span> : null}
      </dd>
    </div>
  );
}

function Barra({ avance, plan }: { avance: Avance; plan: Plan }) {
  const hecho = Math.min(1, Math.max(0, avance.fraccion));
  const previsto = Math.min(1, Math.max(0, avance.transcurridos / plan.dias));
  return (
    <div>
      <div
        role="progressbar"
        aria-label="Avance de la meta"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(hecho * 100)}
        aria-valuetext={`${formatearPorcentaje(avance.fraccion)} hecho; previsto para hoy ${formatearPorcentaje(previsto)}`}
        className="relative h-5 rounded-full border border-line-strong bg-paper"
      >
        <div className="h-full rounded-full bg-meta" style={{ width: `${hecho * 100}%` }} />
        <div
          className="absolute -top-1.5 h-8 w-1 -translate-x-1/2 rounded bg-ink"
          style={{ left: `${previsto * 100}%` }}
          aria-hidden="true"
        />
      </div>
      <p className="mt-2 flex flex-wrap justify-between gap-x-4 text-sm text-muted">
        <span>
          <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-meta" aria-hidden="true" />
          Hecho: {formatearPorcentaje(avance.fraccion)}
        </span>
        <span>
          <span className="mr-1.5 inline-block h-3 w-1 rounded bg-ink align-[-2px]" aria-hidden="true" />
          Previsto para hoy: {formatearPorcentaje(previsto)}
        </span>
      </p>
    </div>
  );
}

function ComoSeCalcula({
  e,
  plan,
  avance,
  actual,
  unidad,
}: {
  e: EntradaPlan;
  plan: Plan;
  avance: Avance;
  actual: number;
  unidad: string;
}) {
  const n = formatearNumero;
  const signo = plan.sentido === 1 ? "+" : "−";
  return (
    <details className="rounded-xl border border-line bg-paper px-4 py-3 text-[0.95rem]">
      <summary className="cursor-pointer font-semibold text-ink">Cómo se calcula, con tus números</summary>
      <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-ink/90">
        <li>
          Días del plan: del {formatearFechaCorta(e.desde)} al {formatearFechaCorta(e.hasta)}, contando ambos ={" "}
          <strong>{n(plan.dias)}</strong>.
        </li>
        <li>
          Total por recorrer: |{n(e.objetivo)} − {n(e.inicio)}| = <strong>{conUnidad(plan.total, unidad)}</strong>.
        </li>
        <li>
          Ritmo por día: {n(plan.total)} ÷ {n(plan.dias)} = <strong>{n(plan.porDia)}</strong>. Por semana: × 7 ={" "}
          <strong>{n(plan.porSemana)}</strong>. Por mes: × 30,4375 = <strong>{n(plan.porMes)}</strong>.
        </li>
        <li>
          Días transcurridos al terminar hoy: <strong>{n(avance.transcurridos)}</strong>. Previsto para hoy: {n(e.inicio)}{" "}
          {signo} {n(plan.total)} × {n(avance.transcurridos)} ÷ {n(plan.dias)} ={" "}
          <strong>{n(avance.esperadoValor)}</strong>.
        </li>
        <li>
          Avance real: de {n(e.inicio)} a {n(actual)} = <strong>{n(avance.hecho)}</strong>. Diferencia con lo previsto:{" "}
          <strong>{n(avance.diferencia)}</strong>.
        </li>
        <li>
          Margen: el mayor entre un día de ritmo ({n(plan.porDia)}) y el 5 % del total ({n(plan.total * 0.05)}) ={" "}
          <strong>{n(avance.tolerancia)}</strong>. Dentro del margen vas a tiempo; por encima, adelantado; por debajo,
          atrasado.
        </li>
        {avance.ritmoNuevoDia !== null ? (
          <li>
            Ritmo desde mañana: lo que falta ({n(avance.restante)}) ÷ días que quedan ({n(avance.diasRestantes)}) ={" "}
            <strong>{n(avance.ritmoNuevoDia)}</strong> por día.
          </li>
        ) : null}
        {avance.ritmoActualDia !== null && avance.proyeccion ? (
          <li>
            Proyección: a tu ritmo medio ({n(avance.hecho)} ÷ {n(avance.transcurridos)} = {n(avance.ritmoActualDia)} por
            día) el total se alcanza el <strong>{formatearFecha(avance.proyeccion)}</strong>.
          </li>
        ) : null}
      </ol>
    </details>
  );
}

function Resultado({ e, actual, hoy, unidad }: { e: EntradaPlan; actual: number; hoy: string; unidad: string }) {
  const plan = calcularPlan(e);
  const avance = calcularAvance(e, plan, actual, hoy);
  const v = VEREDICTOS[avance.veredicto];
  const enCurso = avance.veredicto === "adelantado" || avance.veredicto === "a-tiempo" || avance.veredicto === "atrasado";
  const nuevoDia = avance.ritmoNuevoDia;
  const cambioRitmo = enCurso && nuevoDia !== null && Math.abs(nuevoDia - plan.porDia) > plan.porDia * 0.005;
  const desfase = avance.proyeccion ? diasEntre(e.hasta, avance.proyeccion) : 0;

  return (
    <div className="space-y-5">
      <div className={`rounded-xl border px-4 py-3 ${v.clases}`}>
        <p className="font-display text-xl font-extrabold">{v.etiqueta}</p>
        <p className="mt-0.5 text-[0.98rem] text-ink">{fraseVeredicto(avance.veredicto, avance, e, unidad)}</p>
      </div>

      <Barra avance={avance} plan={plan} />

      <div>
        <h3 className="text-lg font-bold">El ritmo de tu plan</h3>
        <dl className={`mt-2 grid grid-cols-2 gap-2 ${plan.diasPorSemana < 7 ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
          <Cifra titulo="Por día" valor={plan.porDia} unidad={unidad} />
          <Cifra titulo="Por semana" valor={plan.porSemana} unidad={unidad} />
          <Cifra titulo="Por mes" valor={plan.porMes} unidad={unidad} />
          {plan.diasPorSemana < 7 ? (
            <Cifra
              titulo="Por sesión"
              valor={plan.porSesion}
              unidad={unidad}
              nota={`${plan.diasPorSemana} ${plural(plan.diasPorSemana, "día", "días")} por semana`}
            />
          ) : null}
        </dl>
        <p className="mt-2 text-sm text-muted">
          {formatearNumero(plan.dias)} {plural(plan.dias, "día", "días")} de plan, del {formatearFecha(e.desde)} al{" "}
          {formatearFecha(e.hasta)}.
          {plan.cadaNDias !== null ? ` Eso es 1 cada ${formatearNumero(plan.cadaNDias)} días.` : ""}
        </p>
      </div>

      <dl className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper px-3 py-3">
          <dt className="text-sm font-semibold text-muted">Previsto para hoy</dt>
          <dd className="cifra text-xl font-extrabold">{conUnidad(avance.esperadoValor, unidad)}</dd>
        </div>
        <div className="rounded-xl border border-line bg-paper px-3 py-3">
          <dt className="text-sm font-semibold text-muted">Hoy llevas</dt>
          <dd className="cifra text-xl font-extrabold">{conUnidad(actual, unidad)}</dd>
        </div>
        {cambioRitmo && nuevoDia !== null ? (
          <div className="rounded-xl border border-line bg-paper px-3 py-3 sm:col-span-2">
            <dt className="text-sm font-semibold text-muted">Ritmo desde mañana para llegar a tiempo</dt>
            <dd>
              <span className="cifra text-xl font-extrabold">{conUnidad(Math.min(nuevoDia * 7, avance.restante), unidad)}</span>{" "}
              por semana
              <span className="block text-sm text-muted">
                {formatearNumero(nuevoDia)} por día · {formatearNumero(Math.min(nuevoDia * DIAS_MES, avance.restante))} por
                mes · faltan {conUnidad(avance.restante, unidad)} en {formatearNumero(avance.diasRestantes)}{" "}
                {plural(avance.diasRestantes, "día", "días")}
              </span>
            </dd>
          </div>
        ) : null}
        {enCurso && nuevoDia === null && avance.restante > 0 ? (
          <div className="rounded-xl border border-line bg-paper px-3 py-3 sm:col-span-2">
            <dt className="text-sm font-semibold text-muted">Hoy es el último día</dt>
            <dd>Lo que falta toca hoy: {conUnidad(avance.restante, unidad)}.</dd>
          </div>
        ) : null}
        {avance.proyeccion && avance.veredicto !== "sin-empezar" ? (
          <div className="rounded-xl border border-line bg-paper px-3 py-3 sm:col-span-2">
            <dt className="text-sm font-semibold text-muted">Si sigues a tu ritmo actual</dt>
            <dd>
              Llegarías el <strong>{formatearFecha(avance.proyeccion)}</strong>
              {desfase > 0
                ? `, ${formatearNumero(desfase)} ${plural(desfase, "día", "días")} después de la fecha límite.`
                : desfase < 0
                  ? `, ${formatearNumero(-desfase)} ${plural(desfase, "día", "días")} antes de la fecha límite.`
                  : ", justo en la fecha límite."}
            </dd>
          </div>
        ) : null}
      </dl>

      <div>
        <h3 className="text-lg font-bold">Hitos</h3>
        <div className="mt-2 overflow-x-auto rounded-xl border border-line">
          <table className="w-full border-collapse text-left text-[0.95rem]">
            <thead className="bg-paper text-sm text-muted">
              <tr>
                <th scope="col" className="px-3 py-2 font-semibold">
                  Tramo
                </th>
                <th scope="col" className="px-3 py-2 font-semibold">
                  Deberías ir por
                </th>
                <th scope="col" className="px-3 py-2 font-semibold">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody>
              {plan.hitos.map((h) => (
                <tr key={h.fraccion} className="border-t border-line">
                  <th scope="row" className="px-3 py-2 font-semibold">
                    {h.fraccion * 100} %
                  </th>
                  <td className="cifra px-3 py-2">{conUnidad(h.valor, unidad)}</td>
                  <td className="px-3 py-2">{formatearFecha(h.fecha)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ComoSeCalcula e={e} plan={plan} avance={avance} actual={actual} unidad={unidad} />
    </div>
  );
}

function MisMetas({
  guardadas,
  hoy,
  activa,
  onAbrir,
  onBorrar,
}: {
  guardadas: MetaGuardada[];
  hoy: string;
  activa: string | null;
  onAbrir: (m: MetaGuardada) => void;
  onBorrar: (m: MetaGuardada) => void;
}) {
  if (guardadas.length === 0) return null;
  return (
    <section aria-labelledby="mis-metas-titulo" className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
      <h2 id="mis-metas-titulo" className="text-xl font-bold">
        Mis metas
      </h2>
      <p className="text-sm text-muted">Guardadas solo en este navegador. Ábrelas para actualizar lo que llevas.</p>
      <ul className="mt-3 divide-y divide-line">
        {guardadas.map((m) => {
          const { entrada, actual, errores } = interpretar(m.estado);
          const avance = errores.length === 0 ? calcularAvance(entrada, calcularPlan(entrada), actual, hoy) : null;
          const v = avance ? VEREDICTOS[avance.veredicto] : null;
          const nombre = m.estado.meta.trim() || "Meta sin nombre";
          return (
            <li key={m.id} className="flex flex-wrap items-center gap-x-3 gap-y-2 py-3">
              <div className="min-w-0 flex-1 basis-56">
                <p className="truncate font-semibold">
                  {nombre}
                  {m.id === activa ? <span className="ml-2 text-sm font-normal text-muted">(abierta)</span> : null}
                </p>
                <p className="text-sm text-muted">
                  {avance ? `${formatearPorcentaje(avance.fraccion)} · ` : ""}hasta el {formatearFechaCorta(m.estado.hasta)}
                </p>
              </div>
              {v ? (
                <span className={`rounded-full border px-2.5 py-0.5 text-sm font-semibold ${v.clases}`}>{v.etiqueta}</span>
              ) : null}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onAbrir(m)}
                  aria-label={`Abrir la meta «${nombre}»`}
                  className="min-h-11 rounded-lg border border-line-strong bg-surface px-3 text-sm font-semibold hover:border-meta hover:text-meta-dark"
                >
                  Abrir
                </button>
                <button
                  type="button"
                  onClick={() => onBorrar(m)}
                  aria-label={`Borrar la meta «${nombre}»`}
                  className="min-h-11 rounded-lg border border-line-strong bg-surface px-3 text-sm font-semibold text-late hover:border-late"
                >
                  Borrar
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Formulario({ hoy, pre, inicial }: { hoy: string; pre: Predeterminados; inicial: EstadoForm }) {
  const [estado, setEstado] = useState<EstadoForm>(inicial);
  const [idActiva, setIdActiva] = useState<string | null>(null);
  const [aviso, setAviso] = useState("");
  const guardadas = useSyncExternalStore(suscribirMisMetas, leerMisMetas, leerMisMetasServidor);
  const uid = useId();
  const id = (nombre: string) => `${uid}-${nombre}`;

  const { entrada, actual, errores } = interpretar(estado);
  const error = (nombre: string) => errores.find((x) => x.campo === nombre)?.mensaje;
  const unidad = estado.u.trim();

  /** Every change also rewrites the address bar, so the page URL is always a link to this plan. */
  function aplicar(nuevo: EstadoForm) {
    setEstado(nuevo);
    setAviso("");
    window.history.replaceState(null, "", `?${estadoAQuery(nuevo)}`);
  }
  const cambiar = (clave: keyof EstadoForm) => (ev: { target: { value: string } }) =>
    aplicar({ ...estado, [clave]: ev.target.value });

  function duracion(d: number | "fin-de-anio") {
    const desde = estado.desde || hoy;
    const hasta = d === "fin-de-anio" ? finDeAnio(desde) : sumarDias(desde, d - 1);
    aplicar({ ...estado, desde, hasta });
  }

  function guardar() {
    const nuevaId = idActiva ?? `m${Date.now().toString(36)}`;
    if (guardarMeta({ id: nuevaId, estado })) {
      setIdActiva(nuevaId);
      setAviso("Meta guardada en este navegador.");
    } else {
      setAviso("Este navegador no permite guardar datos. Copia el enlace para conservar el plan.");
    }
  }

  async function copiar() {
    const url = `${window.location.origin}${window.location.pathname}?${estadoAQuery(estado)}`;
    try {
      await navigator.clipboard.writeText(url);
      setAviso("Enlace copiado. Quien lo abra verá este mismo plan.");
    } catch {
      setAviso("No se pudo copiar. El enlace de la barra de direcciones ya lleva tu plan.");
    }
  }

  function reiniciar() {
    setEstado(estadoInicial(null, hoy, pre));
    setIdActiva(null);
    setAviso("");
    window.history.replaceState(null, "", window.location.pathname);
  }

  function abrir(m: MetaGuardada) {
    setIdActiva(m.id);
    aplicar(m.estado);
  }

  function borrar(m: MetaGuardada) {
    borrarMeta(m.id);
    if (m.id === idActiva) setIdActiva(null);
    setAviso("Meta borrada de este navegador.");
  }

  const describe = (nombre: string) => (error(nombre) ? id(`${nombre}-error`) : undefined);
  const mensajeError = (nombre: string) =>
    error(nombre) ? (
      <p id={id(`${nombre}-error`)} className="mt-1 text-sm font-semibold text-late">
        {error(nombre)}
      </p>
    ) : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <form
          className="space-y-4 rounded-2xl border border-line bg-surface p-4 sm:p-6"
          onSubmit={(ev) => ev.preventDefault()}
          noValidate
        >
          <h2 className="text-xl font-bold">Tu meta</h2>

          <div>
            <label htmlFor={id("meta")} className={etiqueta}>
              Nombre de la meta <span className="font-normal text-muted">(opcional)</span>
            </label>
            <input
              id={id("meta")}
              name="meta"
              type="text"
              autoComplete="off"
              maxLength={MAX_NOMBRE}
              value={estado.meta}
              onChange={cambiar("meta")}
              placeholder="Leer 12 libros…"
              className={campo}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={id("de")} className={etiqueta}>
                Empiezo en
              </label>
              <input
                id={id("de")}
                name="de"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={estado.de}
                onChange={cambiar("de")}
                aria-invalid={Boolean(error("inicio"))}
                aria-describedby={describe("inicio")}
                className={campo}
              />
              {mensajeError("inicio")}
            </div>
            <div>
              <label htmlFor={id("a")} className={etiqueta}>
                Quiero llegar a
              </label>
              <input
                id={id("a")}
                name="a"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={estado.a}
                onChange={cambiar("a")}
                aria-invalid={Boolean(error("objetivo"))}
                aria-describedby={describe("objetivo")}
                className={campo}
              />
            </div>
            <div className="col-span-2 -mt-2 empty:hidden">{mensajeError("objetivo")}</div>
          </div>

          <div>
            <label htmlFor={id("u")} className={etiqueta}>
              Unidad <span className="font-normal text-muted">(opcional)</span>
            </label>
            <input
              id={id("u")}
              name="u"
              type="text"
              autoComplete="off"
              maxLength={MAX_UNIDAD}
              value={estado.u}
              onChange={cambiar("u")}
              placeholder="libros, km, horas, €…"
              className={campo}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={id("desde")} className={etiqueta}>
                Desde
              </label>
              <input
                id={id("desde")}
                name="desde"
                type="date"
                value={estado.desde}
                onChange={cambiar("desde")}
                aria-invalid={Boolean(error("desde"))}
                aria-describedby={describe("desde")}
                className={campo}
              />
              {mensajeError("desde")}
            </div>
            <div>
              <label htmlFor={id("hasta")} className={etiqueta}>
                Hasta
              </label>
              <input
                id={id("hasta")}
                name="hasta"
                type="date"
                value={estado.hasta}
                onChange={cambiar("hasta")}
                aria-invalid={Boolean(error("hasta"))}
                aria-describedby={describe("hasta")}
                className={campo}
              />
            </div>
            <div className="col-span-2 -mt-2 empty:hidden">{mensajeError("hasta")}</div>
          </div>

          <div role="group" aria-label="Duración rápida, contada desde la fecha de inicio">
            <p className="text-sm text-muted">Duración rápida:</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {DURACIONES.map((d) => (
                <button
                  key={d.etiqueta}
                  type="button"
                  onClick={() => duracion(d.dias)}
                  className="min-h-10 rounded-full border border-line-strong bg-paper px-3 text-sm font-semibold hover:border-meta hover:text-meta-dark"
                >
                  {d.etiqueta}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor={id("dps")} className={etiqueta}>
              Días por semana que le dedicas
            </label>
            <select id={id("dps")} name="dps" value={estado.dps} onChange={cambiar("dps")} className={campo}>
              {[7, 6, 5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n === 7 ? "Todos los días" : `${n} ${plural(n, "día", "días")} por semana`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={id("llevo")} className={etiqueta}>
              Hoy llevo
            </label>
            <input
              id={id("llevo")}
              name="llevo"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={estado.llevo}
              onChange={cambiar("llevo")}
              placeholder={estado.de || "0"}
              aria-invalid={Boolean(error("llevo"))}
              aria-describedby={`${id("llevo-ayuda")}${error("llevo") ? ` ${id("llevo-error")}` : ""}`}
              className={campo}
            />
            <p id={id("llevo-ayuda")} className="mt-1 text-sm text-muted">
              El valor en el que estás hoy. Déjalo vacío si aún no has empezado.
            </p>
            {mensajeError("llevo")}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={guardar}
              disabled={errores.length > 0}
              className="min-h-11 rounded-lg bg-meta px-4 font-semibold text-white hover:bg-meta-dark disabled:cursor-not-allowed disabled:bg-muted"
            >
              {idActiva ? "Guardar cambios" : "Guardar en este navegador"}
            </button>
            <button
              type="button"
              onClick={copiar}
              disabled={errores.length > 0}
              className="min-h-11 rounded-lg border border-line-strong bg-surface px-4 font-semibold hover:border-meta hover:text-meta-dark disabled:cursor-not-allowed disabled:text-muted"
            >
              Copiar enlace
            </button>
            <button
              type="button"
              onClick={reiniciar}
              className="min-h-11 rounded-lg px-3 font-semibold text-muted underline-offset-4 hover:text-meta-dark hover:underline"
            >
              Empezar de cero
            </button>
          </div>
          <p role="status" aria-live="polite" className="min-h-6 text-sm font-semibold text-ok">
            {aviso}
          </p>
        </form>

        <section
          aria-labelledby={id("resultado")}
          aria-live="polite"
          className="rounded-2xl border border-line bg-surface p-4 sm:p-6"
        >
          <h2 id={id("resultado")} className="mb-4 text-xl font-bold [overflow-wrap:anywhere]">
            {estado.meta.trim() || "Tu plan"}
          </h2>
          {errores.length > 0 ? (
            <div className="rounded-xl border border-late/30 bg-late-soft px-4 py-3">
              <p className="font-display text-lg font-bold text-late">Falta un dato para calcular</p>
              <ul className="mt-1 list-disc pl-5 text-ink">
                {errores.map((x) => (
                  <li key={x.campo}>{x.mensaje}</li>
                ))}
              </ul>
            </div>
          ) : (
            <Resultado e={entrada} actual={actual} hoy={hoy} unidad={unidad} />
          )}
        </section>
      </div>

      <MisMetas guardadas={guardadas} hoy={hoy} activa={idActiva} onAbrir={abrir} onBorrar={borrar} />
    </div>
  );
}

/**
 * The Calculadora de metas. It reads the plan from the query string and the
 * date from the visitor's clock, so it only renders in the browser; the
 * server sends the skeleton and the explanations around it.
 */
export function Calculadora({ pre }: { pre: Predeterminados }) {
  const params = useSearchParams();
  const hoy = useSyncExternalStore(sinSuscripcion, hoyCliente, hoyServidor);
  if (!hoy) return <Esqueleto />;
  return <Formulario hoy={hoy} pre={pre} inicial={estadoInicial(params, hoy, pre)} />;
}
