/**
 * "Mis metas": plans the visitor saved, kept in this browser's localStorage.
 * Nothing leaves the device. The key carries a version so the shape can change.
 * Shaped as an external store for useSyncExternalStore.
 */

import type { EstadoForm } from "./enlace";

const CLAVE = "milmetas:metas:v1";
const MAX_GUARDADAS = 50;
const CAMPOS: (keyof EstadoForm)[] = ["meta", "de", "a", "u", "desde", "hasta", "dps", "llevo"];

export type MetaGuardada = { id: string; estado: EstadoForm };

const VACIO: MetaGuardada[] = [];
const oyentes = new Set<() => void>();
let cache: { raw: string | null; valor: MetaGuardada[] } | null = null;

function esGuardada(x: unknown): x is MetaGuardada {
  if (typeof x !== "object" || x === null) return false;
  const g = x as { id?: unknown; estado?: unknown };
  if (typeof g.id !== "string" || typeof g.estado !== "object" || g.estado === null) return false;
  const estado = g.estado as Record<string, unknown>;
  return CAMPOS.every((c) => typeof estado[c] === "string");
}

function leer(): MetaGuardada[] {
  try {
    const raw = window.localStorage.getItem(CLAVE);
    if (cache && cache.raw === raw) return cache.valor;
    const datos: unknown = raw ? JSON.parse(raw) : [];
    const valor = Array.isArray(datos) ? datos.filter(esGuardada).slice(0, MAX_GUARDADAS) : VACIO;
    cache = { raw, valor };
    return valor;
  } catch {
    // Storage disabled or corrupted: behave as if nothing was saved.
    return VACIO;
  }
}

function escribir(lista: MetaGuardada[]): boolean {
  try {
    window.localStorage.setItem(CLAVE, JSON.stringify(lista.slice(0, MAX_GUARDADAS)));
  } catch {
    return false;
  }
  cache = null;
  oyentes.forEach((fn) => fn());
  return true;
}

export function suscribirMisMetas(fn: () => void): () => void {
  oyentes.add(fn);
  window.addEventListener("storage", fn);
  return () => {
    oyentes.delete(fn);
    window.removeEventListener("storage", fn);
  };
}

export function leerMisMetas(): MetaGuardada[] {
  return leer();
}

export function leerMisMetasServidor(): MetaGuardada[] {
  return VACIO;
}

/** Adds the plan, or replaces the saved one with the same id. Returns false when the browser refuses to store it. */
export function guardarMeta(meta: MetaGuardada): boolean {
  const lista = leer();
  const existe = lista.some((m) => m.id === meta.id);
  return escribir(existe ? lista.map((m) => (m.id === meta.id ? meta : m)) : [meta, ...lista]);
}

export function borrarMeta(id: string): boolean {
  return escribir(leer().filter((m) => m.id !== id));
}
