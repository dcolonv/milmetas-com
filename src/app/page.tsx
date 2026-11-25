import type { Metadata } from "next";
import Link from "next/link";
import { Faq, type Pregunta } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { BotonEnlace, Contenedor, Tarjeta } from "@/components/ui";
import { areas } from "@/data/areas";
import { ejemplos } from "@/data/ejemplos";
import { guias } from "@/data/guias";
import { metas, totalMetas } from "@/data/metas";
import { presets } from "@/data/presets";
import { formatearFecha } from "@/lib/fechas";
import { formatearNumero, formatearPorcentaje } from "@/lib/formato";
import { calcularAvance, calcularPlan } from "@/lib/ritmo";
import { organizationLd, pageMeta } from "@/lib/seo";
import { site } from "@/site.config";

export const metadata: Metadata = pageMeta({
  title: `${site.name}: ideas de metas y el ritmo para cumplirlas`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

const destacadas = [
  "como-escribir-una-meta-smart",
  "propositos-de-ano-nuevo",
  "como-saber-si-vas-a-tiempo",
  "metas-y-habitos",
  "metas-financieras",
  "que-dice-la-investigacion-sobre-fijar-metas",
];

/**
 * What a first-time visitor asks about the site itself. Every answer repeats
 * something the site already says on /acerca, /como-trabajamos or the
 * calculator page; the counts come from the data files.
 */
function preguntasDelSitio(): Pregunta[] {
  const editor = site.publisherName
    ? `${site.name} es una publicación de ${site.publisherName}.`
    : `${site.name} es una publicación independiente.`;
  const elaboracion =
    "El contenido se investiga y se redacta con ayuda de herramientas de inteligencia artificial, se contrasta con las fuentes citadas y se publica bajo la responsabilidad del editor del sitio. Cuando una guía menciona un estudio, enlaza a su fuente original.";
  return [
    {
      pregunta: `¿Qué es ${site.name}?`,
      respuesta: `${site.name} es un sitio gratuito en español para fijar metas medibles. Tiene tres partes: un banco de ${totalMetas} metas de ejemplo repartidas en ${areas.length} áreas de vida, una calculadora que convierte cualquier meta con cifra y fecha en un ritmo por día, semana y mes y te dice si vas a tiempo, y ${guias.length} guías sobre cómo fijar metas y seguirlas.`,
    },
    {
      pregunta: "¿Es gratis? ¿Hay que registrarse?",
      respuesta:
        "Es gratuito y no pide registro. No hay cuentas: la calculadora funciona en tu navegador y tus metas se guardan solo en él, y solo si pulsas «Guardar en este navegador».",
    },
    {
      pregunta: "¿Qué tipo de metas hay en el banco?",
      respuesta: `Metas de ejemplo con una cantidad, una unidad y un plazo, para que se puedan repartir y comprobar. Están agrupadas en ${areas.length} áreas (${areas.map((a) => a.nombre.toLowerCase()).join("; ")}) y en tres plazos: corto, mediano y largo. No hay metas de peso, dietas, medicación ni inversiones.`,
    },
    {
      pregunta: "¿Quién escribe el contenido y de dónde salen los datos?",
      respuesta: `${editor} ${elaboracion} El método completo está en «Cómo trabajamos».`,
      contenido: (
        <>
          {editor} {elaboracion} El método completo está en «<Link href="/como-trabajamos" className="enlace">Cómo trabajamos</Link>».
        </>
      ),
    },
    {
      pregunta: "¿Sirve como consejo médico o financiero?",
      respuesta:
        "No. Las metas de salud y de dinero son ejemplos generales, y la calculadora solo divide: no calcula intereses ni recomienda productos. Para decisiones de salud, de inversión o sobre deudas, consulta con un profesional.",
    },
  ];
}

/** The hero's sample plan: worked example 2, computed with the calculator's own functions. */
function PlanDeMuestra() {
  const ej = ejemplos[1];
  const plan = calcularPlan(ej.entrada);
  const avance = calcularAvance(ej.entrada, plan, ej.revision!.actual, ej.revision!.hoy);
  const hecho = Math.min(1, avance.fraccion);
  const previsto = avance.transcurridos / plan.dias;
  return (
    <figure className="rounded-2xl border border-line bg-surface p-5 shadow-[0_8px_0_0_var(--color-line)]">
      <figcaption className="text-sm font-semibold uppercase tracking-wider text-muted">Ejemplo de plan</figcaption>
      <p className="mt-1 font-display text-xl font-extrabold">{ej.titulo}</p>
      <p className="text-sm text-muted">
        Del {formatearFecha(ej.entrada.desde)} al {formatearFecha(ej.entrada.hasta)}
      </p>
      <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          ["Por día", plan.porDia],
          ["Por semana", plan.porSemana],
          ["Por mes", plan.porMes],
        ].map(([titulo, valor]) => (
          <div key={titulo} className="rounded-xl border border-line bg-paper px-2 py-2">
            <dt className="text-xs font-semibold text-muted">{titulo}</dt>
            <dd className="cifra text-xl font-extrabold">{formatearNumero(valor as number)}</dd>
          </div>
        ))}
      </dl>
      <div className="relative mt-5 h-4 rounded-full border border-line-strong bg-paper" aria-hidden="true">
        <div className="h-full rounded-full bg-meta" style={{ width: `${hecho * 100}%` }} />
        <div className="absolute -top-1.5 h-7 w-1 -translate-x-1/2 rounded bg-ink" style={{ left: `${previsto * 100}%` }} />
      </div>
      <p className="mt-3 text-[0.95rem]">
        El {formatearFecha(ej.revision!.hoy)} lleva {formatearNumero(ej.revision!.actual)} ({formatearPorcentaje(avance.fraccion)}) y
        tocaban {formatearNumero(avance.esperadoValor)}:{" "}
        <strong className="whitespace-nowrap rounded bg-late-soft px-1.5 py-0.5 text-late">va atrasado</strong>. Para llegar necesita{" "}
        {formatearNumero(avance.ritmoNuevoDia! * 7)} por semana.
      </p>
    </figure>
  );
}

