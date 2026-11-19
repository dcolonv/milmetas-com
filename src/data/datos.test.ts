import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { afiliados } from "./affiliates";
import { areaPorSlug, areas } from "./areas";
import { guiaPorSlug, guias } from "./guias";
import { horizonteDe, metas, metasDeArea } from "./metas";
import { presets } from "./presets";
import { MAX_NOMBRE } from "../lib/enlace";
import { ritmoLegible } from "../lib/banco";
import { cargadores } from "../lib/guias";

const tituloOk = (t: string) => t.length > 10 && t.length <= 58;
const descripcionOk = (d: string) => d.length >= 50 && d.length <= 160;
const unicos = (xs: string[]) => new Set(xs).size === xs.length;

describe("areas", () => {
  it("has ten, with unique slugs and search-sized titles and descriptions", () => {
    expect(areas).toHaveLength(10);
    expect(unicos(areas.map((a) => a.slug))).toBe(true);
    for (const a of areas) {
      expect(tituloOk(a.tituloSeo), `${a.slug} title: ${a.tituloSeo.length}`).toBe(true);
      expect(descripcionOk(a.descripcion), `${a.slug} description: ${a.descripcion.length}`).toBe(true);
      expect(a.intro.length).toBeGreaterThanOrEqual(2);
      expect(a.consejos).toHaveLength(3);
      for (const g of a.guias) expect(guiaPorSlug.has(g), `${a.slug} -> ${g}`).toBe(true);
    }
  });
});

describe("bank of goals", () => {
  it("has 200 goals, 20 per area, with unique ids and texts", () => {
    expect(metas).toHaveLength(200);
    expect(unicos(metas.map((m) => m.id))).toBe(true);
    expect(unicos(metas.map((m) => m.texto))).toBe(true);
    for (const a of areas) expect(metasDeArea(a.slug), a.slug).toHaveLength(20);
  });

  it("every goal can be planned by the calculator", () => {
    for (const m of metas) {
      expect(areaPorSlug.has(m.area)).toBe(true);
      expect(Number.isFinite(m.cantidad) && m.cantidad >= 0, m.id).toBe(true);
      expect(m.desde >= 0 && m.desde !== m.cantidad, m.id).toBe(true);
      expect(Number.isInteger(m.dias) && m.dias >= 7 && m.dias <= 3650, m.id).toBe(true);
      expect(m.texto.length >= 15 && m.texto.length <= MAX_NOMBRE, `${m.id}: ${m.texto.length}`).toBe(true);
      expect(m.horizonte).toBe(horizonteDe(m.dias));
    }
  });

  it("every area covers the three horizons", () => {
    for (const a of areas) {
      const presentes = new Set(metasDeArea(a.slug).map((m) => m.horizonte));
      expect([...presentes].sort(), a.slug).toEqual(["corto", "largo", "mediano"]);
    }
  });

  it("stays away from weight, diet and investment goals", () => {
    const vetado = /\b(kilos?|kg|peso|adelgazar|dieta|calor[ií]as|invertir|inversi[oó]n|acciones|cripto|rentabilidad)\b/i;
    for (const m of metas) expect(vetado.test(m.texto), m.texto).toBe(false);
  });
});

describe("pace shown next to each goal", () => {
  it("uses the shortest period where the pace reaches one unit", () => {
    expect(ritmoLegible(600, 30, "páginas")).toBe("20\u00a0páginas por día");
    expect(ritmoLegible(12, 28, "sesiones")).toBe("3\u00a0sesiones por semana");
    expect(ritmoLegible(3, 90, "libros")).toBe("1,01\u00a0libros por mes");
    expect(ritmoLegible(10, 1826, "países")).toBe("2\u00a0países por año");
    expect(ritmoLegible(2, 60, "comidas")).toBe("1,01\u00a0comidas por mes");
    expect(ritmoLegible(5, 1826, "viajes")).toBe("1\u00a0viajes por año");
    expect(ritmoLegible(300, 30, "")).toBe("10 por día");
  });
});

describe("guides", () => {
  it("has twelve with valid frontmatter", () => {
    expect(guias).toHaveLength(12);
    expect(unicos(guias.map((g) => g.slug))).toBe(true);
    expect(unicos(guias.map((g) => g.tituloSeo))).toBe(true);
    expect(unicos(guias.map((g) => g.descripcion))).toBe(true);
    for (const g of guias) {
      expect(tituloOk(g.tituloSeo), `${g.slug} title: ${g.tituloSeo.length}`).toBe(true);
      expect(descripcionOk(g.descripcion), `${g.slug} description: ${g.descripcion.length}`).toBe(true);
      expect(g.relacionadas.length).toBeGreaterThanOrEqual(2);
      for (const r of g.relacionadas) expect(guiaPorSlug.has(r) && r !== g.slug, `${g.slug} -> ${r}`).toBe(true);
      for (const id of g.afiliados) expect(id in afiliados, `${g.slug} -> ${id}`).toBe(true);
    }
  });

  it("has one MDX file and one loader per guide, and nothing extra", () => {
    const carpeta = join(process.cwd(), "content", "guias");
    const archivos = readdirSync(carpeta)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""))
      .sort();
    const slugs = guias.map((g) => g.slug).sort();
    expect(archivos).toEqual(slugs);
    expect(Object.keys(cargadores).sort()).toEqual(slugs);
    for (const s of slugs) expect(existsSync(join(carpeta, `${s}.mdx`))).toBe(true);
  });
});

describe("calculators by kind of goal", () => {
  it("point at real areas and guides and have search-sized metadata", () => {
    expect(unicos(presets.map((p) => p.slug))).toBe(true);
    for (const p of presets) {
      expect(tituloOk(p.tituloSeo), `${p.slug} title: ${p.tituloSeo.length}`).toBe(true);
      expect(descripcionOk(p.descripcion), `${p.slug} description: ${p.descripcion.length}`).toBe(true);
      expect(areaPorSlug.has(p.area)).toBe(true);
      expect(guiaPorSlug.has(p.guia)).toBe(true);
      expect(p.faq.length).toBeGreaterThanOrEqual(3);
    }
  });
});
