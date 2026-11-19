import { describe, expect, it } from "vitest";
import { calcularAvance, calcularPlan, validarPlan, type EntradaPlan } from "./ritmo";

const plan = (e: EntradaPlan) => {
  expect(validarPlan(e)).toEqual([]);
  return calcularPlan(e);
};

describe("worked example 1: leer 12 libros en 2027", () => {
  const e: EntradaPlan = { inicio: 0, objetivo: 12, desde: "2027-01-01", hasta: "2027-12-31", diasPorSemana: 7 };
  const p = plan(e);

  it("gives the pace", () => {
    expect(p.dias).toBe(365);
    expect(p.total).toBe(12);
    expect(p.sentido).toBe(1);
    expect(p.porDia).toBeCloseTo(0.0329, 4);
    expect(p.porSemana).toBeCloseTo(0.2301, 4);
    expect(p.porMes).toBeCloseTo(1.0007, 4);
    expect(p.cadaNDias).toBeCloseTo(30.42, 2);
  });

  it("puts the milestones on the right dates", () => {
    expect(p.hitos.map((h) => [h.valor, h.fecha])).toEqual([
      [3, "2027-04-02"],
      [6, "2027-07-02"],
      [9, "2027-10-01"],
      [12, "2027-12-31"],
    ]);
  });

  it("says a tiempo on 10 April with 3 books", () => {
    const a = calcularAvance(e, p, 3, "2027-04-10");
    expect(a.transcurridos).toBe(100);
    expect(a.esperadoValor).toBeCloseTo(3.2877, 4);
    expect(a.diferencia).toBeCloseTo(-0.2877, 4);
    expect(a.tolerancia).toBeCloseTo(0.6, 10);
    expect(a.veredicto).toBe("a-tiempo");
    expect(a.restante).toBe(9);
    expect(a.diasRestantes).toBe(265);
    expect(a.ritmoNuevoDia).toBeCloseTo(0.034, 4);
    expect(a.ritmoNuevoDia! * 7).toBeCloseTo(0.2377, 4);
    expect(a.ritmoActualDia).toBeCloseTo(0.03, 10);
    expect(a.proyeccion).toBe("2028-02-04");
  });
});

describe("worked example 2: ahorrar 3000 en diez meses", () => {
  const e: EntradaPlan = { inicio: 0, objetivo: 3000, desde: "2027-01-01", hasta: "2027-10-31", diasPorSemana: 7 };
  const p = plan(e);

  it("gives the pace", () => {
    expect(p.dias).toBe(304);
    expect(p.porDia).toBeCloseTo(9.8684, 4);
    expect(p.porSemana).toBeCloseTo(69.0789, 4);
    expect(p.porMes).toBeCloseTo(300.3701, 4);
    expect(p.cadaNDias).toBeNull();
  });

  it("says atrasado on 31 March with 600 saved", () => {
    const a = calcularAvance(e, p, 600, "2027-03-31");
    expect(a.transcurridos).toBe(90);
    expect(a.esperadoValor).toBeCloseTo(888.1579, 4);
    expect(a.diferencia).toBeCloseTo(-288.1579, 4);
    expect(a.diferenciaDias).toBeCloseTo(-29.2, 1);
    expect(a.tolerancia).toBe(150);
    expect(a.veredicto).toBe("atrasado");
    expect(a.restante).toBe(2400);
    expect(a.diasRestantes).toBe(214);
    expect(a.ritmoNuevoDia).toBeCloseTo(11.215, 4);
    expect(a.ritmoNuevoDia! * 7).toBeCloseTo(78.5047, 4);
    expect(a.ritmoNuevoDia! * 30.4375).toBeCloseTo(341.3551, 4);
    expect(a.proyeccion).toBe("2028-03-25");
  });
});

describe("worked example 3: bajar una deuda de 2400 a 0", () => {
  const e: EntradaPlan = { inicio: 2400, objetivo: 0, desde: "2027-02-01", hasta: "2028-01-31", diasPorSemana: 7 };
  const p = plan(e);

  it("works downwards", () => {
    expect(p.dias).toBe(365);
    expect(p.total).toBe(2400);
    expect(p.sentido).toBe(-1);
    expect(p.porDia).toBeCloseTo(6.5753, 4);
    expect(p.porSemana).toBeCloseTo(46.0274, 4);
    expect(p.porMes).toBeCloseTo(200.137, 4);
    expect(p.hitos[1].valor).toBe(1200);
    expect(p.hitos[3].valor).toBe(0);
  });

  it("says adelantado on 1 August owing 1000", () => {
    const a = calcularAvance(e, p, 1000, "2027-08-01");
    expect(a.transcurridos).toBe(182);
    expect(a.esperadoValor).toBeCloseTo(1203.2877, 4);
    expect(a.hecho).toBe(1400);
    expect(a.diferencia).toBeCloseTo(203.2877, 4);
    expect(a.diferenciaDias).toBeCloseTo(30.9, 1);
    expect(a.tolerancia).toBe(120);
    expect(a.veredicto).toBe("adelantado");
    expect(a.ritmoNuevoDia).toBeCloseTo(5.4645, 4);
    expect(a.proyeccion).toBe("2027-12-09");
  });
});

describe("worked example 4: estudiar 120 horas en 12 semanas, 5 días por semana", () => {
  const p = plan({ inicio: 0, objetivo: 120, desde: "2027-03-01", hasta: "2027-05-23", diasPorSemana: 5 });

  it("gives two hours a session", () => {
    expect(p.dias).toBe(84);
    expect(p.porDia).toBeCloseTo(1.4286, 4);
    expect(p.porSemana).toBeCloseTo(10, 10);
    expect(p.porSesion).toBeCloseTo(2, 10);
    expect(p.porMes).toBeCloseTo(43.4821, 4);
  });
});

