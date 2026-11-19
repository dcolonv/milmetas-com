import { Suspense } from "react";
import type { Predeterminados } from "@/lib/enlace";
import { Calculadora } from "./Calculadora";
import { Esqueleto } from "./Esqueleto";

/**
 * The calculator inside the Suspense boundary that Cache Components requires
 * around anything reading the query string. The page stays static; the tool
 * fills in on the client.
 */
export function CalculadoraDeMetas({ pre }: { pre: Predeterminados }) {
  return (
    <>
      <Suspense fallback={<Esqueleto />}>
        <Calculadora pre={pre} />
      </Suspense>
      <noscript>
        <p className="mt-3 rounded-xl border border-line bg-wait-soft px-4 py-3 text-wait">
          La calculadora necesita JavaScript. Más abajo tienes las fórmulas y ejemplos resueltos para hacer la cuenta a
          mano.
        </p>
      </noscript>
    </>
  );
}
