/**
 * The guides. This is each article's frontmatter; the body is the MDX file
 * with the same slug in content/guias/. To add a guide: add an entry here,
 * write content/guias/<slug>.mdx, and add its loader in src/lib/guias.ts.
 */

export type GrupoGuia = "metodo" | "situaciones";

export type Guia = {
  slug: string;
  /** The <h1>. */
  titulo: string;
  /** The <title>, without the site name; 58 characters at most. */
  tituloSeo: string;
  /** Meta description, 50 to 160 characters, unique. */
  descripcion: string;
  /** One or two lines for cards and the feed. */
  resumen: string;
  grupo: GrupoGuia;
  publicado: string;
  actualizado: string;
  /** IDs from src/data/affiliates.ts used in the article. */
  afiliados: string[];
  /** Slugs of two or three related guides. */
  relacionadas: string[];
};

export const grupos: { slug: GrupoGuia; nombre: string; descripcion: string }[] = [
  {
    slug: "metodo",
    nombre: "Método",
    descripcion: "Cómo se escribe una meta, cómo se reparte en el tiempo y qué se sabe de lo que funciona.",
  },
  {
    slug: "situaciones",
    nombre: "Situaciones",
    descripcion: "Metas para momentos concretos: el año nuevo, el dinero, los estudios, el trabajo y la lectura.",
  },
];

