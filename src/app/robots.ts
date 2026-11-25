import type { MetadataRoute } from "next";
import { rastreadoresIA, tokensBloqueados } from "@/data/rastreadores";
import { absoluteUrl } from "@/site.config";

/**
 * Everything is open to every crawler. The AI crawlers are also named, so the
 * site's position on them is written down instead of implied; the list, what
 * each one is for and the one switch (training) are in src/data/rastreadores.ts.
 *
 * A named group replaces the general group for that crawler, so a path that
 * ever needs closing has to be added to `abierto` here, where both use it.
 */
export default function robots(): MetadataRoute.Robots {
  const abierto = { allow: "/" };
  const bloqueados = tokensBloqueados();
  const permitidos = rastreadoresIA.map((r) => r.token).filter((t) => !bloqueados.includes(t));

  return {
    rules: [
      { userAgent: "*", ...abierto },
      { userAgent: permitidos, ...abierto },
      ...(bloqueados.length > 0 ? [{ userAgent: bloqueados, disallow: "/" }] : []),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
