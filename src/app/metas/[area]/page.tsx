import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { MetaFila } from "@/components/banco/MetaFila";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { SponsorSlot } from "@/components/SponsorSlot";
import { Actualizado, BotonEnlace, Contenedor, Encabezado } from "@/components/ui";
import { areaPorSlug, areas } from "@/data/areas";
import { guiaPorSlug } from "@/data/guias";
import { horizontes, metasDeArea } from "@/data/metas";
import { listarMeta } from "@/lib/banco";
import { formatearFecha } from "@/lib/fechas";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl } from "@/site.config";

// Every valid slug is prerendered from generateStaticParams. Anything else has
// to wait for the server so it can answer with a real 404, so this route is
// deliberately not validated for instant navigation.
export const instant = false;

export function generateStaticParams() {
  return areas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/metas/[area]">): Promise<Metadata> {
  const { area } = await params;
  const a = areaPorSlug.get(area);
  if (!a) return {};
  return pageMeta({ title: a.tituloSeo, description: a.descripcion, path: `/metas/${a.slug}` });
}

export default async function Page({ params }: PageProps<"/metas/[area]">) {
  const { area } = await params;
  const a = areaPorSlug.get(area);
  if (!a) notFound();

  const ruta = `/metas/${a.slug}`;
  const lista = metasDeArea(a.slug).map(listarMeta);
  const relacionadas = a.guias.flatMap((slug) => {
    const g = guiaPorSlug.get(slug);
    return g ? [g] : [];
  });

  return (
    <Contenedor>
      <Encabezado titulo={a.titulo}>
        <Breadcrumbs
          migas={[
            { nombre: "Banco de metas", ruta: "/metas" },
            { nombre: a.nombre, ruta },
          ]}
        />
      </Encabezado>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <div className="prosa">
            {a.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {a.aviso ? (
              <aside className="rounded-xl border border-wait/30 bg-wait-soft px-4 py-3 text-[0.98rem] text-ink">
                <strong>Importante:</strong> {a.aviso}
              </aside>
            ) : null}
          </div>

          <div className="mt-6">
            <SponsorSlot slot={a.slug} />
          </div>

          {horizontes.map((h) => {
            const grupo = lista.filter((m) => m.horizonte === h.slug);
            if (grupo.length === 0) return null;
            return (
              <section key={h.slug} aria-labelledby={`plazo-${h.slug}`} className="mt-10">
                <h2 id={`plazo-${h.slug}`} className="text-2xl font-bold">
                  {h.nombre}{" "}
                  <span className="text-base font-normal text-muted">
                    ({h.rango} · {grupo.length} metas)
                  </span>
                </h2>
                <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-surface">
                  {grupo.map((m) => (
                    <MetaFila key={m.id} meta={m} />
                  ))}
                </ul>
              </section>
            );
          })}

          <AdSlot name="bank-end" />

          <section aria-labelledby="consejos" className="mt-12">
            <h2 id="consejos" className="text-2xl font-bold">
              Cómo fijar metas en esta área
            </h2>
            <ol className="mt-4 grid gap-4 md:grid-cols-3">
              {a.consejos.map((c) => (
                <li key={c.titulo} className="rounded-2xl border border-line bg-surface p-5">
                  <h3 className="text-lg font-bold">{c.titulo}</h3>
                  <p className="mt-1.5 text-[0.98rem] text-muted">{c.texto}</p>
                </li>
              ))}
            </ol>
            <p className="mt-5 max-w-2xl text-[0.98rem] text-muted">
              Las cifras de estas metas son ejemplos para empezar. Cámbialas por las tuyas en la calculadora.
            </p>
            <div className="mt-4">
              <BotonEnlace href={a.calculadora}>Planificar mi propia meta</BotonEnlace>
            </div>
          </section>

          <div className="mt-8">
            <Actualizado fecha={a.actualizado} texto={formatearFecha(a.actualizado)} />
          </div>
        </div>

        <aside className="h-fit space-y-6 rounded-2xl border border-line bg-surface p-5">
          <div>
            <h2 className="text-lg font-bold">Guías relacionadas</h2>
            <ul className="mt-2 space-y-2">
              {relacionadas.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guias/${g.slug}`} className="enlace">
                    {g.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold">Otras áreas</h2>
            <ul className="mt-2 space-y-1">
              {areas
                .filter((o) => o.slug !== a.slug)
                .map((o) => (
                  <li key={o.slug}>
                    <Link href={`/metas/${o.slug}`} className="enlace inline-block py-1">
                      {o.nombre}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: a.titulo,
          url: absoluteUrl(ruta),
          numberOfItems: lista.length,
          itemListElement: lista.map((m, i) => ({ "@type": "ListItem", position: i + 1, name: m.texto })),
        }}
      />
    </Contenedor>
  );
}
