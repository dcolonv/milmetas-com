import Link from "next/link";

/**
 * The notice that goes before the first commercial link on a page.
 * The Amazon sentence is the wording the Amazon.es programme asks for.
 */
export function Disclosure() {
  return (
    <aside
      aria-label="Aviso sobre enlaces de afiliados"
      className="rounded-xl border border-line bg-meta-soft/60 px-4 py-3 text-[0.95rem] text-ink"
    >
      <p>
        <strong>Aviso:</strong> algunos enlaces de esta página son enlaces de afiliados. Si compras a través de ellos
        podemos recibir una comisión, sin coste adicional para ti. En calidad de Afiliado de Amazon, obtengo ingresos
        por las compras adscritas que cumplen los requisitos aplicables.{" "}
        <Link href="/afiliados" className="enlace">
          Cómo funcionan nuestros enlaces
        </Link>
        .
      </p>
    </aside>
  );
}
