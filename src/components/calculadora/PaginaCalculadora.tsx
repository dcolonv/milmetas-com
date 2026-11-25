import Link from "next/link";
import type { ReactNode } from "react";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs, type Miga } from "@/components/Breadcrumbs";
import { Faq, type Pregunta } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SponsorSlot } from "@/components/SponsorSlot";
import { Actualizado, Contenedor, Encabezado } from "@/components/ui";
import { presets } from "@/data/presets";
import type { Predeterminados } from "@/lib/enlace";
import { formatearFecha } from "@/lib/fechas";
import { organizationLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/site.config";
import { CalculadoraDeMetas } from "./index";

/**
 * The frame shared by the main calculator and the calculators by kind of goal:
 * heading, the tool, the ad and sponsor slots, the page's own sections, the
 * questions, the date of the last change, and the links between calculators.
 */
export function PaginaCalculadora({
  ruta,
  migas,
  titulo,
  entradilla,
  descripcion,
  pre,
  preguntas,
  actualizado,
  children,
}: {
  ruta: string;
  migas: Miga[];
  titulo: string;
  entradilla: string;
  descripcion: string;
  pre: Predeterminados;
  preguntas: Pregunta[];
  /** Date of the page's last real change, "YYYY-MM-DD". Shown on the page and sent as dateModified. */
  actualizado: string;
  children: ReactNode;
}) {
  const otras = [
    { href: "/calculadora", nombre: "Calculadora de metas (cualquier meta)" },
    ...presets.map((p) => ({ href: `/calculadora/${p.slug}`, nombre: p.nombre })),
  ].filter((o) => o.href !== ruta);

  return (
    <Contenedor>
      <Encabezado titulo={titulo} entradilla={entradilla}>
        <Breadcrumbs migas={migas} />
      </Encabezado>

      <CalculadoraDeMetas pre={pre} />

      <div className="mt-6">
        <SponsorSlot slot="calculadora" />
      </div>
      <AdSlot name="calc-result" />

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-12">
          {children}
          <Faq preguntas={preguntas} />
          <Actualizado fecha={actualizado} texto={formatearFecha(actualizado)} />
        </div>
        <aside aria-labelledby="otras-calculadoras" className="h-fit rounded-2xl border border-line bg-surface p-5">
          <h2 id="otras-calculadoras" className="text-lg font-bold">
            Otras calculadoras
          </h2>
          <ul className="mt-2 space-y-1">
            {otras.map((o) => (
              <li key={o.href}>
                <Link href={o.href} className="enlace inline-block py-1.5">
                  {o.nombre}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-5 text-lg font-bold">¿Sin meta todavía?</h2>
          <p className="mt-1 text-[0.98rem] text-muted">
            El <Link href="/metas" className="enlace">banco de metas</Link> tiene ejemplos medibles por área. Cada uno
            se abre aquí con un clic.
          </p>
          <h2 className="mt-5 text-lg font-bold">Enlaza esta calculadora</h2>
          <p className="mt-1 text-[0.98rem] text-muted">
            Es gratuita y no pide registro. Si la usas en clase, en un taller o en tu web, enlaza a{" "}
            <span className="break-all font-semibold text-ink">{absoluteUrl(ruta)}</span>.
          </p>
        </aside>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: titulo,
          url: absoluteUrl(ruta),
          description: descripcion,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Cualquiera (navegador web)",
          browserRequirements: "Requiere JavaScript",
          inLanguage: site.lang,
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          dateModified: actualizado,
          publisher: organizationLd(),
        }}
      />
    </Contenedor>
  );
}
