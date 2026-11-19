import type { ReactNode } from "react";
import { JsonLd } from "./JsonLd";

export type Pregunta = {
  pregunta: string;
  /** Plain text, used for the structured data. */
  respuesta: string;
  /** Optional richer version for the page (links). Must say the same thing. */
  contenido?: ReactNode;
};

/** Questions that are visibly on the page, with the matching FAQPage markup. */
export function Faq({ preguntas, titulo = "Preguntas frecuentes" }: { preguntas: Pregunta[]; titulo?: string }) {
  return (
    <section aria-labelledby="faq-titulo">
      <h2 id="faq-titulo" className="text-2xl font-bold">
        {titulo}
      </h2>
      <dl className="mt-4 divide-y divide-line rounded-2xl border border-line bg-surface">
        {preguntas.map((p) => (
          <div key={p.pregunta} className="px-5 py-4">
            <dt className="font-display text-lg font-bold">{p.pregunta}</dt>
            <dd className="mt-1.5 text-[1rem] text-ink/90">{p.contenido ?? p.respuesta}</dd>
          </div>
        ))}
      </dl>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: preguntas.map((p) => ({
            "@type": "Question",
            name: p.pregunta,
            acceptedAnswer: { "@type": "Answer", text: p.respuesta },
          })),
        }}
      />
    </section>
  );
}
