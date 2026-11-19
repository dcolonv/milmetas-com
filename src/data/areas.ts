/**
 * The ten areas of the bank of goals. To add an area: add an entry here and
 * its goals in metas.ts. The page, the sitemap, the footer and the filters
 * pick it up from this list.
 */

export type AreaSlug =
  | "salud-y-bienestar"
  | "dinero"
  | "estudios"
  | "trabajo"
  | "lectura"
  | "idiomas"
  | "relaciones"
  | "hogar"
  | "creatividad"
  | "viajes-y-experiencias";

export type Area = {
  slug: AreaSlug;
  nombre: string;
  /** Page <h1>. */
  titulo: string;
  /** <title>, without the site name; 58 characters at most. */
  tituloSeo: string;
  /** Meta description, 50 to 160 characters. */
  descripcion: string;
  /** One line for cards. */
  resumen: string;
  /** Paragraphs shown above the list. */
  intro: string[];
  /** How to set goals in this area. */
  consejos: { titulo: string; texto: string }[];
  /** A caution shown on areas where a professional matters. */
  aviso?: string;
  /** Slugs of related guides. */
  guias: string[];
  /** Which calculator page the "Planificar" buttons open. */
  calculadora: string;
  actualizado: string;
};

export const areas: Area[] = [
  {
    slug: "salud-y-bienestar",
    nombre: "Salud y bienestar",
    titulo: "Metas de salud y bienestar: 20 ejemplos medibles",
    tituloSeo: "Metas de salud y bienestar: 20 ejemplos medibles",
    descripcion:
      "Ejemplos de metas de salud basadas en conductas que controlas: pasos, sesiones de ejercicio, horarios de sueño y pausas. Cada una se abre en la calculadora.",
    resumen: "Movimiento, sueño y descanso, medidos por lo que haces y no por la báscula.",
    intro: [
      "Las metas de salud que mejor se sostienen miden lo que haces, no lo que resulta. «Caminar 8.000 pasos cinco días por semana» depende de ti cada día; un número en la báscula depende de muchas cosas que no controlas. Por eso todas las metas de esta área cuentan conductas: sesiones, minutos, noches, días.",
      "Empieza por debajo de lo que crees que puedes hacer. Una meta de tres sesiones semanales que cumples durante tres meses te deja mejor que una de seis que abandonas en la segunda semana, y siempre puedes subir el número cuando el primero ya no cueste.",
    ],
    consejos: [
      {
        titulo: "Cuenta conductas",
        texto: "Sesiones, minutos, pasos o noches. Son números que puedes anotar el mismo día y que no dependen de nada más que de hacerlo.",
      },
      {
        titulo: "Fija los días, no solo la cantidad",
        texto: "«Tres veces por semana» funciona mejor cuando ya sabes cuáles: lunes, miércoles y sábado, a qué hora y dónde.",
      },
      {
        titulo: "Ten un mínimo para los días malos",
        texto: "Diez minutos cuentan. Un mínimo pequeño evita que un mal día se convierta en una semana en blanco.",
      },
    ],
    aviso:
      "Estas metas son ejemplos generales de actividad y descanso, no consejo médico. Si tienes una condición de salud, estás embarazada o vuelves a la actividad tras una lesión, consulta antes con un profesional sanitario.",
    guias: ["metas-y-habitos", "como-saber-si-vas-a-tiempo", "metodo-woop-y-planes-si-entonces"],
    calculadora: "/calculadora/kilometros",
    actualizado: "2026-11-19",
  },
  {
    slug: "dinero",
    nombre: "Dinero",
    titulo: "Metas financieras: 20 ejemplos con número y plazo",
    tituloSeo: "Metas financieras: 20 ejemplos con número y plazo",
    descripcion:
      "Ejemplos de metas financieras personales: fondo de emergencia, ahorro para un objetivo, pagar una deuda y ordenar tus cuentas. Calcula cuánto apartar al mes.",
    resumen: "Ahorrar para algo concreto, bajar una deuda y saber adónde va lo que ganas.",
    intro: [
      "Una meta de dinero necesita tres datos: cuánto, para cuándo y de dónde sale. Con los dos primeros la calculadora te dice cuánto apartar cada semana o cada mes; el tercero lo decides tú mirando tus gastos. Si la cuota que sale no cabe en tu mes, la meta no está mal: hay que alargar el plazo o bajar la cifra.",
      "Las cantidades de estos ejemplos están sin moneda a propósito. Cámbialas por las tuyas al abrir la calculadora: lo que importa aquí es la forma de la meta, no el número.",
    ],
    consejos: [
      {
        titulo: "Ponle nombre al dinero",
        texto: "«Ahorrar más» no dice cuándo has terminado. «1.500 para el viaje de agosto» sí, y además te recuerda para qué es cuando te tiente gastarlo.",
      },
      {
        titulo: "Las deudas también son metas",
        texto: "Una deuda es una meta que baja: empiezas en lo que debes y quieres llegar a cero. La calculadora funciona igual en ese sentido.",
      },
      {
        titulo: "Aparta el dinero el día que cobras",
        texto: "Una transferencia programada el día de cobro convierte la meta en algo que ocurre solo, en lugar de algo que tienes que acordarte de hacer.",
      },
    ],
    aviso:
      "Estos ejemplos son aritmética de ahorro, no asesoramiento financiero. No tienen en cuenta intereses, impuestos ni inflación, y no recomiendan ningún producto. Para decisiones de inversión o deudas importantes, consulta con un profesional acreditado.",
    guias: ["metas-financieras", "metas-a-corto-mediano-y-largo-plazo", "como-saber-si-vas-a-tiempo"],
    calculadora: "/calculadora/ahorro",
    actualizado: "2026-11-19",
  },
  {
    slug: "estudios",
    nombre: "Estudios",
    titulo: "Metas académicas: 20 ejemplos para estudiantes",
    tituloSeo: "Metas académicas: 20 ejemplos para estudiantes",
    descripcion:
      "Ejemplos de metas académicas medibles: horas de estudio, temas repasados, ejercicios resueltos y entregas a tiempo. Para instituto, universidad y oposiciones.",
    resumen: "Horas de estudio, temas, ejercicios y entregas, con un ritmo semanal claro.",
    intro: [
      "La nota no la controlas del todo; las horas, los temas y los ejercicios, sí. Una buena meta académica cuenta el trabajo que lleva al resultado: «resolver 300 problemas antes del examen» te dice qué hacer hoy, mientras que «sacar un 8» solo te dice qué esperar.",
      "Reparte el temario hacia atrás desde la fecha del examen y deja libre la última semana para repasar. Si la calculadora te devuelve un ritmo diario que no cabe en tu horario, lo sabrás con meses de margen y no la víspera.",
    ],
    consejos: [
      {
        titulo: "Mide el trabajo, no la nota",
        texto: "Horas, temas, páginas de apuntes, problemas o simulacros. La nota llega como consecuencia y no puedes marcarla como hecha un martes.",
      },
      {
        titulo: "Cuenta sesiones reales",
        texto: "Si estudias cinco días por semana, dilo en la calculadora: el ritmo por sesión es la cifra que de verdad necesitas.",
      },
      {
        titulo: "Deja colchón antes del examen",
        texto: "Pon la fecha límite una semana antes del examen. Ese margen absorbe los días que se tuercen.",
      },
    ],
    guias: ["metas-academicas", "como-escribir-una-meta-smart", "como-saber-si-vas-a-tiempo"],
    calculadora: "/calculadora/estudio",
    actualizado: "2026-11-19",
  },
  {
    slug: "trabajo",
    nombre: "Trabajo",
    titulo: "Metas laborales y profesionales: 20 ejemplos medibles",
    tituloSeo: "Metas laborales y profesionales: 20 ejemplos",
    descripcion:
      "Ejemplos de metas laborales que puedes llevar a tu evaluación de desempeño: formación, contactos, entregas, candidaturas y proyectos, con cifra y plazo.",
    resumen: "Formación, visibilidad, búsqueda de empleo y proyectos propios.",
    intro: [
      "En el trabajo casi todo resultado depende de más gente que tú, así que conviene separar dos tipos de meta: las de resultado, que acuerdas con tu responsable, y las de actividad, que dependen solo de ti. Estas últimas son las que puedes planificar con un ritmo: cursos terminados, conversaciones mantenidas, candidaturas enviadas, documentos escritos.",
      "Si necesitas metas para una evaluación de desempeño, toma un ejemplo, cambia la cifra por una que tenga sentido en tu puesto y añade cómo se va a comprobar. Una meta que tu responsable puede verificar sin preguntarte es una meta bien escrita.",
    ],
    consejos: [
      {
        titulo: "Distingue actividad de resultado",
        texto: "«Hacer 40 llamadas de prospección al mes» depende de ti. «Cerrar 5 clientes» depende también de ellos. Planifica la primera y revisa la segunda.",
      },
      {
        titulo: "Escribe cómo se comprueba",
        texto: "Un certificado, un documento publicado, un registro en el CRM. Si no hay prueba, en la evaluación será tu palabra.",
      },
      {
        titulo: "Pocas y con peso",
        texto: "Tres metas que importan se recuerdan y se trabajan. Diez se convierten en una lista que nadie mira hasta diciembre.",
      },
    ],
    guias: ["metas-laborales-evaluacion-de-desempeno", "okr-personales", "como-escribir-una-meta-smart"],
    calculadora: "/calculadora",
    actualizado: "2026-11-19",
  },
  {
    slug: "lectura",
    nombre: "Lectura",
    titulo: "Metas de lectura: 20 retos con páginas y plazos",
    tituloSeo: "Metas de lectura: 20 retos con páginas y plazos",
    descripcion:
      "Retos de lectura medibles: libros al año, páginas al día, minutos antes de dormir y lecturas pendientes. Calcula cuánto leer cada día para llegar.",
    resumen: "Libros al año, páginas al día y la pila de pendientes, por fin con fecha.",
    intro: [
      "«Leer más» es de las metas más repetidas y de las más fáciles de medir. Se puede contar en libros, en páginas o en minutos, y cada unidad sirve para algo distinto: los libros motivan, las páginas permiten calcular un ritmo diario y los minutos protegen el hábito cuando el libro es largo o difícil.",
      "Si tu reto es en libros, pásalo a páginas antes de planificar: suma las de los títulos que quieres leer y deja que la calculadora te diga cuántas tocan al día. Verás que casi cualquier reto anual cabe en un rato diario más corto de lo que parece.",
    ],
    consejos: [
      {
        titulo: "Planifica en páginas",
        texto: "Un libro de 200 páginas y otro de 900 no pesan lo mismo. Las páginas dan un ritmo honesto; los libros, la satisfacción de tachar.",
      },
      {
        titulo: "Ata la lectura a un momento",
        texto: "El trayecto, la sobremesa o los veinte minutos antes de dormir. Un momento fijo vale más que la intención de «buscar un rato».",
      },
      {
        titulo: "Permítete abandonar libros",
        texto: "Un libro que no avanza frena todo el reto. Dejarlo a tiempo es parte del plan, no un fracaso.",
      },
    ],
    guias: ["reto-de-lectura-paginas-por-dia", "metas-y-habitos", "como-saber-si-vas-a-tiempo"],
    calculadora: "/calculadora/lectura",
    actualizado: "2026-11-19",
  },
  {
    slug: "idiomas",
    nombre: "Idiomas",
    titulo: "Metas para aprender idiomas: 20 ejemplos medibles",
    tituloSeo: "Metas para aprender idiomas: 20 ejemplos medibles",
    descripcion:
      "Ejemplos de metas para aprender un idioma: horas de práctica, palabras, conversaciones, lecturas y simulacros de examen, con un ritmo semanal que puedes seguir.",
    resumen: "Horas de práctica, vocabulario, conversaciones y exámenes oficiales.",
    intro: [
      "«Hablar inglés» no es una meta, es una dirección. Lo que sí puedes planificar es la práctica que te lleva allí: horas de escucha, conversaciones con otra persona, palabras repasadas, textos escritos y corregidos. Un nivel oficial (el B2, por ejemplo) sirve como destino a largo plazo, pero el día a día se mide en práctica acumulada.",
      "Reparte la práctica entre las cuatro destrezas. Es habitual acumular horas de escucha, que cuesta poco, y evitar hablar y escribir, que es donde más se nota el avance. Poner una cifra a cada destreza lo deja a la vista.",
    ],
    consejos: [
      {
        titulo: "Cuenta horas por destreza",
        texto: "Escuchar, leer, hablar y escribir. Una meta para cada una evita que todo el tiempo se vaya a la más cómoda.",
      },
      {
        titulo: "Pon una prueba externa",
        texto: "Un examen oficial, una conversación de 30 minutos sin cambiar de idioma o un texto corregido por un profesor. Algo que no dependa de tu impresión.",
      },
      {
        titulo: "Poco y diario",
        texto: "Veinte minutos al día dan más repeticiones que una tarde a la semana, y el vocabulario se fija repitiendo.",
      },
    ],
    guias: ["metas-y-habitos", "metas-a-corto-mediano-y-largo-plazo", "como-saber-si-vas-a-tiempo"],
    calculadora: "/calculadora/estudio",
    actualizado: "2026-11-19",
  },
  {
    slug: "relaciones",
    nombre: "Relaciones",
    titulo: "Metas de relaciones, familia y amistad: 20 ejemplos",
    tituloSeo: "Metas de relaciones, familia y amistad: 20 ejemplos",
    descripcion:
      "Ejemplos de metas para cuidar a tu pareja, tu familia y tus amistades: llamadas, comidas, planes y tiempo sin pantallas, con cifra y plazo.",
    resumen: "Tiempo con la gente que te importa, puesto en el calendario.",
    intro: [
      "Las relaciones no se miden, pero el tiempo que les dedicas sí. Nadie cuida una amistad «al 80 %»; lo que puedes contar es cuántas veces llamaste, comiste con alguien o apagaste el móvil durante la cena. Una meta en esta área es una forma de reservar ese tiempo antes de que lo ocupe todo lo demás.",
      "Que la cifra sea pequeña. El objetivo es que ocurra, no llenar un marcador: una llamada semanal a tus padres durante un año son más de cincuenta conversaciones que, sin meta, quizá habrían sido diez.",
    ],
    consejos: [
      {
        titulo: "Cuenta encuentros, no sentimientos",
        texto: "Llamadas, comidas, cartas, tardes. Son la parte de la relación que sí depende de tu agenda.",
      },
      {
        titulo: "Ponles día fijo",
        texto: "«Los domingos llamo a mi abuela» sobrevive mejor que «llamar más a mi abuela».",
      },
      {
        titulo: "Compártela con la otra persona",
        texto: "Una meta de pareja o de familia funciona mejor si la habéis elegido juntos y no es una sorpresa.",
      },
    ],
    guias: ["metas-y-habitos", "propositos-de-ano-nuevo", "metas-a-corto-mediano-y-largo-plazo"],
    calculadora: "/calculadora",
    actualizado: "2026-11-19",
  },
  {
    slug: "hogar",
    nombre: "Hogar y organización",
    titulo: "Metas para el hogar y la organización: 20 ejemplos",
    tituloSeo: "Metas para el hogar y la organización: 20 ejemplos",
    descripcion:
      "Ejemplos de metas para ordenar tu casa y tu vida digital: habitaciones despejadas, papeles archivados, menús planificados y pendientes cerrados, con plazo.",
    resumen: "Orden, papeles, cocina y pendientes de casa, repartidos en tandas pequeñas.",
    intro: [
      "Los proyectos de casa se atascan porque son grandes y no tienen fecha: «ordenar el trastero» lleva tres años en la lista. La salida es partirlos en unidades que se puedan contar (cajones, cajas, habitaciones, carpetas) y darles un ritmo. Veinte cajas en diez fines de semana son dos por fin de semana, y eso ya se puede empezar el sábado.",
      "Estas metas mezclan proyectos que se terminan, como digitalizar los papeles importantes, con rutinas que se mantienen, como planificar el menú semanal. Para las segundas, la meta es el número de semanas seguidas que lo consigues.",
    ],
    consejos: [
      {
        titulo: "Parte el proyecto en unidades iguales",
        texto: "Cajones, estantes, cajas o habitaciones. Si las unidades se parecen, el ritmo tiene sentido.",
      },
      {
        titulo: "Sesiones cortas con final",
        texto: "Treinta minutos con temporizador. Acabar a la hora evita que la tarea se asocie con perder el día entero.",
      },
      {
        titulo: "Decide antes adónde va lo que sale",
        texto: "Donar, vender, reciclar. Sin destino decidido, lo que sacas de un armario acaba en otro.",
      },
    ],
    guias: ["como-saber-si-vas-a-tiempo", "metas-y-habitos", "como-escribir-una-meta-smart"],
    calculadora: "/calculadora",
    actualizado: "2026-11-19",
  },
  {
    slug: "creatividad",
    nombre: "Creatividad y proyectos",
    titulo: "Metas creativas y de proyectos personales: 20 ejemplos",
    tituloSeo: "Metas creativas y de proyectos personales: 20 ejemplos",
    descripcion:
      "Ejemplos de metas para escribir, dibujar, tocar un instrumento, programar o avanzar un proyecto propio: palabras, piezas, horas y publicaciones con plazo.",
    resumen: "Escribir, dibujar, tocar, programar: cantidad primero, calidad como consecuencia.",
    intro: [
      "En el trabajo creativo la calidad no se puede planificar, pero la cantidad sí, y la segunda suele traer la primera. Por eso estas metas cuentan producción: palabras escritas, dibujos terminados, horas de práctica, piezas publicadas. Son cifras que puedes cumplir incluso en un mal día, y que con los meses se convierten en oficio.",
      "Elige una unidad que te obligue a terminar cosas. «Practicar guitarra 100 horas» está bien; «aprender 12 canciones completas» te obliga además a llegar al final de cada una, que es donde suelen quedarse los proyectos personales.",
    ],
    consejos: [
      {
        titulo: "Mide lo que produces",
        texto: "Palabras, bocetos, minutos grabados, commits. La inspiración no se puede contar; las páginas, sí.",
      },
      {
        titulo: "Incluye terminar y enseñar",
        texto: "Una meta de «publicar» o «enseñar a alguien» cierra el ciclo y evita la carpeta de proyectos a medias.",
      },
      {
        titulo: "Baja el listón de cada sesión",
        texto: "Doscientas palabras malas se pueden corregir. Una página en blanco, no.",
      },
    ],
    guias: ["metas-y-habitos", "okr-personales", "como-saber-si-vas-a-tiempo"],
    calculadora: "/calculadora",
    actualizado: "2026-11-19",
  },
  {
    slug: "viajes-y-experiencias",
    nombre: "Viajes y experiencias",
    titulo: "Metas de viajes y experiencias: 20 ejemplos con plan",
    tituloSeo: "Metas de viajes y experiencias: 20 ejemplos con plan",
    descripcion:
      "Ejemplos de metas de viajes y experiencias: escapadas al año, rutas a pie, lugares cercanos por conocer y el ahorro para un gran viaje, con cifra y plazo.",
    resumen: "Escapadas, rutas y cosas por probar, antes de que pase otro año.",
    intro: [
      "Las experiencias son las metas que más se aplazan porque nunca son urgentes. Ponerles número y fecha las saca de la lista de «algún día»: seis escapadas de fin de semana en un año es una cada dos meses, y eso ya se puede mirar en el calendario.",
      "No todo son grandes viajes. La mitad de estos ejemplos se pueden hacer cerca de casa y con poco dinero: rutas a pie, museos de tu ciudad, platos nuevos, pueblos a una hora. Para los viajes grandes, la meta útil suele ser la de ahorro que los hace posibles.",
    ],
    consejos: [
      {
        titulo: "Cuenta salidas, no destinos soñados",
        texto: "«Seis escapadas» se cumple aunque cambien los destinos. Una lista cerrada de lugares se rompe con el primer imprevisto.",
      },
      {
        titulo: "Reserva la fecha antes que el plan",
        texto: "Bloquear el fin de semana en el calendario es el paso que hace que ocurra. El destino se puede decidir después.",
      },
      {
        titulo: "Une el viaje con su ahorro",
        texto: "Un viaje grande son dos metas: la fecha y el dinero. Planifica la segunda con la calculadora de ahorro.",
      },
    ],
    guias: ["metas-financieras", "metas-a-corto-mediano-y-largo-plazo", "propositos-de-ano-nuevo"],
    calculadora: "/calculadora",
    actualizado: "2026-11-19",
  },
];

export const areaPorSlug = new Map<string, Area>(areas.map((a) => [a.slug, a]));