describe("validation", () => {
  const base: EntradaPlan = { inicio: 0, objetivo: 10, desde: "2027-01-01", hasta: "2027-01-10", diasPorSemana: 7 };
  const campos = (e: EntradaPlan) => validarPlan(e).map((x) => x.campo);

  it("rejects a target equal to the start", () => {
    expect(campos({ ...base, objetivo: 0 })).toEqual(["objetivo"]);
  });
  it("rejects a deadline before the start", () => {
    expect(campos({ ...base, hasta: "2026-12-31" })).toEqual(["hasta"]);
  });
  it("rejects missing numbers and dates", () => {
    expect(campos({ ...base, inicio: NaN, objetivo: NaN, desde: "", hasta: "nope" })).toEqual([
      "inicio",
      "objetivo",
      "desde",
      "hasta",
    ]);
  });
  it("rejects dates that do not exist", () => {
    expect(campos({ ...base, hasta: "2027-02-30" })).toEqual(["hasta"]);
  });
  it("rejects absurd sizes and spans", () => {
    expect(campos({ ...base, objetivo: 1e13 })).toEqual(["objetivo"]);
    expect(campos({ ...base, objetivo: Infinity })).toEqual(["objetivo"]);
    expect(campos({ ...base, hasta: "2227-01-01" })).toEqual(["hasta"]);
  });
  it("accepts negatives and very large values", () => {
    expect(validarPlan({ ...base, inicio: -50, objetivo: -10 })).toEqual([]);
    expect(validarPlan({ ...base, objetivo: 1e12 })).toEqual([]);
  });
});

describe("edges", () => {
  it("a one-day plan is everything today", () => {
    const e: EntradaPlan = { inicio: 0, objetivo: 5, desde: "2027-06-01", hasta: "2027-06-01", diasPorSemana: 7 };
    const p = plan(e);
    expect(p.dias).toBe(1);
    expect(p.porDia).toBe(5);
    expect(p.porSemana).toBe(5);
    expect(p.porMes).toBe(5);
    expect(p.hitos.every((h) => h.fecha === "2027-06-01")).toBe(true);
    const a = calcularAvance(e, p, 0, "2027-06-01");
    expect(a.diasRestantes).toBe(0);
    expect(a.ritmoNuevoDia).toBeNull();
    expect(a.veredicto).toBe("a-tiempo");
  });

  const e: EntradaPlan = { inicio: 0, objetivo: 100, desde: "2027-01-01", hasta: "2027-04-10", diasPorSemana: 7 };
  const p = calcularPlan(e);

  it("has 100 days and one unit a day", () => {
    expect(p.dias).toBe(100);
    expect(p.porDia).toBe(1);
    expect(p.cadaNDias).toBeNull();
  });
  it("before the start there is no verdict on progress", () => {
    const a = calcularAvance(e, p, 0, "2026-12-01");
    expect(a.veredicto).toBe("sin-empezar");
    expect(a.transcurridos).toBe(0);
    expect(a.esperadoValor).toBe(0);
    expect(a.ritmoNuevoDia).toBe(1);
    expect(a.proyeccion).toBeNull();
  });
  it("after the deadline it is vencida with what is missing", () => {
    const a = calcularAvance(e, p, 80, "2027-05-01");
    expect(a.veredicto).toBe("vencida");
    expect(a.transcurridos).toBe(100);
    expect(a.restante).toBe(20);
    expect(a.ritmoNuevoDia).toBeNull();
    expect(a.proyeccion).toBe("2027-05-05");
  });
  it("reaching or passing the target is cumplida", () => {
    expect(calcularAvance(e, p, 100, "2027-02-01").veredicto).toBe("cumplida");
    const a = calcularAvance(e, p, 130, "2027-02-01");
    expect(a.veredicto).toBe("cumplida");
    expect(a.restante).toBe(0);
    expect(a.fraccion).toBeCloseTo(1.3, 10);
    expect(a.proyeccion).toBeNull();
  });
  it("going backwards is atrasado with no projection", () => {
    const a = calcularAvance(e, p, -10, "2027-02-19");
    expect(a.hecho).toBe(-10);
    expect(a.veredicto).toBe("atrasado");
    expect(a.restante).toBe(110);
    expect(a.proyeccion).toBeNull();
  });
  it("the tolerance is 5% of the total or a day of pace, whichever is larger", () => {
    // Day 50: expected 50. Tolerance is max(1, 5) = 5.
    expect(calcularAvance(e, p, 45, "2027-02-19").veredicto).toBe("a-tiempo");
    expect(calcularAvance(e, p, 44.9, "2027-02-19").veredicto).toBe("atrasado");
    expect(calcularAvance(e, p, 55, "2027-02-19").veredicto).toBe("a-tiempo");
    expect(calcularAvance(e, p, 55.1, "2027-02-19").veredicto).toBe("adelantado");
  });
  it("days per week only changes the session figure", () => {
    const tres = calcularPlan({ ...e, diasPorSemana: 3 });
    expect(tres.porSemana).toBe(7);
    expect(tres.porSesion).toBeCloseTo(7 / 3, 10);
    expect(calcularPlan({ ...e, diasPorSemana: 0 }).diasPorSemana).toBe(1);
    expect(calcularPlan({ ...e, diasPorSemana: 99 }).diasPorSemana).toBe(7);
  });
  it("handles very large totals", () => {
    const g = calcularPlan({ ...e, objetivo: 1e12 });
    expect(g.porDia).toBe(1e10);
    expect(Number.isFinite(g.porMes)).toBe(true);
  });
});
