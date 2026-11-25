import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { site } from "@/site.config";
import { rastreadoresIA, tokensBloqueados } from "./rastreadores";

describe("robots.txt", () => {
  const { rules, sitemap: mapa } = robots();
  const grupos = Array.isArray(rules) ? rules : [rules];

  it("blocks nothing and points at the sitemap", () => {
    expect(mapa).toBe(`${site.url}/sitemap.xml`);
    for (const g of grupos) {
      expect(g.disallow, String(g.userAgent)).toBeUndefined();
      expect(g.allow).toBe("/");
    }
    expect(grupos[0].userAgent).toBe("*");
  });

  it("names every documented AI crawler once", () => {
    const nombrados = grupos.flatMap((g) => g.userAgent ?? []).filter((t) => t !== "*");
    const tokens = rastreadoresIA.map((r) => r.token);
    expect(new Set(tokens).size).toBe(tokens.length);
    expect([...nombrados].sort()).toEqual([...tokens].sort());
    for (const r of rastreadoresIA) expect(r.fuente.startsWith("https://"), r.token).toBe(true);
  });

  it("would block only the training crawlers if training were switched off", () => {
    expect(tokensBloqueados(true)).toEqual([]);
    expect(tokensBloqueados(false).sort()).toEqual(["ClaudeBot", "GPTBot"]);
  });
});