export const guias: Guia[] = [
  {
    slug: "como-escribir-una-meta-smart",
    titulo: "Cómo escribir una meta SMART (y qué significaban las letras en 1981)",
    tituloSeo: "Cómo escribir una meta SMART, con ejemplos",
    descripcion:
      "Qué es una meta SMART, de dónde viene el acrónimo, cómo pasar de un deseo vago a una meta con número y fecha, y dónde se queda corto el método.",
    resumen: "De «quiero leer más» a una meta con número y fecha, paso a paso, y los límites del acrónimo.",
    grupo: "metodo",
    publicado: "2026-11-19",
    actualizado: "2026-11-25",
    afiliados: ["libro-mide-lo-que-importa"],
    relacionadas: ["metas-a-corto-mediano-y-largo-plazo", "que-dice-la-investigacion-sobre-fijar-metas", "okr-personales"],
  },
  {
    slug: "metas-a-corto-mediano-y-largo-plazo",
    titulo: "Metas a corto, mediano y largo plazo: cómo repartirlas",
    tituloSeo: "Metas a corto, mediano y largo plazo: ejemplos",
    descripcion:
      "Qué plazo abarca cada tipo de meta, ejemplos de las tres y un método para encadenarlas: del objetivo a cinco años a lo que toca esta semana.",
    resumen: "Qué cuenta como corto, mediano y largo plazo, y cómo bajar de una meta a cinco años a la tarea de esta semana.",
    grupo: "metodo",
    publicado: "2026-11-19",
    actualizado: "2026-11-25",
    afiliados: [],
    relacionadas: ["como-escribir-una-meta-smart", "como-saber-si-vas-a-tiempo", "metas-financieras"],
  },
  {
    slug: "metas-y-habitos",
    titulo: "Metas y hábitos: en qué se diferencian y cómo combinarlos",
    tituloSeo: "Metas y hábitos: diferencias y cómo combinarlos",
    descripcion:
      "Una meta tiene final; un hábito, no. Cuándo conviene cada uno, cómo convertir una meta en una rutina y cuánto tarda de verdad en formarse un hábito.",
    resumen: "Una meta se termina, un hábito se mantiene. Cuándo elegir cada uno y qué dice el estudio de los 66 días.",
    grupo: "metodo",
    publicado: "2026-11-19",
    actualizado: "2026-11-25",
    afiliados: ["libro-habitos-atomicos"],
    relacionadas: ["como-saber-si-vas-a-tiempo", "metodo-woop-y-planes-si-entonces", "reto-de-lectura-paginas-por-dia"],
  },
  {
    slug: "que-dice-la-investigacion-sobre-fijar-metas",
    titulo: "Qué dice la investigación sobre fijar metas (y el estudio de Yale que nunca existió)",
    tituloSeo: "Qué dice la investigación sobre fijar metas",
    descripcion:
      "Lo que la psicología ha medido sobre metas específicas, seguimiento del progreso y planes si-entonces, y por qué el famoso estudio de Yale es un mito.",
    resumen: "Metas específicas, seguimiento y planes si-entonces: lo que está medido, con sus fuentes, y un mito muy repetido.",
    grupo: "metodo",
    publicado: "2026-11-19",
    actualizado: "2026-11-25",
    afiliados: [],
    relacionadas: ["como-escribir-una-meta-smart", "metodo-woop-y-planes-si-entonces", "metas-y-habitos"],
  },
  {
    slug: "como-saber-si-vas-a-tiempo",
    titulo: "Cómo saber si vas a tiempo con una meta: ritmo, hitos y revisión semanal",
    tituloSeo: "Cómo saber si vas a tiempo con una meta",
    descripcion:
      "El cálculo para saber si vas adelantado o atrasado con cualquier meta, cómo fijar hitos y qué hacer cuando el ritmo que falta ya no es realista.",
    resumen: "La cuenta que hay detrás de «voy bien» o «voy tarde», y tres salidas cuando vas atrasado.",
    grupo: "metodo",
    publicado: "2026-11-19",
    actualizado: "2026-11-25",
    afiliados: [],
    relacionadas: ["metas-a-corto-mediano-y-largo-plazo", "metas-y-habitos", "que-dice-la-investigacion-sobre-fijar-metas"],
  },
  {
    slug: "metodo-woop-y-planes-si-entonces",
    titulo: "Método WOOP y planes «si-entonces»: prepara el obstáculo antes de que llegue",
    tituloSeo: "Método WOOP y planes si-entonces, con ejemplos",
    descripcion:
      "Cómo usar WOOP (deseo, resultado, obstáculo, plan) y las intenciones de implementación para decidir de antemano qué harás cuando la meta se complique.",
    resumen: "Cuatro pasos para anticipar el obstáculo y una frase «si X, entonces Y» que decide por ti en el momento difícil.",
    grupo: "metodo",
    publicado: "2026-11-19",
    actualizado: "2026-11-25",
    afiliados: [],
    relacionadas: ["que-dice-la-investigacion-sobre-fijar-metas", "metas-y-habitos", "propositos-de-ano-nuevo"],
  },
  {
    slug: "okr-personales",
    titulo: "OKR personales: objetivos y resultados clave para tu vida",
    tituloSeo: "OKR personales: cómo usarlos, con ejemplos",
    descripcion:
      "Qué son los OKR, de dónde vienen y cómo adaptarlos a metas personales: un objetivo que inspira, tres resultados que se miden y una revisión trimestral.",
    resumen: "Un objetivo que te importa y tres resultados que se pueden medir: los OKR fuera de la empresa.",
    grupo: "metodo",
    publicado: "2026-11-19",
    actualizado: "2026-11-25",
    afiliados: ["libro-mide-lo-que-importa"],
    relacionadas: ["como-escribir-una-meta-smart", "metas-laborales-evaluacion-de-desempeno", "como-saber-si-vas-a-tiempo"],
  },
  {
    slug: "propositos-de-ano-nuevo",
    titulo: "Propósitos de año nuevo: cómo elegir pocos y convertirlos en un plan",
    tituloSeo: "Propósitos de año nuevo: cómo cumplirlos",
    descripcion:
      "Cómo pasar de una lista de propósitos a tres metas con número, fecha y ritmo semanal, y qué encontró un experimento con más de mil personas.",
    resumen: "Tres propósitos, no diez; formulados en positivo, con número y con una revisión en el calendario.",
    grupo: "situaciones",
    publicado: "2026-11-19",
    actualizado: "2026-11-25",
    afiliados: ["agendas-y-planificadores"],
    relacionadas: ["como-escribir-una-meta-smart", "como-saber-si-vas-a-tiempo", "metodo-woop-y-planes-si-entonces"],
  },
  {
    slug: "metas-financieras",
    titulo: "Metas financieras: cómo fijarlas, por dónde empezar y cuánto apartar",
    tituloSeo: "Metas financieras: cómo fijarlas y por dónde empezar",
    descripcion:
      "Qué es una meta financiera, por dónde empezar (el fondo de emergencia), la cuenta para saber cuánto apartar al mes y qué hacer cuando la cuota no cabe.",
    resumen: "Fondo de emergencia, un ahorro con nombre y una deuda que baja: la aritmética sin productos ni promesas.",
    grupo: "situaciones",
    publicado: "2026-11-19",
    actualizado: "2026-11-25",
    afiliados: [],
    relacionadas: ["metas-a-corto-mediano-y-largo-plazo", "como-saber-si-vas-a-tiempo", "propositos-de-ano-nuevo"],
  },
  {
    slug: "metas-academicas",
    titulo: "Metas académicas: cómo fijarlas y repartir el temario hasta el examen",
    tituloSeo: "Metas académicas: cómo fijarlas y repartir el estudio",
    descripcion:
      "Cómo fijar metas académicas que dependan de ti: medir el estudio en horas, temas y ejercicios, repartir el temario hasta el examen y qué hacer si vas tarde.",
    resumen: "Horas, temas y problemas en lugar de notas, y cómo repartir el temario hacia atrás desde el examen.",
    grupo: "situaciones",
    publicado: "2026-11-19",
    actualizado: "2026-11-25",
    afiliados: [],
    relacionadas: ["como-escribir-una-meta-smart", "como-saber-si-vas-a-tiempo", "metas-y-habitos"],
  },
  {
    slug: "metas-laborales-evaluacion-de-desempeno",
    titulo: "Metas laborales para tu evaluación de desempeño: ejemplos medibles",
    tituloSeo: "Metas laborales para tu evaluación de desempeño",
    descripcion:
      "Cómo redactar metas laborales que tu responsable pueda comprobar, con ejemplos por tipo de puesto y la diferencia entre metas de actividad y de resultado.",
    resumen: "Qué escribir cuando te piden objetivos: actividad frente a resultado, y ejemplos por tipo de puesto.",
    grupo: "situaciones",
    publicado: "2026-11-19",
    actualizado: "2026-11-25",
    afiliados: [],
    relacionadas: ["como-escribir-una-meta-smart", "okr-personales", "metas-a-corto-mediano-y-largo-plazo"],
  },
  {
    slug: "reto-de-lectura-paginas-por-dia",
    titulo: "Reto de lectura: cuántas páginas al día para leer más libros al año",
    tituloSeo: "Reto de lectura: páginas al día para 12, 24 o 52 libros",
    descripcion:
      "La cuenta para convertir un reto de 12, 24 o 52 libros al año en páginas y minutos al día, con una tabla y consejos para no abandonar en marzo.",
    resumen: "De libros al año a páginas al día: la tabla, la fórmula y cómo ajustar el reto a tu velocidad.",
    grupo: "situaciones",
    publicado: "2026-11-19",
    actualizado: "2026-11-25",
    afiliados: ["lectores-de-libros-electronicos"],
    relacionadas: ["metas-y-habitos", "como-saber-si-vas-a-tiempo", "propositos-de-ano-nuevo"],
  },
];

export const guiaPorSlug = new Map<string, Guia>(guias.map((g) => [g.slug, g]));
