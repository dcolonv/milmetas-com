/**
 * Every indexable page of the site, built from the data files the pages use.
 * The sitemap and /llms.txt both read this list, so neither can drift from
 * the site or from the other. A page that is not here is in neither.
 *
 * To add a page: a guide, an area or a calculator by kind of goal appears by
 * itself once it is in its data file. Any other new page needs a line in
 * `fijas` below.
 */

import { areas } from "@/data/areas";
import { guias } from "@/data/guias";
import { totalMetas } from "@/data/metas";
import { calculadoraActualizada, presets } from "@/data/presets";
import { site } from "@/site.config";

export type SeccionPagina = "inicio" | "calculadoras" | "banco" | "guias" | "sitio";

export type Pagina = {
  /** The page's own path, starting with "/". */
  ruta: string;
  nombre: string;
  /** One line saying what the page is for. */
  descripcion: string;
  seccion: SeccionPagina;
  /** Date of the last real change, "YYYY-MM-DD". */
  actualizado: string;
  /** Sitemap priority. */
  prioridad: number;
};

const masReciente = (fechas: string[]) => fechas.reduce((a, b) => (a > b ? a : b));

export function listarPaginas(): Pagina[] {
  const bancoActualizado = masReciente(areas.map((a) => a.actualizado));
  const guiasActualizado = masReciente(guias.map((g) => g.actualizado));
  const calculadorasActualizado = masReciente([calculadoraActualizada, ...presets.map((p) => p.actualizado)]);
  const todo = masReciente([bancoActualizado, guiasActualizado, calculadorasActualizado, site.launched]);

  const sitio = (ruta: string, nombre: string, descripcion: string): Pagina => ({
    ruta,
    nombre,
    descripcion,
    seccion: "sitio",
    actualizado: site.launched,
    prioridad: 0.3,
  });

  return [
    {
      ruta: "/",
      nombre: site.name,
      descripcion: site.description,
      seccion: "inicio",
      actualizado: todo,
      prioridad: 1,
    },
    {
      ruta: "/calculadora",
      nombre: "Calculadora de metas",
      descripcion:
        "Para cualquier meta con una cifra y una fecha: ritmo por día, semana y mes, hitos con fecha, lo previsto para hoy y si vas adelantado, a tiempo o atrasado. Incluye todas las fórmulas y cuatro ejemplos resueltos.",
      seccion: "calculadoras",
      actualizado: calculadoraActualizada,
      prioridad: 0.9,
    },
    ...presets.map(
      (p): Pagina => ({
        ruta: `/calculadora/${p.slug}`,
        nombre: p.nombre,
        descripcion: p.descripcion,
        seccion: "calculadoras",
        actualizado: p.actualizado,
        prioridad: 0.8,
      }),
    ),
    {
      ruta: "/metas",
      nombre: "Banco de metas",
      descripcion: `Las ${totalMetas} metas de ejemplo del banco en una sola página, con filtros por área, por plazo (corto, mediano y largo) y por texto. Cada meta tiene cantidad, unidad y plazo.`,
      seccion: "banco",
      actualizado: bancoActualizado,
      prioridad: 0.9,
    },
    ...areas.map(
      (a): Pagina => ({
        ruta: `/metas/${a.slug}`,
        nombre: a.titulo,
        descripcion: a.descripcion,
        seccion: "banco",
        actualizado: a.actualizado,
        prioridad: 0.8,
      }),
    ),
    {
      ruta: "/guias",
      nombre: "Guías",
      descripcion: `Índice de las ${guias.length} guías, agrupadas en método y situaciones.`,
      seccion: "guias",
      actualizado: guiasActualizado,
      prioridad: 0.8,
    },
    ...guias.map(
      (g): Pagina => ({
        ruta: `/guias/${g.slug}`,
        nombre: g.titulo,
        descripcion: g.descripcion,
        seccion: "guias",
        actualizado: g.actualizado,
        prioridad: 0.7,
      }),
    ),
    sitio("/acerca", "Acerca de Mil Metas", "Qué es el sitio, para quién está hecho, quién lo publica y cómo se financia."),
    sitio(
      "/como-trabajamos",
      "Cómo trabajamos",
      "Criterios del banco de metas, cómo se verifican las fuentes de las guías, el papel de la inteligencia artificial y cómo se corrigen los errores.",
    ),
    sitio("/contacto", "Contacto", "Cómo avisar de un error, proponer una meta o preguntar por patrocinios."),
    sitio("/publicidad", "Publicidad y patrocinio", "Qué espacios patrocinados ofrece el sitio y qué no acepta."),
    sitio("/privacidad", "Política de privacidad", "Qué datos trata el sitio y cuáles no."),
    sitio("/terminos", "Términos de uso", "Condiciones de uso del contenido y de la calculadora."),
    sitio("/afiliados", "Enlaces de afiliados", "Qué enlaces son de afiliados, con qué programas y cómo se señalan."),
  ];
}
