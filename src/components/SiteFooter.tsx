import Link from "next/link";
import { areas } from "@/data/areas";
import { presets } from "@/data/presets";
import { totalMetas } from "@/data/metas";
import { site } from "@/site.config";
import { Wordmark } from "./Wordmark";

const sitio = [
  { href: "/acerca", label: "Acerca de Mil Metas" },
  { href: "/como-trabajamos", label: "Cómo trabajamos" },
  { href: "/guias", label: "Todas las guías" },
  { href: "/contacto", label: "Contacto" },
  { href: "/publicidad", label: "Publicidad y patrocinio" },
];

const legal = [
  { href: "/privacidad", label: "Privacidad" },
  { href: "/terminos", label: "Términos de uso" },
  { href: "/afiliados", label: "Enlaces de afiliados" },
];

function Grupo({ titulo, enlaces }: { titulo: string; enlaces: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="font-display text-sm font-bold uppercase tracking-wider text-ink">{titulo}</h2>
      <ul className="mt-3 space-y-1 text-[0.95rem]">
        {enlaces.map((e) => (
          <li key={e.href}>
            <Link href={e.href} className="inline-block py-1 text-muted hover:text-meta-dark hover:underline">
              {e.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const herramientas = [
    { href: "/calculadora", label: "Calculadora de metas" },
    ...presets.map((p) => ({ href: `/calculadora/${p.slug}`, label: p.nombre })),
  ];
  const banco = [
    { href: "/metas", label: `Las ${totalMetas} metas` },
    ...areas.map((a) => ({ href: `/metas/${a.slug}`, label: a.nombre })),
  ];
  const red = site.monetization.networkSites;

  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="franja-meta" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-xs text-[0.95rem] text-muted">
              {site.tagline}. {totalMetas} metas de mil, y una calculadora para saber si vas a tiempo.
            </p>
          </div>
          <Grupo titulo="Herramientas" enlaces={herramientas} />
          <Grupo titulo="Banco de metas" enlaces={banco} />
          <Grupo titulo="Sitio" enlaces={sitio} />
          <Grupo titulo="Legal" enlaces={legal} />
        </div>

        {red.length > 0 ? (
          <div className="mt-8 border-t border-line pt-6 text-[0.95rem] text-muted">
            <span className="font-semibold text-ink">Del mismo editor: </span>
            {red.map((s, i) => (
              <span key={s.url}>
                {i > 0 ? " · " : ""}
                <a href={s.url} className="hover:text-meta-dark hover:underline">
                  {s.name}
                </a>
              </span>
            ))}
          </div>
        ) : null}

        <p className="mt-8 border-t border-line pt-6 text-sm text-muted">
          {site.name} es una publicación independiente. El contenido es informativo y no sustituye el consejo de un
          profesional de la salud, las finanzas o el derecho.
        </p>
      </div>
    </footer>
  );
}
