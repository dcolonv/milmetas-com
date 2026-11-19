/**
 * Every outbound commercial link on the site, in one place. Pages refer to
 * an entry by its ID through <AffiliateLink id="...">, which is the only
 * component that renders a commercial link.
 *
 * `url` is the plain URL. The tracking parameter is added by the component
 * when the matching ID is set in src/site.config.ts, so links work for the
 * reader before any programme has approved the site.
 *
 * Links here are store searches and categories, not single products: a search
 * keeps working when an edition goes out of print, and nothing on the site
 * states a price or availability.
 */

export type Programa = "amazon";

export type Afiliado = {
  /** What the link is, for the registry and for docs/MONETIZATION.md. */
  nombre: string;
  comercio: string;
  programa: Programa;
  /** For Amazon: the search path and query, added to the store domain in site.config.ts. */
  ruta: string;
  /** The date the link was last opened and checked. */
  verificado: string;
};

export const afiliados = {
  "libro-habitos-atomicos": {
    nombre: "«Hábitos atómicos», de James Clear (ediciones en español)",
    comercio: "Amazon",
    programa: "amazon",
    ruta: "/s?k=H%C3%A1bitos+at%C3%B3micos+James+Clear&i=stripbooks",
    verificado: "2026-11-19",
  },
  "libro-mide-lo-que-importa": {
    nombre: "«Mide lo que importa», de John Doerr (ediciones en español)",
    comercio: "Amazon",
    programa: "amazon",
    ruta: "/s?k=Mide+lo+que+importa+John+Doerr&i=stripbooks",
    verificado: "2026-11-19",
  },
  "agendas-y-planificadores": {
    nombre: "Agendas y planificadores semanales",
    comercio: "Amazon",
    programa: "amazon",
    ruta: "/s?k=agenda+planificador+semanal",
    verificado: "2026-11-19",
  },
  "lectores-de-libros-electronicos": {
    nombre: "Lectores de libros electrónicos",
    comercio: "Amazon",
    programa: "amazon",
    ruta: "/s?k=lector+de+libros+electr%C3%B3nicos",
    verificado: "2026-11-19",
  },
} satisfies Record<string, Afiliado>;

export type AfiliadoId = keyof typeof afiliados;
