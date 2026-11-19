import type { Metadata } from "next";
import Link from "next/link";
import { PaginaTexto } from "@/components/PaginaTexto";
import { pageMeta } from "@/lib/seo";
import { site } from "@/site.config";

const RUTA = "/terminos";

export const metadata: Metadata = pageMeta({
  title: "Términos de uso",
  description:
    "Condiciones de uso de Mil Metas: el contenido es informativo, la calculadora hace aritmética y no asesora, y qué puedes hacer con los textos y la herramienta.",
  path: RUTA,
});

export default function Page() {
  return (
    <PaginaTexto
      titulo="Términos de uso"
      entradilla="Las condiciones para usar el sitio, en lenguaje llano."
      ruta={RUTA}
      miga="Términos de uso"
      actualizado="2026-11-19"
    >
      <h2>Qué es este sitio</h2>
      <p>
        {site.name} ({site.domain}) ofrece una calculadora, un banco de metas de ejemplo y guías sobre cómo fijar metas.
        El acceso es gratuito y no requiere registro. Al usar el sitio aceptas estos términos.
      </p>

      <h2>El contenido es informativo</h2>
      <p>
        Todo lo que publicamos tiene carácter general e informativo. No es consejo médico, psicológico, financiero,
        legal ni académico, y no sustituye a un profesional que conozca tu situación. En particular:
      </p>
      <ul>
        <li>
          Las metas de salud y actividad física son ejemplos generales. Consulta con un profesional sanitario antes de
          cambiar tu actividad si tienes alguna condición de salud.
        </li>
        <li>
          Las metas de dinero y la calculadora de ahorro hacen aritmética simple. No tienen en cuenta intereses,
          impuestos, inflación ni tu situación personal, y no recomiendan productos financieros.
        </li>
      </ul>

      <h2>La calculadora</h2>
      <p>
        La calculadora reparte una cantidad entre unas fechas con las fórmulas publicadas en{" "}
        <Link href="/calculadora#como-funciona">cómo funciona</Link>. Hacemos lo posible por que sea correcta y la
        probamos de forma automática, pero se ofrece tal cual, sin garantía de que esté libre de errores o de que sea
        adecuada para una decisión concreta. Comprueba por tu cuenta cualquier cifra de la que dependa algo importante.
      </p>
      <p>
        Las metas que guardas se almacenan solo en tu navegador. Si borras los datos del navegador o cambias de
        dispositivo, se pierden; no podemos recuperarlas.
      </p>

      <h2>Uso de los contenidos</h2>
      <p>
        Los textos, el diseño y el código del sitio pertenecen a su editor. Puedes enlazar a cualquier página, citar
        fragmentos breves indicando la fuente con un enlace y usar la calculadora en clase, en talleres o en tu
        trabajo. No está permitido copiar las guías o el banco de metas completos para publicarlos en otro lugar, ni
        extraer el contenido de forma masiva.
      </p>

      <h2>Enlaces externos y de afiliados</h2>
      <p>
        El sitio enlaza a fuentes, tiendas y servicios de terceros. No somos responsables de su contenido, sus precios
        ni sus condiciones. Algunos de esos enlaces son de afiliados, como se explica en{" "}
        <Link href="/afiliados">enlaces de afiliados</Link>.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        En la medida en que la ley lo permita, el editor no responde de los daños derivados del uso del sitio o de
        decisiones tomadas a partir de su contenido. Nada en estos términos limita los derechos que la legislación de
        consumo de tu país te reconozca.
      </p>

      <h2>Cambios y contacto</h2>
      <p>
        Podemos actualizar estos términos; la fecha de esta página indica la última revisión. Para cualquier duda,
        escribe desde la página de <Link href="/contacto">contacto</Link>. El tratamiento de datos se describe en la{" "}
        <Link href="/privacidad">política de privacidad</Link>.
      </p>
    </PaginaTexto>
  );
}
