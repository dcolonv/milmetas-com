/**
 * The one file with everything that changes without touching components:
 * name, domain, navigation, contact and the IDs that switch revenue on.
 *
 * `url` is always the real domain, even while the site is served from
 * localhost or a vercel.app address. Canonicals, the sitemap, Open Graph
 * and JSON-LD are all built from it.
 */

export type Sponsor = {
  /** Where the slot shows: "calculadora" or the slug of an area of the bank. */
  slot: string;
  name: string;
  url: string;
  /** One short line shown next to the sponsor's name. */
  line: string;
};

export type SiteConfig = {
  name: string;
  domain: string;
  url: string;
  lang: string;
  ogLocale: string;
  tagline: string;
  description: string;
  launched: string;
  publisherName: string;
  contactEmail: string;
  nav: { href: string; label: string }[];
  monetization: {
    amazonTag: string;
    amazonDomain: string;
    adsenseClient: string;
    adsenseSlots: Record<string, string>;
    newsletterFormUrl: string;
    sponsors: Sponsor[];
    networkSites: { name: string; url: string }[];
  };
};

export const site: SiteConfig = {
  name: "Mil Metas",
  domain: "milmetas.com",
  url: "https://milmetas.com",
  lang: "es",
  ogLocale: "es_ES",
  tagline: "Ideas de metas y el ritmo para cumplirlas",
  description:
    "Banco de metas medibles por área de vida y una calculadora que te dice cuánto avanzar por día, semana y mes, y si vas a tiempo.",
  launched: "2026-11-19",

  /** Leave empty to present the site as an independent publication. */
  publisherName: "",
  /** Create this mailbox, or change the address here. */
  contactEmail: "hello@milmetas.com",

  nav: [
    { href: "/calculadora", label: "Calculadora" },
    { href: "/metas", label: "Banco de metas" },
    { href: "/guias", label: "Guías" },
  ],

  monetization: {
    /** Amazon Afiliados tracking ID, for example "milmetas-21". Empty = plain links. */
    amazonTag: "",
    /** The Amazon store the links point at. */
    amazonDomain: "www.amazon.es",
    /** Google AdSense publisher ID, for example "ca-pub-1234567890123456". Empty = no ads, no script, /ads.txt is 404. */
    adsenseClient: "",
    /** AdSense ad unit IDs per slot. A slot with no ID renders nothing. */
    adsenseSlots: {
      "calc-result": "",
      "guide-mid": "",
      "guide-end": "",
      "bank-end": "",
    },
    /** URL of the email provider's hosted signup form. Empty = no newsletter box. */
    newsletterFormUrl: "",
    /** Paid, labelled placements. Empty = no sponsor boxes. */
    sponsors: [],
    /** Other sites from the same publisher, shown in the footer. */
    networkSites: [],
  },
};

export function absoluteUrl(path = "/"): string {
  return path === "/" ? site.url : `${site.url}${path}`;
}
