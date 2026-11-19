import type { MetadataRoute } from "next";
import { site } from "@/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    lang: site.lang,
    start_url: "/",
    display: "standalone",
    background_color: "#fbf7f0",
    theme_color: "#c2410c",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
