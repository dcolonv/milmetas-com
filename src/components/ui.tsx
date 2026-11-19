import Link from "next/link";
import type { ReactNode } from "react";

/** The page column. Every page uses it so the gutters match the header and footer. */
export function Contenedor({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function BotonEnlace({
  href,
  children,
  variante = "primario",
}: {
  href: string;
  children: ReactNode;
  variante?: "primario" | "secundario";
}) {
  const clases =
    variante === "primario"
      ? "bg-meta text-white hover:bg-meta-dark"
      : "border border-line-strong bg-surface text-ink hover:border-meta hover:text-meta-dark";
  return (
    <Link href={href} className={`boton inline-flex min-h-12 items-center rounded-lg px-5 font-semibold ${clases}`}>
      {children}
    </Link>
  );
}

/** A linked card: the whole surface is one link, with one title and one line. */
export function Tarjeta({ href, titulo, texto, pie }: { href: string; titulo: string; texto: string; pie?: string }) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 hover:border-meta"
    >
      <span className="font-display text-lg font-bold leading-snug group-hover:text-meta-dark">{titulo}</span>
      <span className="mt-1.5 text-[0.98rem] text-muted">{texto}</span>
      {pie ? <span className="mt-auto pt-3 text-sm font-semibold text-meta">{pie}</span> : null}
    </Link>
  );
}

export function Encabezado({ titulo, entradilla, children }: { titulo: string; entradilla?: string; children?: ReactNode }) {
  return (
    <header className="pb-6 pt-6 sm:pt-8">
      {children}
      <h1 className="mt-3 max-w-3xl text-3xl font-extrabold sm:text-[2.6rem]">{titulo}</h1>
      {entradilla ? <p className="mt-3 max-w-2xl text-lg text-muted">{entradilla}</p> : null}
    </header>
  );
}

export function Actualizado({ fecha, texto }: { fecha: string; texto: string }) {
  return (
    <p className="text-sm text-muted">
      Actualizado el <time dateTime={fecha}>{texto}</time>
    </p>
  );
}
