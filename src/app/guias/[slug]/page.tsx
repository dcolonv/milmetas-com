import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclosure } from "@/components/Disclosure";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { BotonEnlace, Contenedor, Tarjeta } from "@/components/ui";
import { guiaPorSlug, guias } from "@/data/guias";
import { formatearFecha } from "@/lib/fechas";
import { cargadores } from "@/lib/guias";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl, site } from "@/site.config";

// Every valid slug is prerendered from generateStaticParams. Anything else has
// to wait for the server so it can answer with a real 404, so this route is
// deliberately not validated for instant navigation.
export const instant = false;

export function generateStaticParams() {
  return guias.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guias/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = guiaPorSlug.get(slug);
  if (!g) return {};
  return pageMeta({
    title: g.tituloSeo,
    description: g.descripcion,
    path: `/guias/${g.slug}`,
    type: "article",
    publishedTime: g.publicado,
    modifiedTime: g.actualizado,
  });
}

export default async function Page({ params }: PageProps<"/guias/[slug]">) {
  const { slug } = await params;
  const g = guiaPorSlug.get(slug);
  const cargar = cargadores[slug];
  if (!g || !cargar) notFound();

  const { default: Contenido } = await cargar();
  const ruta = `/guias/${g.slug}`;
  const relacionadas = g.relacionadas.flatMap((s) => {
    const r = guiaPorSlug.get(s);
    return r ? [r] : [];
  });

  return (
    <Contenedor>
      <article>
        <header className="pb-6 pt-6 sm:pt-8">
          <Breadcrumbs
            migas={[
              { nombre: "Guías", ruta: "/guias" },
              { nombre: g.tituloSeo, ruta },
            ]}
          />
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold sm:text-[2.5rem]">{g.titulo}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">{g.resumen}</p>
          <p className="mt-3 text-sm text-muted">
            Por la redacción de {site.name} · Actualizado el{" "}
            <time dateTime={g.actualizado}>{formatearFecha(g.actualizado)}</time> ·{" "}
            <Link href="/como-trabajamos" className="underline underline-offset-2 hover:text-meta-dark">
              Cómo trabajamos
            </Link>
          </p>
        </header>

        {g.afiliados.length > 0 ? (
          <div className="mb-6 max-w-[44rem]">
            <Disclosure />
          </div>
        ) : null}

        <div className="prosa">
          <Contenido />
        </div>
      </article>

      <AdSlot name="guide-end" />

      <aside aria-labelledby="practica" className="mt-12 max-w-[44rem] rounded-2xl border border-line bg-surface p-6">
        <h2 id="practica" className="text-xl font-bold">
          Ponlo en números
        </h2>
        <p className="mt-1 text-muted">
          Escribe tu meta en la calculadora y sabrás cuánto toca por semana y si vas a tiempo. Si aún no la tienes,
          el banco reúne ejemplos medibles por área.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <BotonEnlace href="/calculadora">Abrir la calculadora</BotonEnlace>
          <BotonEnlace href="/metas" variante="secundario">
            Ver el banco de metas
          </BotonEnlace>
        </div>
      </aside>

      <section aria-labelledby="relacionadas" className="mt-12">
        <h2 id="relacionadas" className="text-2xl font-bold">
          Sigue leyendo
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relacionadas.map((r) => (
            <li key={r.slug}>
              <Tarjeta href={`/guias/${r.slug}`} titulo={r.titulo} texto={r.resumen} />
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 max-w-[44rem]">
        <NewsletterSignup />
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.titulo,
          description: g.descripcion,
          inLanguage: site.lang,
          datePublished: g.publicado,
          dateModified: g.actualizado,
          mainEntityOfPage: absoluteUrl(ruta),
          image: absoluteUrl("/opengraph-image"),
          author: { "@type": "Organization", name: site.publisherName || site.name, url: absoluteUrl("/acerca") },
          publisher: { "@type": "Organization", name: site.publisherName || site.name, url: site.url },
        }}
      />
    </Contenedor>
  );
}
