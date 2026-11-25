import type { Metadata } from "next";
import { absoluteUrl, site } from "@/site.config";

/** The generated share image (src/app/opengraph-image.tsx). */
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name}: ${site.tagline.toLowerCase()}`,
};

type PageMeta = {
  /** Without the site name; the layout's template adds it. Keep it under 58 characters. */
  title: string;
  /** 50 to 160 characters, unique to the page. */
  description: string;
  /** The page's own path, starting with "/". */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Use the title exactly as given, with no " | Mil Metas" suffix. */
  absoluteTitle?: boolean;
};

/**
 * Title, description, canonical and Open Graph for one page. Every page calls
 * this with its own path: the canonical is never inherited from a layout.
 */
export function pageMeta(p: PageMeta): Metadata {
  const url = absoluteUrl(p.path);
  return {
    title: p.absoluteTitle ? { absolute: p.title } : p.title,
    description: p.description,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": [{ url: "/feed.xml", title: `${site.name}: guías` }] },
    },
    openGraph: {
      type: p.type ?? "website",
      url,
      title: p.title,
      description: p.description,
      siteName: site.name,
      locale: site.ogLocale,
      // A page that sets its own Open Graph block does not inherit the root
      // opengraph-image file, so the image is named here for every page.
      images: [OG_IMAGE],
      ...(p.type === "article" && p.publishedTime
        ? { publishedTime: p.publishedTime, modifiedTime: p.modifiedTime ?? p.publishedTime }
        : {}),
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.description, images: [OG_IMAGE.url] },
  };
}

/**
 * The publisher as schema.org sees it. No person or company is invented when
 * none is configured. Pages that name the publisher embed this whole node, not
 * a bare "@id" reference: the node is only defined on the home page, and a
 * reader of one page's markup cannot be assumed to have fetched another.
 */
export function organizationLd() {
  return {
    "@type": "Organization",
    "@id": `${site.url}/#organizacion`,
    name: site.publisherName || site.name,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
  };
}
