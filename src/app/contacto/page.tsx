import type { Metadata } from "next";
import Link from "next/link";
import { PaginaTexto } from "@/components/PaginaTexto";
import { pageMeta } from "@/lib/seo";
import { site } from "@/site.config";

const RUTA = "/contacto";

export const metadata: Metadata = pageMeta({
  title: "Contacto",
  description:
    "Cómo escribir a Mil Metas para avisar de un error, proponer una meta para el banco, sugerir una guía o preguntar por publicidad y patrocinio.",
  path: RUTA,
});

export default function Page() {
  const correo = site.contactEmail;
  return (
    <PaginaTexto
      titulo="Contacto"
      entradilla="Para avisar de un error, proponer una meta o preguntar por patrocinios."
      ruta={RUTA}
      miga="Contacto"
      actualizado="2026-11-19"
    >
      <p>
        Escríbenos a{" "}
        <a href={`mailto:${correo}`} className="font-semibold">
          {correo}
        </a>
        . Leemos todos los mensajes, aunque no siempre podemos responder a cada uno. Si escribes por un error,
        nos ayuda mucho que el asunto del correo diga en qué página está.
      </p>

      <h2>Qué nos ayuda recibir</h2>
      <ul>
        <li>
          <strong>Errores.</strong> Una cifra que no cuadra, una cita mal atribuida, un enlace roto o un cálculo de la
          calculadora que no te sale. Indica la página y, si la tienes, la fuente correcta. Cómo los tratamos está en{" "}
          <Link href="/como-trabajamos">cómo trabajamos</Link>.
        </li>
        <li>
          <strong>Metas para el banco.</strong> Si echas en falta una meta o un área entera, cuéntanoslo. Las propuestas
          que mejor encajan tienen una cifra, una unidad y un plazo.
        </li>
        <li>
          <strong>Preguntas que una guía debería responder.</strong> Las dudas reales de quien está fijando metas son la
          mejor fuente de temas.
        </li>
        <li>
          <strong>Patrocinio y publicidad.</strong> Antes de escribir, mira qué ofrecemos y qué no en{" "}
          <Link href="/publicidad">publicidad y patrocinio</Link>.
        </li>
      </ul>

      <h2>Qué no podemos hacer</h2>
      <p>
        No ofrecemos orientación personal sobre salud, dinero, estudios o carrera, ni revisamos metas individuales. Para
        eso, la persona adecuada es un profesional que conozca tu situación. Tampoco aceptamos artículos de invitados a
        cambio de enlaces, ni vendemos enlaces sin etiquetar.
      </p>

      <h2>Tus datos</h2>
      <p>
        Si nos escribes, usaremos tu dirección solo para responderte. Más detalles en la{" "}
        <Link href="/privacidad">política de privacidad</Link>.
      </p>
    </PaginaTexto>
  );
}
