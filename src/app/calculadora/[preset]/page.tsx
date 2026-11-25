import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EjemploResuelto } from "@/components/calculadora/EjemploResuelto";
import { PaginaCalculadora } from "@/components/calculadora/PaginaCalculadora";
import { areaPorSlug } from "@/data/areas";
import { guiaPorSlug } from "@/data/guias";
import { presetPorSlug, presets } from "@/data/presets";
import { pageMeta } from "@/lib/seo";

// Every valid slug is prerendered from generateStaticParams. Anything else has
// to wait for the server so it can answer with a real 404, so this route is
// deliberately not validated for instant navigation.
export const instant = false;

export function generateStaticParams() {
  return presets.map((p) => ({ preset: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/calculadora/[preset]">): Promise<Metadata> {
  const { preset } = await params;
  const p = presetPorSlug.get(preset);
  if (!p) return {};
  return pageMeta({ title: p.tituloSeo, description: p.descripcion, path: `/calculadora/${p.slug}` });
}

export default async function Page({ params }: PageProps<"/calculadora/[preset]">) {
  const { preset } = await params;
  const p = presetPorSlug.get(preset);
  if (!p) notFound();

  const ruta = `/calculadora/${p.slug}`;
  const area = areaPorSlug.get(p.area);
  const guia = guiaPorSlug.get(p.guia);

  return (
    <PaginaCalculadora
      ruta={ruta}
      migas={[
        { nombre: "Calculadora de metas", ruta: "/calculadora" },
        { nombre: p.nombre, ruta },
      ]}
      titulo={p.titulo}
      entradilla={p.entradilla}
      descripcion={p.descripcion}
      pre={p.pre}
      preguntas={p.faq}
      actualizado={p.actualizado}
    >
      {p.secciones.map((s) => (
        <section key={s.titulo} className="prosa">
          <h2>{s.titulo}</h2>
          {s.parrafos.map((texto) => (
            <p key={texto}>{texto}</p>
          ))}
        </section>
      ))}

      <section aria-labelledby="ejemplo">
        <h2 id="ejemplo" className="text-2xl font-bold">
          Un ejemplo resuelto
        </h2>
        <div className="mt-4 max-w-2xl">
          <EjemploResuelto ejemplo={p.ejemplo} ruta={ruta} />
        </div>
      </section>

      <section aria-labelledby="sigue" className="prosa">
        <h2 id="sigue">Sigue por aquí</h2>
        <ul>
          {area ? (
            <li>
              <Link href={`/metas/${area.slug}`}>{area.titulo}</Link>: ideas que puedes abrir en esta calculadora.
            </li>
          ) : null}
          {guia ? (
            <li>
              <Link href={`/guias/${guia.slug}`}>{guia.titulo}</Link>
            </li>
          ) : null}
          <li>
            <Link href="/calculadora#como-funciona">Cómo funciona la calculadora</Link>: todas las fórmulas, una por una.
          </li>
        </ul>
      </section>
    </PaginaCalculadora>
  );
}
