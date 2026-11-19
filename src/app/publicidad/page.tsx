import type { Metadata } from "next";
import Link from "next/link";
import { PaginaTexto } from "@/components/PaginaTexto";
import { areas } from "@/data/areas";
import { guias } from "@/data/guias";
import { totalMetas } from "@/data/metas";
import { pageMeta } from "@/lib/seo";
import { site } from "@/site.config";

const RUTA = "/publicidad";

export const metadata: Metadata = pageMeta({
  title: "Publicidad y patrocinio",
  description:
    "Cómo patrocinar Mil Metas: a quién llega el sitio, qué espacios señalados ofrecemos en la calculadora, el banco y las guías, y qué no aceptamos.",
  path: RUTA,
});

export default function Page() {
  const correo = site.contactEmail;
  return (
    <PaginaTexto
      titulo="Publicidad y patrocinio"
      entradilla="Espacios señalados para marcas que ayudan a la gente a cumplir lo que se propone."
      ruta={RUTA}
      miga="Publicidad"
      actualizado="2026-11-19"
    >
      <h2>A quién llega el sitio</h2>
      <p>
        {site.name} está escrito para hispanohablantes que están fijando metas personales, de estudio o de trabajo:
        quien prepara sus propósitos de año, estudiantes que organizan un curso o una oposición, profesionales que
        redactan objetivos para su evaluación y personas que ahorran para algo concreto. Llegan buscando ejemplos de
        metas o una forma de calcular su ritmo, y se quedan a usar la calculadora.
      </p>
      <p>
        El sitio es nuevo y no publicamos cifras de audiencia que todavía no tenemos. Si te interesa un patrocinio, te
        enviaremos los datos reales de visitas del periodo más reciente.
      </p>

      <h2>Qué ofrecemos</h2>
      <ul>
        <li>
          <strong>Patrocinio de un área del banco.</strong> Una línea «Con el apoyo de» con tu marca y un enlace en una
          de las {areas.length} áreas del <Link href="/metas">banco de metas</Link> ({totalMetas} metas en total). Por
          ejemplo, una aplicación de idiomas en el área de idiomas.
        </li>
        <li>
          <strong>Patrocinio de la calculadora.</strong> La misma línea bajo el resultado de la{" "}
          <Link href="/calculadora">calculadora de metas</Link>, la página que más se usa.
        </li>
        <li>
          <strong>Guía patrocinada.</strong> Un artículo útil por sí mismo, escrito con los criterios de{" "}
          <Link href="/como-trabajamos">cómo trabajamos</Link> y etiquetado como patrocinado desde el título. Hoy hay{" "}
          {guias.length} guías publicadas, ninguna patrocinada.
        </li>
      </ul>

      <h2>Las reglas</h2>
      <ul>
        <li>Todo espacio pagado lleva la etiqueta «Patrocinado» y su enlace se marca como tal para los buscadores.</li>
        <li>
          No vendemos enlaces sin etiquetar, intercambios de enlaces ni artículos de invitados a cambio de enlaces. Es
          una práctica que los buscadores penalizan y que no ayuda a nadie.
        </li>
        <li>El patrocinador no decide qué metas entran en el banco ni qué concluye una guía.</li>
        <li>
          No aceptamos patrocinios de apuestas, productos milagro, préstamos rápidos, inversiones de alto riesgo ni
          nada que prometa resultados sin esfuerzo.
        </li>
      </ul>

      <h2>Encajan bien</h2>
      <p>
        Aplicaciones de hábitos y productividad, agendas y papelería, plataformas de cursos e idiomas, lectores y
        servicios de lectura, material de estudio y herramientas de finanzas personales sin productos de riesgo.
      </p>

      <h2>Contacto</h2>
      <p>
        Escribe a <a href={`mailto:${correo}`}>{correo}</a> con el asunto «Patrocinio», contando qué ofrece tu marca y
        qué espacio te interesa.
      </p>
    </PaginaTexto>
  );
}
