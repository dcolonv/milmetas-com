import type { MetadataRoute } from "next";
import { areas } from "@/data/areas";
import { guias } from "@/data/guias";
import { presets } from "@/data/presets";
import { absoluteUrl, site } from "@/site.config";

const masReciente = (fechas: string[]) => fechas.reduce((a, b) => (a > b ? a : b));

/** Every indexable page, built from the same data the pages use, always on the real domain. */
export default function sitemap(): MetadataRoute.Sitemap {
  const bancoActualizado = masReciente(areas.map((a) => a.actualizado));
  const guiasActualizado = masReciente(guias.map((g) => g.actualizado));
  const todo = masReciente([bancoActualizado, guiasActualizado, site.launched]);

  const fijo = (ruta: string, fecha: string, prioridad: number): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(ruta),
    lastModified: fecha,
    priority: prioridad,
  });

  return [
    fijo("/", todo, 1),
    fijo("/calculadora", site.launched, 0.9),
    ...presets.map((p) => fijo(`/calculadora/${p.slug}`, p.actualizado, 0.8)),
    fijo("/metas", bancoActualizado, 0.9),
    ...areas.map((a) => fijo(`/metas/${a.slug}`, a.actualizado, 0.8)),
    fijo("/guias", guiasActualizado, 0.8),
    ...guias.map((g) => fijo(`/guias/${g.slug}`, g.actualizado, 0.7)),
    ...["/acerca", "/como-trabajamos", "/contacto", "/publicidad", "/privacidad", "/terminos", "/afiliados"].map((r) =>
      fijo(r, site.launched, 0.3),
    ),
  ];
}
