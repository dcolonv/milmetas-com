import type { MetadataRoute } from "next";
import { listarPaginas } from "@/lib/paginas";
import { absoluteUrl } from "@/site.config";

/** Every indexable page, from the same list /llms.txt uses, always on the real domain. */
export default function sitemap(): MetadataRoute.Sitemap {
  return listarPaginas().map((p) => ({
    url: absoluteUrl(p.ruta),
    lastModified: p.actualizado,
    priority: p.prioridad,
  }));
}
