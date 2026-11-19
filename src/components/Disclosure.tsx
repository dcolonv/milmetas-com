import Link from "next/link";
import { site } from "@/site.config";

/**
 * The notice that goes before the first commercial link on a page.
 * Once an Amazon tracking ID is set in src/site.config.ts it also shows the
 * sentence the Amazon.es programme requires, word for word. Before that the
 * site is not an Amazon affiliate, so it does not claim to be one.
 */
export function Disclosure() {
  const amazonActivo = Boolean(site.monetization.amazonTag);
  return (
    <aside
      aria-label="Aviso sobre enlaces de afiliados"
      className="rounded-xl border border-line bg-meta-soft/60 px-4 py-3 text-[0.95rem] text-ink"
    >
      <p>
        <strong>Aviso:</strong> esta página contiene enlaces a tiendas que pueden ser enlaces de afiliados. Si compras
        a través de ellos podemos recibir una comisión, sin coste adicional para ti.
        {amazonActivo
          ? " En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables."
          : ""}{" "}
        <Link href="/afiliados" className="enlace">
          Cómo funcionan nuestros enlaces
        </Link>
        .
      </p>
    </aside>
  );
}
