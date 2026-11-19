import type { Metadata } from "next";
import Link from "next/link";
import { PaginaTexto } from "@/components/PaginaTexto";
import { pageMeta } from "@/lib/seo";
import { site } from "@/site.config";

const RUTA = "/como-trabajamos";

export const metadata: Metadata = pageMeta({
  title: "Cómo trabajamos: criterios y fuentes",
  description:
    "Los criterios con los que elegimos las metas del banco, cómo verificamos lo que dicen las guías, el papel de la inteligencia artificial y cómo avisar de un error.",
  path: RUTA,
});

export default function Page() {
  return (
    <PaginaTexto
      titulo="Cómo trabajamos"
      entradilla="Los criterios del banco de metas, las fuentes de las guías, cómo hacemos recomendaciones y qué hacer si ves un error."
      ruta={RUTA}
      miga="Cómo trabajamos"
      actualizado="2026-11-19"
    >
      <h2>Cómo se elige una meta para el banco</h2>
      <p>Una meta entra en el banco si cumple cuatro condiciones:</p>
      <ol>
        <li>
          <strong>Se puede medir.</strong> Tiene una cantidad, una unidad y un plazo, de modo que la calculadora pueda
          repartirla y se sepa cuándo está cumplida.
        </li>
        <li>
          <strong>Depende sobre todo de quien la fija.</strong> Preferimos contar lo que haces (sesiones, páginas,
          llamadas) antes que resultados que dependen de otras personas o de la suerte.
        </li>
        <li>
          <strong>No requiere a un profesional.</strong> No incluimos metas de peso, dietas, medicación ni inversiones.
          Las metas de salud cuentan conductas generales y las de dinero son aritmética de ahorro.
        </li>
        <li>
          <strong>Sirve como punto de partida.</strong> Las cifras son ejemplos razonables para alguien que empieza, no
          recomendaciones personales. Están para cambiarlas.
        </li>
      </ol>

      <h2>Cómo se escriben las guías</h2>
      <ul>
        <li>
          <strong>Fuentes originales.</strong> Cuando una guía menciona un estudio, enlaza al artículo original o a la
          página de su editorial, normalmente mediante su DOI, y dice en una frase qué midió. No citamos cifras de
          memoria ni «estudios» que no hemos podido localizar.
        </li>
        <li>
          <strong>Mitos señalados como tales.</strong> Si una afirmación popular no tiene respaldo, lo decimos y
          enlazamos a quien lo comprobó.
        </li>
        <li>
          <strong>Sin experiencia fingida.</strong> No decimos «lo hemos probado» de nada que no se haya probado, no
          inventamos autores ni testimonios y no publicamos valoraciones con estrellas.
        </li>
        <li>
          <strong>Fecha a la vista.</strong> Cada guía muestra cuándo se actualizó por última vez.
        </li>
      </ul>

      <h2>Cómo se hacen los cálculos</h2>
      <p>
        Todas las fórmulas de la calculadora están publicadas en{" "}
        <Link href="/calculadora#como-funciona">cómo funciona</Link>, y los ejemplos resueltos de esa página son también
        pruebas automáticas del código: si el cálculo cambiara, las pruebas fallarían antes de publicarse. La
        calculadora no modela intereses, rentabilidades ni nada que no sea una división.
      </p>

      <h2>El papel de la inteligencia artificial</h2>
      <p>
        El contenido de {site.name} se investiga y se redacta con ayuda de herramientas de inteligencia artificial. Eso
        no cambia las reglas anteriores: cada dato se contrasta con su fuente antes de publicarse y el editor del sitio
        es responsable de lo que aparece en él. Si algo es incorrecto, queremos saberlo.
      </p>

      <h2>Cómo hacemos recomendaciones</h2>
      <p>
        Algunas guías enlazan a libros o productos. Las recomendaciones se basan en criterios que se explican en el
        texto (por ejemplo, que un libro sea la fuente original de un método) y en información pública del producto, no
        en pruebas propias. Preferimos enlazar a una búsqueda o categoría de la tienda antes que a un artículo concreto
        cuyo precio o disponibilidad no podemos garantizar, y nunca publicamos precios. Que un enlace sea de afiliado no
        cambia lo que se recomienda; lo explicamos en <Link href="/afiliados">enlaces de afiliados</Link>.
      </p>

      <h2>Correcciones</h2>
      <p>
        Si ves un error en una cifra, una cita o un cálculo, escríbenos desde la página de{" "}
        <Link href="/contacto">contacto</Link> indicando la página y, si puedes, la fuente correcta. Corregimos el texto
        y actualizamos la fecha de la página.
      </p>
    </PaginaTexto>
  );
}
