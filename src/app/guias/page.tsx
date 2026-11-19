import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { BotonEnlace, Contenedor, Encabezado, Tarjeta } from "@/components/ui";
import { grupos, guias } from "@/data/guias";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl } from "@/site.config";

const RUTA = "/guias";
const DESCRIPCION =
  "Guías para fijar metas con método: cómo escribirlas, repartirlas en el tiempo y seguirlas, con las fuentes de cada afirmación y sin promesas milagrosas.";

export const metadata: Metadata = pageMeta({
  title: "Guías para fijar y cumplir metas",
  description: DESCRIPCION,
  path: RUTA,
});

export default function Page() {
  return (
    <Contenedor>
      <Encabezado
        titulo="Guías para fijar y cumplir metas"
        entradilla="Cómo se escribe una meta, cómo se reparte y cómo se sigue. Cada guía responde a una pregunta concreta, cita sus fuentes y termina en algo que puedes hacer hoy."
      >
        <Breadcrumbs migas={[{ nombre: "Guías", ruta: RUTA }]} />
      </Encabezado>

      {grupos.map((grupo) => {
        const lista = guias.filter((g) => g.grupo === grupo.slug);
        return (
          <section key={grupo.slug} aria-labelledby={`grupo-${grupo.slug}`} className="mb-12">
            <h2 id={`grupo-${grupo.slug}`} className="text-2xl font-bold sm:text-3xl">
              {grupo.nombre}
            </h2>
            <p className="mt-1 max-w-2xl text-muted">{grupo.descripcion}</p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lista.map((g) => (
                <li key={g.slug}>
                  <Tarjeta href={`/guias/${g.slug}`} titulo={g.titulo} texto={g.resumen} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section aria-labelledby="practica" className="rounded-2xl border border-line bg-surface p-6">
        <h2 id="practica" className="text-xl font-bold">
          De la teoría a los números
        </h2>
        <p className="mt-1 max-w-2xl text-muted">
          Cuando tengas la meta escrita, la calculadora la convierte en un ritmo por semana y te dice si vas a tiempo. Y
          si aún no sabes qué meta ponerte, el banco tiene ejemplos por área.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <BotonEnlace href="/calculadora">Abrir la calculadora</BotonEnlace>
          <BotonEnlace href="/metas" variante="secundario">
            Ver el banco de metas
          </BotonEnlace>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Guías de Mil Metas",
          numberOfItems: guias.length,
          itemListElement: guias.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: g.titulo,
            url: absoluteUrl(`/guias/${g.slug}`),
          })),
        }}
      />
    </Contenedor>
  );
}
