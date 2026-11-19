import { guias } from "@/data/guias";
import { absoluteUrl, site } from "@/site.config";

const escapar = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const fechaRss = (iso: string) => new Date(`${iso}T08:00:00Z`).toUTCString();

/** RSS 2.0 feed of the guides, newest first. Static: it only reads src/data/guias.ts. */
export function GET() {
  const ordenadas = [...guias].sort((a, b) => (a.publicado < b.publicado ? 1 : -1));
  const ultima = ordenadas.reduce((a, g) => (g.actualizado > a ? g.actualizado : a), site.launched);
  const items = ordenadas
    .map((g) => {
      const url = absoluteUrl(`/guias/${g.slug}`);
      return `    <item>
      <title>${escapar(g.titulo)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${fechaRss(g.publicado)}</pubDate>
      <description>${escapar(g.descripcion)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapar(`${site.name}: guías`)}</title>
    <link>${site.url}</link>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
    <description>${escapar(site.description)}</description>
    <language>${site.lang}</language>
    <lastBuildDate>${fechaRss(ultima)}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