export default function Home() {
  const porArea = new Map<string, number>();
  for (const m of metas) porArea.set(m.area, (porArea.get(m.area) ?? 0) + 1);
  const guiasDestacadas = destacadas.flatMap((slug) => guias.filter((g) => g.slug === slug));

  return (
    <>
      <section className="carriles border-b border-line">
        <Contenedor className="grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-widest text-meta">
              {totalMetas} metas de mil · {areas.length} áreas de vida
            </p>
            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl lg:text-[3.4rem]">
              Ideas de metas y el ritmo para cumplirlas
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink/85">
              Una meta sin número es un deseo. Elige una del banco o escribe la tuya, ponle fecha, y la calculadora te
              dice cuánto toca por día, por semana y por mes, y si vas a tiempo.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <BotonEnlace href="/calculadora">Abrir la calculadora</BotonEnlace>
              <BotonEnlace href="/metas" variante="secundario">
                Ver el banco de metas
              </BotonEnlace>
            </div>
          </div>
          <PlanDeMuestra />
        </Contenedor>
      </section>

      <Contenedor className="space-y-14 py-12">
        <section aria-labelledby="como">
          <h2 id="como" className="text-2xl font-bold sm:text-3xl">
            Cómo funciona
          </h2>
          <ol className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              {
                titulo: "1. Elige qué quieres conseguir",
                texto: `El banco reúne ${totalMetas} metas de ejemplo, todas con una cifra y un plazo. Filtra por área o por horizonte y quédate con la que se parezca a la tuya.`,
              },
              {
                titulo: "2. Conviértela en un ritmo",
                texto: "Ajusta el número y la fecha en la calculadora. En segundos sabes cuánto toca cada día, cada semana y cada mes, y en qué fechas deberías ir por la mitad.",
              },
              {
                titulo: "3. Vuelve y comprueba",
                texto: "Escribe lo que llevas y verás si vas adelantado o atrasado, por cuánto, y qué ritmo necesitas desde mañana. Puedes guardar tus metas en el navegador, sin registro.",
              },
            ].map((paso) => (
              <li key={paso.titulo} className="rounded-2xl border border-line bg-surface p-5">
                <h3 className="text-lg font-bold">{paso.titulo}</h3>
                <p className="mt-1.5 text-[0.98rem] text-muted">{paso.texto}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="areas">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="areas" className="text-2xl font-bold sm:text-3xl">
              El banco de metas, por áreas
            </h2>
            <Link href="/metas" className="enlace font-semibold">
              Ver las {totalMetas} metas
            </Link>
          </div>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <li key={a.slug}>
                <Tarjeta
                  href={`/metas/${a.slug}`}
                  titulo={a.nombre}
                  texto={a.resumen}
                  pie={`${porArea.get(a.slug) ?? 0} metas de ejemplo`}
                />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="calculadoras">
          <h2 id="calculadoras" className="text-2xl font-bold sm:text-3xl">
            Calculadoras
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <li>
              <Tarjeta
                href="/calculadora"
                titulo="Calculadora de metas"
                texto="Para cualquier meta con un número y una fecha: ritmo, hitos y si vas a tiempo."
                pie="La herramienta principal"
              />
            </li>
            {presets.map((p) => (
              <li key={p.slug}>
                <Tarjeta href={`/calculadora/${p.slug}`} titulo={p.nombre} texto={p.entradilla} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="guias">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="guias" className="text-2xl font-bold sm:text-3xl">
              Guías para fijar metas con cabeza
            </h2>
            <Link href="/guias" className="enlace font-semibold">
              Ver las {guias.length} guías
            </Link>
          </div>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guiasDestacadas.map((g) => (
              <li key={g.slug}>
                <Tarjeta href={`/guias/${g.slug}`} titulo={g.titulo} texto={g.resumen} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="por-que" className="prosa">
          <h2 id="por-que">Por qué «mil metas»</h2>
          <p>
            El nombre es la dirección: un banco de mil metas bien escritas, de las que hoy hay {totalMetas}. Preferimos
            decir el número real y sumar poco a poco a llenar páginas con deseos vagos. Cada meta del banco tiene una
            cifra y un plazo, porque eso es lo que permite repartirla, seguirla y saber cuándo está cumplida.
          </p>
          <p>
            Mil Metas no vende cursos ni promete cambiarte la vida. Es una herramienta y una biblioteca: los cálculos
            están explicados en <Link href="/calculadora#como-funciona">cómo funciona la calculadora</Link> y las guías
            citan sus fuentes. Si quieres saber quién hay detrás y cómo se financia el sitio, está en{" "}
            <Link href="/acerca">acerca de Mil Metas</Link>.
          </p>
        </section>

        <Faq preguntas={preguntasDelSitio()} titulo={`Preguntas frecuentes sobre ${site.name}`} />

        <NewsletterSignup />
      </Contenedor>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${site.url}/#sitio`,
              url: site.url,
              name: site.name,
              description: site.description,
              inLanguage: site.lang,
              publisher: { "@id": `${site.url}/#organizacion` },
            },
            organizationLd(),
          ],
        }}
      />
    </>
  );
}
