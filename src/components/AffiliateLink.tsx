import type { ReactNode } from "react";
import { afiliados, type AfiliadoId } from "@/data/affiliates";
import { site } from "@/site.config";

/** The final URL for a registry entry: plain, or with the tracking ID once it is configured. */
export function urlAfiliado(id: AfiliadoId): string {
  const entrada = afiliados[id];
  const { amazonDomain, amazonTag } = site.monetization;
  const url = new URL(`https://${amazonDomain}${entrada.ruta}`);
  if (amazonTag) url.searchParams.set("tag", amazonTag);
  return url.toString();
}

/**
 * The only component that renders a commercial link. It always carries
 * rel="sponsored nofollow noopener" and data-affiliate, whether or not a
 * tracking ID is set yet.
 */
export function AffiliateLink({ id, children }: { id: AfiliadoId; children: ReactNode }) {
  const entrada = afiliados[id];
  return (
    <a
      href={urlAfiliado(id)}
      rel="sponsored nofollow noopener"
      target="_blank"
      data-affiliate={entrada.programa}
      data-affiliate-id={id}
    >
      {children}
      <span className="sr-only"> (se abre en {entrada.comercio}, en una pestaña nueva)</span>
    </a>
  );
}
