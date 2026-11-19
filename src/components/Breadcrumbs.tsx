import Link from "next/link";
import { absoluteUrl } from "@/site.config";
import { JsonLd } from "./JsonLd";

export type Miga = { nombre: string; ruta: string };

/** Visible breadcrumb trail plus its BreadcrumbList. The last item is the current page. */
export function Breadcrumbs({ migas }: { migas: Miga[] }) {
  const todas = [{ nombre: "Inicio", ruta: "/" }, ...migas];
  return (
    <>
      <nav aria-label="Migas de pan" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {todas.map((m, i) => {
            const ultima = i === todas.length - 1;
            return (
              <li key={m.ruta} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true">/</span> : null}
                {ultima ? (
                  <span aria-current="page" className="text-ink">
                    {m.nombre}
                  </span>
                ) : (
                  <Link href={m.ruta} className="hover:text-meta-dark hover:underline">
                    {m.nombre}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: todas.map((m, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: m.nombre,
            item: absoluteUrl(m.ruta),
          })),
        }}
      />
    </>
  );
}
