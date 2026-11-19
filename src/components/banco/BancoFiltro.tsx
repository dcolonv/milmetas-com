"use client";

import { useId, useMemo, useState, useSyncExternalStore } from "react";
import type { MetaListada } from "@/lib/banco";
import { MetaFila } from "./MetaFila";

type Opcion = { slug: string; nombre: string };

const sinAcentos = (t: string) =>
  t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

function Chips({
  titulo,
  opciones,
  valor,
  onCambio,
}: {
  titulo: string;
  opciones: Opcion[];
  valor: string;
  onCambio: (slug: string) => void;
}) {
  return (
    <div role="group" aria-label={titulo}>
      <p className="text-sm font-semibold text-muted">{titulo}</p>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {opciones.map((o) => {
          const activa = o.slug === valor;
          return (
            <button
              key={o.slug}
              type="button"
              aria-pressed={activa}
              onClick={() => onCambio(o.slug)}
              className={`min-h-10 rounded-full border px-3.5 text-sm font-semibold ${
                activa
                  ? "border-ink bg-ink text-paper"
                  : "border-line-strong bg-surface text-ink hover:border-meta hover:text-meta-dark"
              }`}
            >
              {o.nombre}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type Filtros = { area: string; horizonte: string; texto: string };

const sinSuscripcion = () => () => {};
const queryCliente = () => window.location.search;
const queryServidor = () => "";

/** Reads `?area=…&plazo=…&q=…`, ignoring values that are not real options. */
function leerFiltros(query: string, areas: Opcion[], horizontes: Opcion[]): Filtros {
  const p = new URLSearchParams(query);
  const area = p.get("area") ?? "";
  const plazo = p.get("plazo") ?? "";
  return {
    area: areas.some((a) => a.slug === area) ? area : "todas",
    horizonte: horizontes.some((h) => h.slug === plazo) ? plazo : "todos",
    texto: (p.get("q") ?? "").slice(0, 60),
  };
}

function escribirFiltros(f: Filtros) {
  const p = new URLSearchParams();
  if (f.area !== "todas") p.set("area", f.area);
  if (f.horizonte !== "todos") p.set("plazo", f.horizonte);
  if (f.texto.trim()) p.set("q", f.texto.trim());
  const query = p.toString();
  window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
}

/**
 * The whole bank with filters by area, horizon and text. Filtering happens in
 * the browser, and the filters live in the query string so a filtered view
 * can be linked. The server always renders the full list.
 */
export function BancoFiltro({
  metas,
  areas,
  horizontes,
}: {
  metas: MetaListada[];
  areas: Opcion[];
  horizontes: Opcion[];
}) {
  // The query string as it was when the page opened; "" on the server, so the first render matches the HTML.
  const queryInicial = useSyncExternalStore(sinSuscripcion, queryCliente, queryServidor);
  const [elegidos, setElegidos] = useState<Filtros | null>(null);
  const filtros = elegidos ?? leerFiltros(queryInicial, areas, horizontes);
  const { area, horizonte, texto } = filtros;
  const idBusqueda = useId();

  const cambiar = (cambio: Partial<Filtros>) => {
    const nuevos = { ...filtros, ...cambio };
    setElegidos(nuevos);
    escribirFiltros(nuevos);
  };
  const setArea = (slug: string) => cambiar({ area: slug });
  const setHorizonte = (slug: string) => cambiar({ horizonte: slug });

  const buscables = useMemo(() => metas.map((m) => ({ meta: m, texto: sinAcentos(m.texto) })), [metas]);
  const consulta = sinAcentos(texto.trim());
  const visibles = buscables
    .filter(
      (b) =>
        (area === "todas" || b.meta.area === area) &&
        (horizonte === "todos" || b.meta.horizonte === horizonte) &&
        (consulta === "" || b.texto.includes(consulta)),
    )
    .map((b) => b.meta);
  const filtrando = area !== "todas" || horizonte !== "todos" || consulta !== "";

  return (
    <div>
      <div className="space-y-4 rounded-2xl border border-line bg-surface p-4 sm:p-5">
        <Chips titulo="Área" opciones={[{ slug: "todas", nombre: "Todas" }, ...areas]} valor={area} onCambio={setArea} />
        <Chips
          titulo="Plazo"
          opciones={[{ slug: "todos", nombre: "Todos" }, ...horizontes]}
          valor={horizonte}
          onCambio={setHorizonte}
        />
        <div>
          <label htmlFor={idBusqueda} className="text-sm font-semibold text-muted">
            Buscar en el texto
          </label>
          <input
            id={idBusqueda}
            name="buscar"
            type="search"
            autoComplete="off"
            value={texto}
            onChange={(ev) => cambiar({ texto: ev.target.value })}
            placeholder="leer, ahorrar, km…"
            className="mt-1.5 block min-h-11 w-full max-w-md rounded-lg border border-line-strong bg-surface px-3 py-2 text-base focus-visible:outline-offset-0"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p role="status" aria-live="polite" className="font-semibold">
          {visibles.length} {visibles.length === 1 ? "meta" : "metas"}
          {filtrando ? ` de ${metas.length}` : ""}
        </p>
        {filtrando ? (
          <button
            type="button"
            onClick={() => cambiar({ area: "todas", horizonte: "todos", texto: "" })}
            className="min-h-10 rounded-lg px-2 text-sm font-semibold text-meta-dark underline underline-offset-4"
          >
            Quitar filtros
          </button>
        ) : null}
      </div>

      {visibles.length > 0 ? (
        <ul className="mt-2 divide-y divide-line rounded-2xl border border-line bg-surface">
          {visibles.map((m) => (
            <MetaFila key={m.id} meta={m} conArea />
          ))}
        </ul>
      ) : (
        <p className="mt-2 rounded-2xl border border-line bg-surface px-5 py-6 text-muted">
          Ninguna meta coincide con esos filtros. Prueba con otra palabra o quita un filtro.
        </p>
      )}
    </div>
  );
}
