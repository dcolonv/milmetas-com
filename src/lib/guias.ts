/**
 * Loads a guide's body. One explicit line per guide keeps the imports
 * statically analysable; src/data/datos.test.ts fails if a guide in
 * src/data/guias.ts has no line here or no file in content/guias/.
 */

import type { ComponentType } from "react";

type Modulo = { default: ComponentType };

export const cargadores: Record<string, () => Promise<Modulo>> = {
  "como-escribir-una-meta-smart": () => import("@content/guias/como-escribir-una-meta-smart.mdx"),
  "metas-a-corto-mediano-y-largo-plazo": () => import("@content/guias/metas-a-corto-mediano-y-largo-plazo.mdx"),
  "metas-y-habitos": () => import("@content/guias/metas-y-habitos.mdx"),
  "que-dice-la-investigacion-sobre-fijar-metas": () =>
    import("@content/guias/que-dice-la-investigacion-sobre-fijar-metas.mdx"),
  "como-saber-si-vas-a-tiempo": () => import("@content/guias/como-saber-si-vas-a-tiempo.mdx"),
  "metodo-woop-y-planes-si-entonces": () => import("@content/guias/metodo-woop-y-planes-si-entonces.mdx"),
  "okr-personales": () => import("@content/guias/okr-personales.mdx"),
  "propositos-de-ano-nuevo": () => import("@content/guias/propositos-de-ano-nuevo.mdx"),
  "metas-financieras": () => import("@content/guias/metas-financieras.mdx"),
  "metas-academicas": () => import("@content/guias/metas-academicas.mdx"),
  "metas-laborales-evaluacion-de-desempeno": () => import("@content/guias/metas-laborales-evaluacion-de-desempeno.mdx"),
  "reto-de-lectura-paginas-por-dia": () => import("@content/guias/reto-de-lectura-paginas-por-dia.mdx"),
};
