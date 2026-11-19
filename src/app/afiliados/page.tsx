import type { Metadata } from "next";
import Link from "next/link";
import { PaginaTexto } from "@/components/PaginaTexto";
import { afiliados } from "@/data/affiliates";
import { pageMeta } from "@/lib/seo";
import { site } from "@/site.config";

const RUTA = "/afiliados";

export const metadata: Metadata = pageMeta({
  title: "Enlaces de afiliados: cómo funcionan",
  description:
    "Qué enlaces de Mil Metas son de afiliados, con qué programas, cómo se señalan y por qué no cambian lo que recomendamos ni lo que pagas.",
  path: RUTA,
});

export default function Page() {
  const comercios = [...new Set(Object.values(afiliados).map((a) => a.comercio))];
  const amazonActivo = Boolean(site.monetization.amazonTag);
  return (
    <PaginaTexto
      titulo="Enlaces de afiliados"
      entradilla="Algunos enlaces a tiendas pueden generar una comisión para el sitio. Aquí explicamos cuáles, cómo se señalan y qué no cambia."
      ruta={RUTA}
      miga="Enlaces de afiliados"
      actualizado="2026-11-19"
    >
      <h2>Qué es un enlace de afiliado</h2>
      <p>
        Es un enlace a una tienda que incluye un identificador de {site.name}. Si compras después de hacer clic, la
        tienda puede pagarnos una pequeña comisión. Tú pagas lo mismo que si hubieras llegado por tu cuenta.
      </p>

      <h2>Con qué programas</h2>
      <p>
        Los enlaces comerciales del sitio apuntan hoy a: {comercios.join(", ")}. Están preparados para el Programa de
        Afiliados de Amazon.
      </p>
      {amazonActivo ? (
        <>
          <p>{site.name} participa en ese programa, que pide mostrar esta declaración:</p>
          <blockquote>
            <p>
              En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos
              aplicables.
            </p>
          </blockquote>
        </>
      ) : (
        <p>
          A día de hoy {site.name} todavía no participa en ese programa: los enlaces son enlaces normales y no generan
          ninguna comisión. Cuando el programa apruebe el sitio, esta página lo dirá y mostrará la declaración que
          Amazon exige a sus afiliados. Los enlaces se señalan igual desde el primer día.
        </p>
      )}

      <h2>Cómo los reconoces</h2>
      <ul>
        <li>Las páginas que contienen enlaces comerciales muestran un aviso antes del primero.</li>
        <li>
          Todos los enlaces comerciales se abren en una pestaña nueva y están marcados técnicamente como patrocinados
          (<code>rel=&quot;sponsored nofollow&quot;</code>), que es lo que piden los buscadores.
        </li>
        <li>No hay enlaces comerciales ocultos ni disfrazados de otra cosa.</li>
      </ul>

      <h2>Qué no cambia</h2>
      <ul>
        <li>
          <strong>Lo que recomendamos.</strong> Un libro aparece en una guía porque es la fuente del método que se
          explica, no porque pague más. Los criterios están en <Link href="/como-trabajamos">cómo trabajamos</Link>.
        </li>
        <li>
          <strong>Lo que pagas.</strong> La comisión sale del margen de la tienda.
        </li>
        <li>
          <strong>Lo que decimos de un producto.</strong> No publicamos precios ni disponibilidad, que cambian, ni
          valoraciones inventadas. No decimos haber probado nada que no se haya probado.
        </li>
      </ul>

      <h2>Publicidad y patrocinios</h2>
      <p>
        Los anuncios y los contenidos patrocinados, cuando los haya, irán siempre etiquetados. Las condiciones están en{" "}
        <Link href="/publicidad">publicidad y patrocinio</Link>.
      </p>
    </PaginaTexto>
  );
}
