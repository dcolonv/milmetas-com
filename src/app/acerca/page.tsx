import type { Metadata } from "next";
import Link from "next/link";
import { PaginaTexto } from "@/components/PaginaTexto";
import { areas } from "@/data/areas";
import { guias } from "@/data/guias";
import { totalMetas } from "@/data/metas";
import { pageMeta } from "@/lib/seo";
import { site } from "@/site.config";

const RUTA = "/acerca";

export const metadata: Metadata = pageMeta({
  title: "Acerca de Mil Metas",
  absoluteTitle: true,
  description:
    "Qué es Mil Metas, para quién está hecho, cómo se elabora el contenido y cómo se financia: una publicación independiente sobre metas personales.",
  path: RUTA,
});

export default function Page() {
  const editor = site.publisherName;
  return (
    <PaginaTexto
      titulo="Acerca de Mil Metas"
      entradilla="Una herramienta y una biblioteca para ponerle número y fecha a lo que quieres conseguir."
      ruta={RUTA}
      miga="Acerca de"
      actualizado="2026-11-19"
    >
      <h2>Qué es</h2>
      <p>
        Mil Metas es un sitio en español con tres partes que se apoyan entre sí: un{" "}
        <Link href="/metas">banco de metas</Link> con {totalMetas} ejemplos medibles repartidos en {areas.length} áreas
        de vida, una <Link href="/calculadora">calculadora</Link> que convierte cualquier meta con cifra y fecha en un
        ritmo por día, semana y mes y te dice si vas a tiempo, y {guias.length} <Link href="/guias">guías</Link> sobre
        cómo fijar metas y seguirlas.
      </p>
      <p>
        El nombre marca la dirección: llegar a mil metas bien escritas. Hoy hay {totalMetas}, y preferimos decir el
        número real.
      </p>

      <h2>Para quién</h2>
      <p>
        Para quien está a punto de fijarse metas (en enero, al empezar un curso, antes de una evaluación en el trabajo o
        al proponerse ahorrar) y se atasca en uno de dos puntos: no saber qué meta ponerse o no saber, semanas después,
        si va bien o mal. El sitio está escrito en español neutro y no asume país ni moneda.
      </p>

      <h2>Quién lo hace</h2>
      <p>
        {editor
          ? `Mil Metas es una publicación de ${editor}.`
          : "Mil Metas es una publicación independiente. No pertenece a ninguna empresa de formación, aplicación de productividad ni entidad financiera."}{" "}
        No hay expertos inventados ni firmas de relleno: los textos van firmados por la redacción del sitio y cada
        afirmación sobre estudios o datos enlaza a su fuente original.
      </p>
      <p>
        El contenido se investiga y se redacta con ayuda de herramientas de inteligencia artificial, se contrasta con
        las fuentes citadas y se publica bajo la responsabilidad del editor del sitio, que corrige los errores que se
        detecten. El método completo está en <Link href="/como-trabajamos">cómo trabajamos</Link>.
      </p>

      <h2>Qué no es</h2>
      <ul>
        <li>No es asesoramiento médico, psicológico, financiero ni legal. Las metas de salud y de dinero son ejemplos generales.</li>
        <li>No es un curso ni un método con nombre propio. No vendemos formación.</li>
        <li>No es una aplicación con cuenta: tus metas se guardan solo en tu navegador, si tú lo decides.</li>
      </ul>

      <h2>Cómo se financia</h2>
      <p>
        El sitio es gratuito. Está preparado para sostenerse con tres fuentes, todas identificadas como lo que son:
        enlaces de afiliados a libros y material relacionado, publicidad y patrocinios señalados. A día de hoy no
        muestra anuncios. Los detalles están en <Link href="/afiliados">enlaces de afiliados</Link> y en{" "}
        <Link href="/publicidad">publicidad y patrocinio</Link>. Ninguna de estas fuentes decide qué metas entran en el
        banco ni qué dicen las guías.
      </p>

      <h2>Contacto</h2>
      <p>
        Si encuentras un error, quieres proponer una meta para el banco o tienes una pregunta, escribe a través de la
        página de <Link href="/contacto">contacto</Link>.
      </p>
    </PaginaTexto>
  );
}
