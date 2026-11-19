/**
 * The bank of goals. Every goal is an example, written so the calculator can
 * plan it: a quantity, a unit and a duration in days.
 *
 * To add goals: append rows to the end of an area's list (ids come from the
 * position, so adding at the end keeps existing ids stable).
 *
 * Row format: [text, target, unit, days, startValue?]
 *   - `target` is where the number ends; `startValue` (default 0) is where it
 *     begins. A goal that goes down (a debt, a backlog) has startValue > target.
 *   - `unit` is empty for money, because the visitor brings their own currency.
 *   - The horizon is derived from `days`: up to 92 is "corto", up to 366 is
 *     "mediano", longer is "largo".
 *
 * Rules (see docs/SPEC.md): no weight, diet, medical or investment goals;
 * health goals count behaviours; money goals do not model returns.
 */

import type { AreaSlug } from "./areas";

export type Horizonte = "corto" | "mediano" | "largo";

export type Meta = {
  id: string;
  area: AreaSlug;
  texto: string;
  cantidad: number;
  unidad: string;
  dias: number;
  desde: number;
  horizonte: Horizonte;
};

type Fila = [texto: string, cantidad: number, unidad: string, dias: number, desde?: number];

export const horizontes: { slug: Horizonte; nombre: string; rango: string }[] = [
  { slug: "corto", nombre: "Corto plazo", rango: "hasta 3 meses" },
  { slug: "mediano", nombre: "Mediano plazo", rango: "de 3 meses a 1 año" },
  { slug: "largo", nombre: "Largo plazo", rango: "más de 1 año" },
];

export function horizonteDe(dias: number): Horizonte {
  if (dias <= 92) return "corto";
  if (dias <= 366) return "mediano";
  return "largo";
}

