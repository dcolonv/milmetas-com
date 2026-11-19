/**
 * The four worked examples from docs/SPEC.md section 3. They are unit tests
 * (src/lib/ritmo.test.ts) and they are published on the calculator page.
 */

import type { Ejemplo } from "./presets";

export const ejemplos: Ejemplo[] = [
  {
    titulo: "Leer 12 libros en 2027",
    entrada: { inicio: 0, objetivo: 12, desde: "2027-01-01", hasta: "2027-12-31", diasPorSemana: 7 },
    unidad: "libros",
    revision: { hoy: "2027-04-10", actual: 3 },
  },
  {
    titulo: "Ahorrar 3.000 en diez meses",
    entrada: { inicio: 0, objetivo: 3000, desde: "2027-01-01", hasta: "2027-10-31", diasPorSemana: 7 },
    unidad: "",
    revision: { hoy: "2027-03-31", actual: 600 },
  },
  {
    titulo: "Bajar una deuda de 2.400 a 0",
    entrada: { inicio: 2400, objetivo: 0, desde: "2027-02-01", hasta: "2028-01-31", diasPorSemana: 7 },
    unidad: "",
    revision: { hoy: "2027-08-01", actual: 1000 },
  },
  {
    titulo: "Estudiar 120 horas en 12 semanas, 5 días por semana",
    entrada: { inicio: 0, objetivo: 120, desde: "2027-03-01", hasta: "2027-05-23", diasPorSemana: 5 },
    unidad: "horas",
  },
];
