import type { ReactNode } from "react";
import { formatearFecha } from "@/lib/fechas";
import { Breadcrumbs } from "./Breadcrumbs";
import { Actualizado, Contenedor, Encabezado } from "./ui";

/** The frame of the trust pages: breadcrumb, heading, long-form text and the date it was last revised. */
export function PaginaTexto({
  titulo,
  entradilla,
  ruta,
  miga,
  actualizado,
  children,
}: {
  titulo: string;
  entradilla?: string;
  ruta: string;
  miga: string;
  actualizado: string;
  children: ReactNode;
}) {
  return (
    <Contenedor>
      <Encabezado titulo={titulo} entradilla={entradilla}>
        <Breadcrumbs migas={[{ nombre: miga, ruta }]} />
      </Encabezado>
      <div className="prosa">{children}</div>
      <div className="mt-10">
        <Actualizado fecha={actualizado} texto={formatearFecha(actualizado)} />
      </div>
    </Contenedor>
  );
}
