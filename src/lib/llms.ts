/**
 * The text of /llms.txt: a Markdown summary of the site for language models
 * and the agents that read on a person's behalf, in the shape proposed at
 * https://llmstxt.org (one H1, a blockquote summary, plain paragraphs, then H2
 * sections that are lists of links with a note each).
 *
 * It is built from the same page list as the sitemap, so it cannot name a
 * page the site does not have or miss one it does. It is an aid, not a
 * ranking signal: no search or AI product has said it requires this file.
 */

import { areas } from "@/data/areas";
import { guias } from "@/data/guias";
import { totalMetas } from "@/data/metas";
import { formatearFecha } from "@/lib/fechas";
import { listarPaginas, type Pagina, type SeccionPagina } from "@/lib/paginas";
import { absoluteUrl, site } from "@/site.config";

/** "Optional" is the one section name the format gives a meaning to: links a reader may skip when short of room. */
const SECCIONES: { seccion: SeccionPagina; titulo: string }[] = [
  { seccion: "calculadoras", titulo: "Calculadoras" },
  { seccion: "banco", titulo: "Banco de metas" },
  { seccion: "guias", titulo: "Guías" },
  { seccion: "sitio", titulo: "Optional" },
];

const enlace = (p: Pagina) => `- [${p.nombre}](${absoluteUrl(p.ruta)}): ${p.descripcion}`;

export function textoLlms(): string {
  const paginas = listarPaginas();
  const actualizado = paginas.reduce((a, p) => (p.actualizado > a ? p.actualizado : a), site.launched);
  const editor = site.publisherName
    ? `${site.name} es una publicación de ${site.publisherName}`
    : `${site.name} es una publicación independiente`;

  const partes = [
    `# ${site.name}`,
    `> Sitio gratuito en español para fijar metas medibles: un banco de ${totalMetas} metas de ejemplo en ${areas.length} áreas de vida, una calculadora que convierte cualquier meta con cifra y fecha en un ritmo por día, semana y mes y dice si vas a tiempo, y ${guias.length} guías que citan sus fuentes.`,
    `${editor}, escrita en español neutro, sin país ni moneda por defecto. La calculadora funciona en el navegador, sin registro, y sus fórmulas están publicadas. Las metas del banco son ejemplos con cantidad, unidad y plazo, no recomendaciones personales; no hay metas de peso, dietas, medicación ni inversiones. Las guías enlazan cada estudio a su fuente original. El contenido se investiga y se redacta con ayuda de herramientas de inteligencia artificial y se contrasta con las fuentes citadas; el método está en «Cómo trabajamos».`,
    `Cómo calcula el ritmo la calculadora: los días del plan son los que van de la fecha de inicio a la fecha límite, contando ambas. Ritmo por día = total ÷ días del plan; por semana = ritmo por día × 7; por mes = ritmo por día × 30,4375. Lo previsto para hoy = total × días transcurridos ÷ días del plan. El veredicto es «a tiempo» si la diferencia entre lo hecho y lo previsto no supera el mayor entre un día de ritmo y el 5 % del total; por encima es «adelantado» y por debajo, «atrasado».`,
    `Última actualización del sitio: ${formatearFecha(actualizado)}.`,
    ...SECCIONES.map(({ seccion, titulo }) =>
      [`## ${titulo}`, "", ...paginas.filter((p) => p.seccion === seccion).map(enlace)].join("\n"),
    ),
  ];
  return `${partes.join("\n\n")}\n`;
}
