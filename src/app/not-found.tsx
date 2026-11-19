import type { Metadata } from "next";
import { BotonEnlace, Contenedor } from "@/components/ui";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o ha cambiado de dirección.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Contenedor className="py-16">
      <p className="font-display text-sm font-bold uppercase tracking-widest text-meta">Error 404</p>
      <h1 className="mt-2 text-4xl font-extrabold">Esta página no ha llegado a la meta</h1>
      <p className="mt-3 max-w-xl text-lg text-muted">
        La dirección no existe o ha cambiado. Desde aquí puedes seguir por cualquiera de las tres partes del sitio.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <BotonEnlace href="/calculadora">Abrir la calculadora</BotonEnlace>
        <BotonEnlace href="/metas" variante="secundario">
          Ver el banco de metas
        </BotonEnlace>
        <BotonEnlace href="/guias" variante="secundario">
          Leer las guías
        </BotonEnlace>
      </div>
    </Contenedor>
  );
}
