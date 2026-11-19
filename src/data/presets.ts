/**
 * The calculator pages for one kind of goal. Each is the same tool with its
 * own starting numbers, wording, worked example and questions.
 * To add one: add an entry here; the route, sitemap and footer read this list.
 */

import type { Predeterminados } from "@/lib/enlace";
import type { EntradaPlan } from "@/lib/ritmo";
import type { AreaSlug } from "./areas";

export type Ejemplo = {
  titulo: string;
  entrada: EntradaPlan;
  unidad: string;
  /** Optional progress check: the value on a given day. */
  revision?: { hoy: string; actual: number };
};

export type Preset = {
  slug: string;
  /** Short name for menus. */
  nombre: string;
  titulo: string;
  tituloSeo: string;
  descripcion: string;
  entradilla: string;
  pre: Predeterminados;
  ejemplo: Ejemplo;
  secciones: { titulo: string; parrafos: string[] }[];
  faq: { pregunta: string; respuesta: string }[];
  area: AreaSlug;
  guia: string;
  actualizado: string;
};

/** What the main calculator shows before the visitor types anything. */
export const predeterminados: Predeterminados = {
  meta: "Leer 12 libros",
  de: 0,
  a: 12,
  u: "libros",
  dias: 365,
  dps: 7,
};

export const presets: Preset[] = [
  {
    slug: "ahorro",
    nombre: "Calculadora de ahorro",
    titulo: "Calculadora de ahorro para una meta: cuánto apartar al mes",
    tituloSeo: "Calculadora de ahorro: cuánto apartar al mes",
    descripcion:
      "Escribe cuánto quieres reunir y para cuándo: la calculadora te dice cuánto ahorrar por día, semana y mes, y si con lo que llevas vas a tiempo.",
    entradilla:
      "Pon la cantidad que quieres reunir y la fecha. Te decimos cuánto apartar cada semana y cada mes, y si con lo que llevas ahorrado vas a tiempo.",
    pre: { meta: "Ahorrar 3.000 para un viaje", de: 0, a: 3000, u: "", dias: 304, dps: 7 },
    ejemplo: {
      titulo: "Ahorrar 3.000 en diez meses",
      entrada: { inicio: 0, objetivo: 3000, desde: "2027-01-01", hasta: "2027-10-31", diasPorSemana: 7 },
      unidad: "",
      revision: { hoy: "2027-03-31", actual: 600 },
    },
    secciones: [
      {
        titulo: "Cómo usarla para ahorrar",
        parrafos: [
          "En «Empiezo en» escribe lo que ya tienes apartado para esta meta, aunque sea cero. En «Quiero llegar a», la cantidad total. La unidad es tu moneda: escribe €, $ o el nombre que uses, o déjala vacía.",
          "La cifra que más sirve es la mensual si cobras por meses, o la semanal si cobras por semanas: es la transferencia que tienes que programar. Cada vez que revises tus cuentas, actualiza «Hoy llevo» y mira el veredicto. Si vas atrasado, la calculadora te da la nueva cuota para llegar igualmente a la fecha.",
        ],
      },
      {
        titulo: "También sirve para pagar una deuda",
        parrafos: [
          "Una deuda es una meta que baja. Escribe lo que debes en «Empiezo en» y 0 en «Quiero llegar a»: el ritmo que sale es lo que tienes que amortizar cada mes. Ten en cuenta que la calculadora no suma intereses; si tu deuda los genera, la cuota real será mayor y la cifra exacta te la dará tu entidad.",
        ],
      },
      {
        titulo: "Qué no hace esta calculadora",
        parrafos: [
          "Solo divide: no calcula intereses, rentabilidades, impuestos ni inflación, y no recomienda dónde guardar el dinero. Para plazos de pocos meses o pocos años esa aritmética simple es suficiente para saber cuánto apartar. Para decisiones de inversión o de endeudamiento, consulta con un profesional acreditado.",
        ],
      },
    ],
    faq: [
      {
        pregunta: "¿Cuánto tengo que ahorrar al mes para llegar a mi meta?",
        respuesta:
          "Divide lo que te falta entre los días que quedan hasta la fecha y multiplica por 30,4375, que es la duración media de un mes. Para reunir 3.000 en 304 días salen 9,87 al día, unos 300,37 al mes. La calculadora hace esa cuenta con tus cifras.",
      },
      {
        pregunta: "¿La calculadora tiene en cuenta los intereses?",
        respuesta:
          "No. Reparte la cantidad en partes iguales entre los días del plazo, sin intereses, impuestos ni inflación. Si tu ahorro genera intereses llegarás un poco antes; si es una deuda con intereses, necesitarás pagar más de lo que indica.",
      },
      {
        pregunta: "¿Qué hago si la cuota mensual no me cabe?",
        respuesta:
          "Tienes dos palancas: alargar la fecha o bajar la cantidad. Cambia cualquiera de las dos en la calculadora hasta que la cuota sea una cifra que puedas apartar todos los meses sin esfuerzo heroico. Un plan modesto que se cumple reúne más que uno ambicioso que se abandona.",
      },
    ],
    area: "dinero",
    guia: "metas-financieras",
    actualizado: "2026-11-19",
  },
  {
    slug: "lectura",
    nombre: "Calculadora de lectura",
    titulo: "Calculadora de lectura: cuántas páginas leer al día",
    tituloSeo: "Calculadora de lectura: páginas al día",
    descripcion:
      "Convierte tu reto de lectura en páginas al día. Escribe cuántas páginas o libros quieres leer y hasta cuándo, y comprueba si vas a tiempo.",
    entradilla:
      "Escribe cuántas páginas (o libros) quieres leer y la fecha límite. Verás cuántas tocan cada día y si tu marcapáginas va por donde debería.",
    pre: { meta: "Leer 12 libros de unas 300 páginas", de: 0, a: 3600, u: "páginas", dias: 365, dps: 7 },
    ejemplo: {
      titulo: "Leer 12 libros en 2027",
      entrada: { inicio: 0, objetivo: 12, desde: "2027-01-01", hasta: "2027-12-31", diasPorSemana: 7 },
      unidad: "libros",
      revision: { hoy: "2027-04-10", actual: 3 },
    },
    secciones: [
      {
        titulo: "Cómo usarla para un reto de lectura",
        parrafos: [
          "Lo más preciso es planificar en páginas. Suma las páginas de los libros que quieres leer (las encuentras en la ficha de cada libro en cualquier librería o biblioteca) y escribe el total en «Quiero llegar a». Si aún no sabes qué vas a leer, multiplica el número de libros por la extensión habitual de los que lees.",
          "Para un solo libro funciona igual: páginas totales, fecha en la que quieres acabarlo y, en «Hoy llevo», la página por la que vas. Si lees solo algunos días, por ejemplo de lunes a viernes, indícalo en «Días por semana» y fíjate en la cifra por sesión.",
        ],
      },
      {
        titulo: "Libros, páginas o minutos",
        parrafos: [
          "Contar libros es lo que más motiva, pero da un ritmo engañoso: uno de 150 páginas y otro de 800 valen lo mismo. Contar páginas reparte el esfuerzo de verdad. Contar minutos es lo mejor para proteger el hábito cuando el libro es denso: veinte minutos al día se cumplen igual con una novela ligera que con un ensayo difícil. Puedes usar la calculadora con cualquiera de las tres unidades.",
        ],
      },
    ],
    faq: [
      {
        pregunta: "¿Cuántas páginas al día hay que leer para leer 12 libros al año?",
        respuesta:
          "Depende de la extensión de los libros. Con libros de 300 páginas son 3.600 páginas al año, es decir, 9,86 páginas al día. Con libros de 400 páginas serían 4.800 páginas y 13,15 al día. La cuenta es páginas totales dividido entre 365.",
      },
      {
        pregunta: "¿Y para leer 24 o 52 libros al año?",
        respuesta:
          "Con libros de 300 páginas, 24 libros son 7.200 páginas y 19,73 al día; 52 libros son 15.600 páginas y 42,74 al día. Cambia el total en la calculadora para ajustarlo a la extensión de tus lecturas.",
      },
      {
        pregunta: "¿Cuánto tiempo de lectura es eso?",
        respuesta:
          "Depende de tu velocidad y del tipo de libro, y varía mucho de una persona a otra. La forma fiable de saberlo es cronometrarte: lee diez minutos de tu libro actual, cuenta las páginas y calcula cuántos minutos necesitas para las páginas diarias que te da la calculadora.",
      },
    ],
    area: "lectura",
    guia: "reto-de-lectura-paginas-por-dia",
    actualizado: "2026-11-19",
  },
  {
    slug: "estudio",
    nombre: "Calculadora de estudio",
    titulo: "Calculadora de estudio: cuántas horas al día hasta el examen",
    tituloSeo: "Calculadora de estudio: horas al día",
    descripcion:
      "Reparte las horas, los temas o los ejercicios que te faltan hasta el examen. Calcula cuánto estudiar por sesión y comprueba cada semana si vas a tiempo.",
    entradilla:
      "Escribe cuánto tienes que estudiar (horas, temas, problemas) y la fecha del examen. Te decimos cuánto toca en cada sesión y si llevas el temario al día.",
    pre: { meta: "Estudiar 120 horas para el examen", de: 0, a: 120, u: "horas", dias: 84, dps: 5 },
    ejemplo: {
      titulo: "Estudiar 120 horas en 12 semanas, 5 días por semana",
      entrada: { inicio: 0, objetivo: 120, desde: "2027-03-01", hasta: "2027-05-23", diasPorSemana: 5 },
      unidad: "horas",
    },
    secciones: [
      {
        titulo: "Cómo usarla para preparar un examen",
        parrafos: [
          "Elige la unidad que mejor describa tu trabajo: horas si el temario es difuso, temas si está bien dividido, problemas o tests si la asignatura es práctica. Escribe el total en «Quiero llegar a» y pon como fecha límite unos días antes del examen, para dejar margen de repaso.",
          "En «Días por semana» indica cuántos días vas a estudiar de verdad. La cifra por sesión es la que tienes que cumplir cada día de estudio; la semanal es la que conviene revisar los domingos. Actualiza «Hoy llevo» con lo que has hecho y sabrás si puedes mantener el ritmo o hay que apretar.",
        ],
      },
      {
        titulo: "Si vas atrasado con el temario",
        parrafos: [
          "La calculadora recalcula el ritmo necesario desde mañana. Si esa cifra no cabe en tu horario, es mejor saberlo ahora: decide qué temas pesan más en el examen, recorta el resto y vuelve a calcular con el total reducido. Estudiar menos temas bien suele rendir más que pasar por todos sin fijar ninguno.",
        ],
      },
    ],
    faq: [
      {
        pregunta: "¿Cuántas horas al día tengo que estudiar?",
        respuesta:
          "Divide las horas totales que necesitas entre los días de estudio que quedan. Para 120 horas en 12 semanas son 10 horas por semana: 2 horas por sesión si estudias cinco días, o 1,43 al día si estudias los siete. Cuántas horas totales necesitas depende de la asignatura y de tu punto de partida; eso solo puedes estimarlo tú o tu profesor.",
      },
      {
        pregunta: "¿Puedo planificar por temas en lugar de por horas?",
        respuesta:
          "Sí. Escribe el número de temas como total y «temas» como unidad. Si no todos pesan lo mismo, cuenta los largos como dos. El resultado te dirá cada cuántos días tienes que cerrar un tema.",
      },
      {
        pregunta: "¿Qué fecha límite pongo?",
        respuesta:
          "Unos días antes del examen, no el mismo día. Ese margen sirve para repasar y para absorber los días en los que no puedas estudiar. Una semana es un margen habitual para exámenes que se preparan durante meses.",
      },
    ],
    area: "estudios",
    guia: "metas-academicas",
    actualizado: "2026-11-19",
  },
  {
    slug: "kilometros",
    nombre: "Calculadora de kilómetros",
    titulo: "Calculadora de kilómetros: cuánto correr o caminar por semana",
    tituloSeo: "Calculadora de kilómetros por semana",
    descripcion:
      "Reparte un reto de distancia (correr, caminar, nadar o pedalear) en kilómetros por semana y por salida, y comprueba si llevas el ritmo para cumplirlo.",
    entradilla:
      "Escribe los kilómetros que quieres sumar y hasta cuándo. Verás cuántos tocan por semana y por salida, y si con lo que llevas vas a tiempo.",
    pre: { meta: "Correr 500 km este año", de: 0, a: 500, u: "km", dias: 365, dps: 3 },
    ejemplo: {
      titulo: "Sumar 500 km en un año saliendo 3 días por semana",
      entrada: { inicio: 0, objetivo: 500, desde: "2027-01-01", hasta: "2027-12-31", diasPorSemana: 3 },
      unidad: "km",
      revision: { hoy: "2027-06-30", actual: 280 },
    },
    secciones: [
      {
        titulo: "Cómo usarla para un reto de distancia",
        parrafos: [
          "Sirve para cualquier distancia acumulada: correr, caminar, nadar, remar o ir en bicicleta. Escribe el total del reto, la fecha límite y cuántos días por semana sales. La cifra por sesión es la distancia media de cada salida; la semanal, la que conviene comparar con lo que marca tu reloj o tu aplicación los domingos.",
          "Cuando actualices «Hoy llevo» con los kilómetros acumulados, el veredicto te dirá si vas adelantado o atrasado y en cuántos días de ritmo. Ir unos días por detrás en un reto anual se corrige con poco; por eso conviene mirarlo cada semana y no en noviembre.",
        ],
      },
      {
        titulo: "Un reparto uniforme es una referencia, no un plan de entrenamiento",
        parrafos: [
          "La calculadora reparte la distancia en partes iguales. Sirve para saber si llevas el reto al día, pero no es un plan de entrenamiento: no tiene en cuenta descansos, progresión ni tu estado de forma. Si vas atrasado, recupera poco a poco en lugar de sumar de golpe todo lo que falta, y si empiezas de cero o tienes alguna lesión o condición de salud, consulta antes con un profesional sanitario.",
        ],
      },
    ],
    faq: [
      {
        pregunta: "¿Cuántos kilómetros por semana son 500 km al año?",
        respuesta:
          "500 km en 365 días son 1,37 km al día, es decir, 9,59 km por semana. Si sales tres días por semana, son unos 3,2 km por salida. Para 1.000 km al año es el doble: 19,18 km por semana.",
      },
      {
        pregunta: "¿Sirve para contar pasos?",
        respuesta:
          "Sí. Escribe el total de pasos del reto y «pasos» como unidad. Por ejemplo, 240.000 pasos en 30 días son 8.000 al día.",
      },
      {
        pregunta: "Voy atrasado, ¿recupero todo esta semana?",
        respuesta:
          "No hace falta. La calculadora reparte lo que falta entre todos los días que quedan y te da el nuevo ritmo semanal, que suele ser solo un poco mayor que el original. Subir la distancia de golpe es justo lo que conviene evitar.",
      },
    ],
    area: "salud-y-bienestar",
    guia: "como-saber-si-vas-a-tiempo",
    actualizado: "2026-11-19",
  },
];

export const presetPorSlug = new Map<string, Preset>(presets.map((p) => [p.slug, p]));