const filas: Record<AreaSlug, Fila[]> = {
  "salud-y-bienestar": [
    ["Caminar 240.000 pasos en 30 días (8.000 al día)", 240000, "pasos", 30],
    ["Hacer 12 sesiones de fuerza en 4 semanas", 12, "sesiones", 28],
    ["Acostarme antes de las 23:30 en 25 de las próximas 30 noches", 25, "noches", 30],
    ["Hacer 20 sesiones de estiramientos de 10 minutos en 30 días", 20, "sesiones", 30],
    ["Subir por las escaleras en lugar del ascensor 60 veces en 60 días", 60, "veces", 60],
    ["Dedicar 300 minutos a respirar con calma o meditar en 30 días (10 al día)", 300, "minutos", 30],
    ["Completar 27 sesiones de un plan para pasar de caminar a correr, en 9 semanas", 27, "sesiones", 63],
    ["Hacer 60 pausas activas de 5 minutos en el trabajo en 6 semanas", 60, "pausas", 42],
    ["Caminar 500 km en 6 meses", 500, "km", 182],
    ["Hacer 100 sesiones de ejercicio en un año", 100, "sesiones", 365],
    ["Nadar 50 km en 6 meses", 50, "km", 182],
    ["Recorrer 1.000 km en bicicleta en 8 meses", 1000, "km", 243],
    ["Correr 300 km en 6 meses", 300, "km", 182],
    ["Practicar yoga 80 horas en un año", 80, "horas", 365],
    ["Pasar 150 horas al aire libre en 6 meses", 150, "horas", 182],
    ["Tener 40 fines de semana con al menos una actividad física en un año", 40, "fines de semana", 365],
    ["Pedir y acudir a mis 3 revisiones pendientes (dentista, vista y chequeo general) en 4 meses", 3, "citas", 120],
    ["Correr 1.500 km en 2 años", 1500, "km", 730],
    ["Completar 300 sesiones de fuerza en 2 años", 300, "sesiones", 730],
    ["Caminar 3.000 km en 3 años", 3000, "km", 1095],
  ],
  dinero: [
    ["Ahorrar 300 en 30 días para empezar un fondo de emergencia", 300, "", 30],
    ["Anotar todos mis gastos durante 30 días", 30, "días anotados", 30],
    ["Pasar 8 fines de semana sin compras que no tenía planeadas, en 3 meses", 8, "fines de semana", 90],
    ["Cancelar 3 suscripciones que no uso en 2 semanas", 3, "suscripciones", 14],
    ["Vender 10 cosas que ya no uso en 60 días", 10, "cosas vendidas", 60],
    ["Reunir 500 para los regalos de fin de año en 12 semanas", 500, "", 84],
    ["Revisar y comparar mis 4 gastos fijos (luz, internet, móvil y seguro) en 6 semanas", 4, "gastos revisados", 42],
    ["Ahorrar 1.200 en 12 meses para un primer fondo de emergencia", 1200, "", 365],
    ["Reunir el equivalente a 3 meses de gastos en un año", 3, "meses de gastos", 365],
    ["Bajar el saldo de la tarjeta de 1.500 a 0 en 10 meses", 0, "", 304, 1500],
    ["Ahorrar 2.000 para las vacaciones en 8 meses", 2000, "", 243],
    ["Apartar 600 para formación en 6 meses", 600, "", 182],
    ["Ahorrar 900 para renovar el ordenador en 9 meses", 900, "", 273],
    ["Hacer 12 revisiones mensuales de mi presupuesto en un año", 12, "revisiones", 365],
    ["Cumplir mi presupuesto de supermercado 40 de las 52 semanas del año", 40, "semanas", 365],
    ["Ahorrar algo, aunque sea poco, 52 semanas seguidas", 52, "semanas con ahorro", 365],
    ["Reunir el equivalente a 6 meses de gastos en 3 años", 6, "meses de gastos", 1095],
    ["Ahorrar 10.000 para la entrada de una vivienda en 4 años", 10000, "", 1461],
    ["Terminar de pagar un préstamo de 6.000 en 3 años", 0, "", 1095, 6000],
    ["Ahorrar 5.000 para un cambio de carrera en 2 años y medio", 5000, "", 912],
  ],
  estudios: [
    ["Estudiar 60 horas para un examen en 6 semanas", 60, "horas", 42],
    ["Resolver 200 problemas de matemáticas antes del examen, en 8 semanas", 200, "problemas", 56],
    ["Repasar 15 temas en 30 días", 15, "temas", 30],
    ["Hacer 8 simulacros de examen en 8 semanas", 8, "simulacros", 56],
    ["Leer y resumir 12 artículos para un trabajo en 4 semanas", 12, "artículos", 28],
    ["Escribir 6.000 palabras de un trabajo de curso en 3 semanas", 6000, "palabras", 21],
    ["Crear 300 tarjetas de repaso de una asignatura en 6 semanas", 300, "tarjetas", 42],
    ["Ir a 10 tutorías o sesiones de dudas en un trimestre", 10, "tutorías", 90],
    ["Estudiar 300 horas para una certificación en 6 meses", 300, "horas", 182],
    ["Completar 4 cursos en línea en un año", 4, "cursos", 365],
    ["Escribir 15.000 palabras del trabajo de fin de grado en 4 meses", 15000, "palabras", 120],
    ["Estudiar 1.000 horas para una oposición en un año", 1000, "horas", 365],
    ["Entregar 30 prácticas una semana antes de su fecha límite durante el curso", 30, "prácticas", 270],
    ["Pasar a limpio los apuntes de 40 clases durante el cuatrimestre", 40, "clases", 120],
    ["Leer 6 libros de la bibliografía recomendada en un cuatrimestre", 6, "libros", 120],
    ["Completar 100 ejercicios de programación en 5 meses", 100, "ejercicios", 150],
    ["Hacer 12 presentaciones de práctica en voz alta en 6 meses", 12, "presentaciones", 182],
    ["Completar los 240 créditos de un grado en 4 años", 240, "créditos", 1461],
    ["Estudiar 2.000 horas para una oposición en 2 años", 2000, "horas", 730],
    ["Escribir una tesis de 80.000 palabras en 3 años", 80000, "palabras", 1095],
  ],
  trabajo: [
    ["Enviar 30 candidaturas adaptadas a cada oferta en 6 semanas", 30, "candidaturas", 42],
    ["Tener 10 conversaciones con personas de mi sector en 2 meses", 10, "conversaciones", 60],
    ["Completar un curso de 40 horas sobre una herramienta de mi puesto en 8 semanas", 40, "horas", 56],
    ["Documentar 10 procesos de mi equipo en un trimestre", 10, "procesos", 90],
    ["Pedir opinión sobre mi trabajo a 5 compañeros en un mes", 5, "conversaciones", 30],
    ["Preparar 20 respuestas de entrevista con ejemplos reales en 3 semanas", 20, "respuestas", 21],
    ["Reservar 24 bloques de 90 minutos sin interrupciones para el trabajo importante en 4 semanas", 24, "bloques", 28],
    ["Obtener 2 certificaciones profesionales en un año", 2, "certificaciones", 365],
    ["Publicar 24 artículos o notas sobre mi especialidad en un año", 24, "publicaciones", 365],
    ["Dar 4 charlas o formaciones internas en un año", 4, "charlas", 365],
    ["Hacer 120 horas de formación en un año", 120, "horas", 365],
    ["Enviar 60 propuestas a posibles clientes en 6 meses", 60, "propuestas", 182],
    ["Tener 12 reuniones de seguimiento con mi responsable en un año", 12, "reuniones", 365],
    ["Automatizar 6 tareas repetitivas de mi trabajo en 6 meses", 6, "tareas", 182],
    ["Leer 8 libros de mi campo profesional en un año", 8, "libros", 365],
    ["Añadir 5 proyectos terminados a mi portafolio en 8 meses", 5, "proyectos", 243],
    ["Acompañar como mentor a una persona durante 20 sesiones en un año", 20, "sesiones", 365],
    ["Completar un máster de 60 créditos en 2 años sin dejar el trabajo", 60, "créditos", 730],
    ["Acumular 300 horas de práctica en una habilidad nueva en 2 años", 300, "horas", 730],
    ["Publicar 100 piezas en mi blog o canal profesional en 3 años", 100, "piezas", 1095],
  ],
  lectura: [
    ["Leer 600 páginas en 30 días (20 al día)", 600, "páginas", 30],
    ["Leer 3 libros en 3 meses", 3, "libros", 90],
    ["Leer 450 minutos antes de dormir en 30 noches (15 cada noche)", 450, "minutos", 30],
    ["Terminar un libro de 400 páginas en 4 semanas", 400, "páginas", 28],
    ["Leer 10 relatos cortos en un mes", 10, "relatos", 30],
    ["Escuchar 20 horas de audiolibros en 8 semanas", 20, "horas", 56],
    ["Leer los 25 artículos largos que tengo guardados, en 6 semanas", 0, "artículos pendientes", 42, 25],
    ["Leer 12 libros en un año", 12, "libros", 365],
    ["Leer 24 libros en un año", 24, "libros", 365],
    ["Leer 10.000 páginas en un año", 10000, "páginas", 365],
    ["Leer 6 clásicos que tengo pendientes en un año", 6, "libros", 365],
    ["Leer 4 libros en otro idioma en un año", 4, "libros", 365],
    ["Leer 52 relatos, uno por semana, en un año", 52, "relatos", 365],
    ["Vaciar mi pila de 15 libros pendientes en 10 meses", 0, "libros pendientes", 304, 15],
    ["Leer 12 libros de no ficción y escribir una página de notas de cada uno, en un año", 12, "libros", 365],
    ["Leer con mis hijos 100 noches en 6 meses", 100, "noches", 182],
    ["Leer 5 libros de un mismo autor en 6 meses", 5, "libros", 182],
    ["Leer 100 libros en 4 años", 100, "libros", 1461],
    ["Leer 30 libros de un mismo autor o colección en 3 años", 30, "libros", 1095],
    ["Leer 50.000 páginas en 5 años", 50000, "páginas", 1826],
  ],
  idiomas: [
    ["Practicar 1.200 minutos en 60 días (20 al día)", 1200, "minutos", 60],
    ["Aprender 300 palabras nuevas en 60 días", 300, "palabras", 60],
    ["Tener 8 conversaciones de 30 minutos con un hablante nativo en 2 meses", 8, "conversaciones", 60],
    ["Ver 20 episodios de una serie en versión original, con subtítulos en ese idioma, en 6 semanas", 20, "episodios", 42],
    ["Escribir 30 entradas de diario de 100 palabras en un mes", 30, "entradas", 30],
    ["Completar 12 unidades de mi libro de texto en 12 semanas", 12, "unidades", 84],
    ["Escuchar 15 horas de pódcast en el idioma en 6 semanas", 15, "horas", 42],
    ["Memorizar 100 verbos de uso frecuente en 5 semanas", 100, "verbos", 35],
    ["Acumular 200 horas de práctica en un año", 200, "horas", 365],
    ["Aprender 1.500 palabras en un año", 1500, "palabras", 365],
    ["Tener 50 clases de conversación en un año", 50, "clases", 365],
    ["Leer 6 libros adaptados a mi nivel en 8 meses", 6, "libros", 243],
    ["Hacer 10 simulacros del examen oficial en 5 meses", 10, "simulacros", 150],
    ["Escribir 40 textos y pedir que me los corrijan, en 10 meses", 40, "textos", 304],
    ["Ver 30 películas en versión original en un año", 30, "películas", 365],
    ["Sumar 100 días de práctica en 4 meses", 100, "días de práctica", 120],
    ["Ir a 20 intercambios de idiomas en un año", 20, "intercambios", 365],
    ["Acumular 600 horas de práctica en 3 años", 600, "horas", 1095],
    ["Aprender 5.000 palabras en 3 años", 5000, "palabras", 1095],
    ["Leer 20 libros en el idioma que estudio en 4 años", 20, "libros", 1461],
  ],
  relaciones: [
    ["Llamar a 8 amigos con los que hace tiempo que no hablo, en 2 meses", 8, "llamadas", 60],
    ["Cenar 20 veces sin móviles en la mesa en un mes", 20, "cenas", 30],
    ["Escribir 5 mensajes de agradecimiento a personas que me han ayudado, en 5 semanas", 5, "mensajes", 35],
    ["Tener 6 citas con mi pareja en 3 meses", 6, "citas", 90],
    ["Jugar 30 minutos con mis hijos, sin pantallas, 40 de los próximos 60 días", 40, "días", 60],
    ["Visitar a mis abuelos o familiares mayores 6 veces en 3 meses", 6, "visitas", 90],
    ["Conocer por su nombre a 5 vecinos en 2 meses", 5, "vecinos", 60],
    ["Organizar 2 comidas con amigos en casa en 2 meses", 2, "comidas", 60],
    ["Llamar a mis padres cada semana durante un año", 52, "llamadas", 365],
    ["Hacer 12 planes, uno al mes, con mi mejor amigo o amiga", 12, "planes", 365],
    ["Tener 24 citas con mi pareja en un año", 24, "citas", 365],
    ["Comer en familia 100 veces en 6 meses", 100, "comidas", 182],
    ["Felicitar a tiempo 30 cumpleaños en un año", 30, "cumpleaños", 365],
    ["Ir a 20 encuentros de un grupo o asociación para conocer gente nueva, en un año", 20, "encuentros", 365],
    ["Hacer 10 excursiones en familia en un año", 10, "excursiones", 365],
    ["Escribir 12 cartas o mensajes largos a amigos que viven lejos, en un año", 12, "cartas", 365],
    ["Dedicar 50 horas a un voluntariado en un año", 50, "horas", 365],
    ["Reunir a toda la familia 6 veces en 3 años", 6, "reuniones", 1095],
    ["Hacer un viaje al año con mis amigos durante 5 años", 5, "viajes", 1826],
    ["Grabar 20 conversaciones con mis mayores sobre la historia de la familia, en 2 años", 20, "conversaciones", 730],
  ],
  hogar: [
    ["Ordenar 20 cajones o estantes en 30 días", 20, "cajones", 30],
    ["Vaciar 15 cajas del trastero en 10 fines de semana", 15, "cajas", 70],
    ["Donar o reciclar 100 objetos que no uso en 60 días", 100, "objetos", 60],
    ["Planificar el menú de la semana durante 8 semanas", 8, "menús", 56],
    ["Digitalizar 200 documentos importantes en 6 semanas", 200, "documentos", 42],
    ["Dejar la bandeja de entrada de 2.000 mensajes a 0 en 30 días", 0, "mensajes", 30, 2000],
    ["Hacer 10 pequeñas reparaciones pendientes en casa en 2 meses", 10, "reparaciones", 60],
    ["Cocinar 12 tandas de comida para congelar en 6 semanas", 12, "tandas", 42],
    ["Ordenar las 8 zonas de la casa, una a una, en 4 meses", 8, "zonas", 120],
    ["Organizar 5.000 fotos digitales en álbumes en 6 meses", 5000, "fotos", 182],
    ["Aprender a cocinar 24 recetas nuevas en un año", 24, "recetas", 365],
    ["Cumplir la rutina de limpieza semanal 45 de las 52 semanas del año", 45, "semanas", 365],
    ["Hacer 12 copias de seguridad de mis archivos, una al mes", 12, "copias", 365],
    ["Cultivar 10 plantas comestibles en el balcón o el huerto en 6 meses", 10, "plantas", 182],
    ["Pintar 4 habitaciones en 6 meses", 4, "habitaciones", 182],
    ["Cerrar 30 pendientes administrativos (renovaciones, trámites, garantías) en 6 meses", 30, "pendientes", 182],
    ["Preparar la comida para llevar al trabajo 150 días en un año", 150, "días", 365],
    ["Completar 6 mejoras de la casa en 2 años", 6, "mejoras", 730],
    ["Reducir lo que guardo en el trastero de 60 cajas a 30 en 2 años", 30, "cajas", 730, 60],
    ["Digitalizar 3.000 fotos en papel del archivo familiar en 3 años", 3000, "fotos", 1095],
  ],
  creatividad: [
    ["Escribir 9.000 palabras en 30 días (300 al día)", 9000, "palabras", 30],
    ["Hacer 30 dibujos en 30 días", 30, "dibujos", 30],
    ["Practicar un instrumento 1.200 minutos en 60 días (20 al día)", 1200, "minutos", 60],
    ["Publicar 8 entradas en mi blog en 8 semanas", 8, "entradas", 56],
    ["Hacer 100 fotos con intención y quedarme con las 10 mejores, en un mes", 100, "fotos", 30],
    ["Completar 20 ejercicios de un curso de dibujo o diseño en 6 semanas", 20, "ejercicios", 42],
    ["Aprender 4 canciones completas en 2 meses", 4, "canciones", 60],
    ["Grabar 6 episodios de prueba de un pódcast en 3 meses", 6, "episodios", 90],
    ["Escribir el primer borrador de una novela de 60.000 palabras en 8 meses", 60000, "palabras", 243],
    ["Completar 52 dibujos, uno por semana, en un año", 52, "dibujos", 365],
    ["Practicar un instrumento 150 horas en un año", 150, "horas", 365],
    ["Publicar 24 vídeos en un año", 24, "vídeos", 365],
    ["Terminar 6 proyectos de costura, carpintería o manualidades en un año", 6, "proyectos", 365],
    ["Escribir 12 relatos en un año", 12, "relatos", 365],
    ["Hacer 100 commits en un proyecto personal de programación en 6 meses", 100, "commits", 182],
    ["Componer o grabar 10 piezas propias en 10 meses", 10, "piezas", 304],
    ["Enseñar mi trabajo a otras personas 12 veces en un año", 12, "veces", 365],
    ["Escribir 250.000 palabras en 3 años", 250000, "palabras", 1095],
    ["Acumular 1.000 horas de práctica con un instrumento en 5 años", 1000, "horas", 1826],
    ["Reunir un portafolio de 50 obras terminadas en 3 años", 50, "obras", 1095],
  ],
  "viajes-y-experiencias": [
    ["Hacer 4 rutas de senderismo en 2 meses", 4, "rutas", 60],
    ["Visitar 5 museos o exposiciones de mi ciudad en 3 meses", 5, "visitas", 90],
    ["Probar 10 platos de cocinas que no conozco en 3 meses", 10, "platos", 90],
    ["Conocer 6 pueblos a menos de una hora de casa en 3 meses", 6, "pueblos", 90],
    ["Ver 8 amaneceres o atardeceres fuera de casa en 2 meses", 8, "salidas", 60],
    ["Ir 6 veces al teatro, a un concierto o al cine en 3 meses", 6, "salidas", 90],
    ["Cerrar las 4 decisiones de un viaje (fechas, transporte, alojamiento y presupuesto) en 4 semanas", 4, "decisiones", 28],
    ["Hacer 6 escapadas de fin de semana en un año", 6, "escapadas", 365],
    ["Caminar 300 km de rutas en un año", 300, "km", 365],
    ["Ahorrar 2.400 para un gran viaje en 12 meses", 2400, "", 365],
    ["Visitar 12 lugares nuevos de mi región, uno al mes", 12, "lugares", 365],
    ["Dormir 10 noches al aire libre o en refugios en un año", 10, "noches", 365],
    ["Probar 12 actividades que nunca he hecho, una al mes", 12, "actividades", 365],
    ["Recorrer 200 km de un camino de larga distancia en 6 meses", 200, "km", 182],
    ["Ir a 10 fiestas o eventos tradicionales de otros lugares en un año", 10, "eventos", 365],
    ["Subir a 12 cumbres o miradores en un año", 12, "cumbres", 365],
    ["Darme 20 baños en el mar, un río o un lago en 5 meses", 20, "baños", 150],
    ["Visitar 10 países en 5 años", 10, "países", 1826],
    ["Conocer 30 provincias o regiones de mi país en 6 años", 30, "regiones", 2191],
    ["Completar por etapas una ruta de 800 km en 3 años", 800, "km", 1095],
  ],
};

export const metas: Meta[] = (Object.keys(filas) as AreaSlug[]).flatMap((area) =>
  filas[area].map(([texto, cantidad, unidad, dias, desde = 0], i) => ({
    id: `${area}-${String(i + 1).padStart(2, "0")}`,
    area,
    texto,
    cantidad,
    unidad,
    dias,
    desde,
    horizonte: horizonteDe(dias),
  })),
);

export function metasDeArea(area: AreaSlug): Meta[] {
  return metas.filter((m) => m.area === area);
}

/** The number the site shows next to its name: honest progress toward a thousand. */
export const totalMetas = metas.length;
