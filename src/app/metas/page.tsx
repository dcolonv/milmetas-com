import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { BancoFiltro } from "@/components/banco/BancoFiltro";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Contenedor, Encabezado, Tarjeta } from "@/components/ui";
import { areas } from "@/data/areas";
import { horizontes, metas, totalMetas } from "@/data/metas";
import { listarMeta } from "@/lib/banco";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl } from "@/site.config";

const RUTA = "/metas";
const DESCRIPCION = `${totalMetas} ejemplos de metas medibles, ordenados por área de vida y por plazo. Filtra, elige una y ábrela en la calculadora para saber cuánto toca por semana.`;

export const metadata: Metadata = pageMeta({
  title: `Banco de metas: ${totalMetas} ejemplos por área y plazo`,
  description: DESCRIPCION,
  path: RUTA,
});

export default function Page() {
  const listadas = metas.map(listarMeta);
  return (
    <Contenedor>
      <Encabezado
        titulo={`Banco de metas: ${totalMetas} ejemplos medibles por área y plazo`}
        entradilla="Todas tienen una cifra y un plazo, que es lo que permite repartirlas y saber cuándo están cumplidas. Filtra por área o por plazo, y pulsa «Planificar» para abrir cualquiera en la calculadora con sus números."
      >
        <Breadcrumbs migas={[{ nombre: "Banco de metas", ruta: RUTA }]} />
      </Encabezado>

      <BancoFiltro
        metas={listadas}
        areas={areas.map((a) => ({ slug: a.slug, nombre: a.nombre }))}
        horizontes={horizontes.map((h) => ({ slug: h.slug, nombre: h.nombre }))}
      />

      <AdSlot name="bank-end" />

      <section aria-labelledby="areas" className="mt-14">
        <h2 id="areas" className="text-2xl font-bold sm:text-3xl">
          Las {areas.length} áreas, una a una
        </h2>
        <p className="mt-2 max-w-2xl text-muted">
          Cada área tiene su propia página, con las metas agrupadas por plazo y consejos para fijarlas bien.
        </p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <li key={a.slug}>
              <Tarjeta href={`/metas/${a.slug}`} titulo={a.titulo} texto={a.resumen} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="uso" className="prosa mt-14">
        <h2 id="uso">Cómo usar el banco</h2>
        <p>
          Estas metas son ejemplos, no recetas. Las cifras son puntos de partida razonables para alguien que empieza, y
          lo normal es cambiarlas: al pulsar «Planificar» se abre la calculadora con los números de la meta y puedes
          ajustar la cantidad, la unidad y la fecha a tu caso. Debajo de cada meta verás el ritmo aproximado que
          implica, para que sepas de un vistazo si cabe en tu semana.
        </p>
        <p>Los plazos siguen una convención sencilla:</p>
        <ul>
          <li>
            <strong>Corto plazo</strong>: hasta tres meses. Sirven para probar si una meta te importa de verdad.
          </li>
          <li>
            <strong>Mediano plazo</strong>: de tres meses a un año. El terreno de los propósitos anuales.
          </li>
          <li>
            <strong>Largo plazo</strong>: más de un año. Necesitan hitos intermedios para no perderse de vista.
          </li>
        </ul>
        <p>
          Si quieres escribir la tuya desde cero, la guía{" "}
          <Link href="/guias/como-escribir-una-meta-smart">cómo escribir una meta SMART</Link> explica el método, y{" "}
          <Link href="/guias/metas-a-corto-mediano-y-largo-plazo">metas a corto, mediano y largo plazo</Link> cómo
          encadenar unas con otras.
        </p>
        <h2>¿Por qué {totalMetas} y no mil?</h2>
        <p>
          Porque es el número que hay. El banco crece por tandas y cada meta se revisa antes de entrar: tiene que poder
          medirse, depender sobre todo de quien la fija y no prometer nada en salud o dinero que requiera a un
          profesional. No incluimos metas de peso, dietas ni inversiones.
        </p>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Banco de metas por áreas",
          numberOfItems: areas.length,
          itemListElement: areas.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: a.titulo,
            url: absoluteUrl(`/metas/${a.slug}`),
          })),
        }}
      />
    </Contenedor>
  );
}
