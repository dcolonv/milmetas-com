import Link from "next/link";
import type { MetaListada } from "@/lib/banco";

const HORIZONTE: Record<string, string> = {
  corto: "Corto plazo",
  mediano: "Mediano plazo",
  largo: "Largo plazo",
};

/** One goal of the bank: the text, its pace, and the link that opens it in the calculator. */
export function MetaFila({ meta, conArea = false }: { meta: MetaListada; conArea?: boolean }) {
  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5 sm:px-5">
      <div className="min-w-0 flex-1 basis-64">
        <p className="font-semibold leading-snug">{meta.texto}</p>
        <p className="mt-0.5 text-sm text-muted">
          {conArea ? `${meta.areaNombre} · ` : ""}
          {HORIZONTE[meta.horizonte]} · {meta.ritmo}
        </p>
      </div>
      {/* No prefetch: a list holds up to 200 of these links, all to the same static page. */}
      <Link
        href={meta.href}
        prefetch={false}
        aria-label={`Planificar: ${meta.texto}`}
        className="inline-flex min-h-11 shrink-0 items-center rounded-lg border border-line-strong bg-paper px-3.5 text-sm font-semibold text-meta-dark hover:border-meta hover:bg-meta-soft"
      >
        Planificar
      </Link>
    </li>
  );
}
