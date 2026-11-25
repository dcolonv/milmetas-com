import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { areas } from "@/data/areas";
import { guias } from "@/data/guias";
import { presets } from "@/data/presets";
import { textoLlms } from "@/lib/llms";
import { listarPaginas } from "@/lib/paginas";
import { site } from "@/site.config";

const urlsDelSitemap = () => sitemap().map((e) => e.url);

describe("the list of indexable pages", () => {
  it("has every guide, area and calculator, each once, on the real domain", () => {
    const rutas = listarPaginas().map((p) => p.ruta);
    expect(new Set(rutas).size).toBe(rutas.length);
    for (const g of guias) expect(rutas).toContain(`/guias/${g.slug}`);
    for (const a of areas) expect(rutas).toContain(`/metas/${a.slug}`);
    for (const p of presets) expect(rutas).toContain(`/calculadora/${p.slug}`);
    // The home page, the three hubs and the seven trust pages, plus the data-driven ones.
    expect(rutas).toHaveLength(11 + guias.length + areas.length + presets.length);
    for (const url of urlsDelSitemap()) expect(url.startsWith(site.url)).toBe(true);
  });

  it("gives every page a name, a one-line description and a real date", () => {
    for (const p of listarPaginas()) {
      expect(p.nombre.length, p.ruta).toBeGreaterThan(3);
      expect(p.descripcion.length, p.ruta).toBeGreaterThan(30);
      expect(p.descripcion.includes("\n"), p.ruta).toBe(false);
      expect(p.actualizado, p.ruta).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(p.actualizado >= site.launched, p.ruta).toBe(true);
    }
  });
});

describe("/llms.txt", () => {
  const texto = textoLlms();
  const enlaces = [...texto.matchAll(/^- \[[^\]]+\]\(([^)]+)\): \S.*$/gm)].map((m) => m[1]);

  it("follows the llms.txt shape: one H1, a summary, then lists of links", () => {
    expect(texto.startsWith(`# ${site.name}\n\n> `)).toBe(true);
    expect(texto.match(/^# /gm)).toHaveLength(1);
    expect(texto.match(/^## .+$/gm)).toEqual(["## Calculadoras", "## Banco de metas", "## Guías", "## Optional"]);
    // Every list line is a link with a note; nothing else starts with a dash.
    expect(texto.match(/^- /gm)).toHaveLength(enlaces.length);
  });

  it("links exactly the pages of the sitemap, except the home page it describes", () => {
    const esperadas = urlsDelSitemap().filter((u) => u !== site.url);
    expect([...enlaces].sort()).toEqual([...esperadas].sort());
  });
});
