import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { areas } from "./src/data/areas";
import { guias } from "./src/data/guias";
import { presets } from "./src/data/presets";

/**
 * A path pattern that matches any single segment EXCEPT the known slugs.
 *
 * With Cache Components, a dynamic route answers an unknown slug with the
 * prerendered shell and status 200 before the page gets to call notFound()
 * (a soft 404 on the first visit). Sending unknown slugs to a path that does
 * not exist, at the routing layer, gives a real 404 every time with no
 * function running. The lists come from the same data files the pages use.
 *
 * The destination is a page that only calls notFound(), so its prerendered
 * status is 404 and Vercel keeps it. Rewriting to "/_not-found" or "/404"
 * works under `next start` but answers 200 on Vercel.
 */
const NO_ENCONTRADA = "/no-encontrada";

const desconocido = (slugs: string[]) => `((?!(?:${slugs.join("|")})$)[^/]+)`;

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: `/guias/:slug${desconocido(guias.map((g) => g.slug))}`, destination: NO_ENCONTRADA },
        { source: `/metas/:area${desconocido(areas.map((a) => a.slug))}`, destination: NO_ENCONTRADA },
        { source: `/calculadora/:preset${desconocido(presets.map((p) => p.slug))}`, destination: NO_ENCONTRADA },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

// Guides live in content/guias/*.mdx and are imported by the guide route.
// Turbopack needs plugins named as strings (see the bundled MDX guide).
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
