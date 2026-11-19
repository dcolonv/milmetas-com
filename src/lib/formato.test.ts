import { describe, expect, it } from "vitest";
import { aDias, diasEntre, esFechaValida, finDeAnio, formatearFecha, formatearFechaCorta, hoyLocal, sumarDias } from "./fechas";
import { formatearNumero, formatearPorcentaje, leerNumero, numeroParaCampo } from "./formato";
import { enlaceCalculadora, estadoAQuery, estadoInicial, interpretar } from "./enlace";

describe("fechas", () => {
  it("counts days across months, leap years and DST", () => {
    expect(diasEntre("2027-01-01", "2027-12-31")).toBe(364);
    expect(diasEntre("2028-01-01", "2028-12-31")).toBe(365);
    expect(diasEntre("2027-03-27", "2027-03-29")).toBe(2);
    expect(diasEntre("2027-05-10", "2027-05-01")).toBe(-9);
  });
  it("adds days", () => {
    expect(sumarDias("2027-01-01", 364)).toBe("2027-12-31");
    expect(sumarDias("2028-02-28", 1)).toBe("2028-02-29");
    expect(sumarDias("2027-02-28", 1)).toBe("2027-03-01");
  });
  it("validates", () => {
    expect(esFechaValida("2027-02-28")).toBe(true);
    expect(esFechaValida("2027-02-30")).toBe(false);
    expect(esFechaValida("2027-13-01")).toBe(false);
    expect(esFechaValida("27-01-01")).toBe(false);
    expect(esFechaValida("")).toBe(false);
    expect(Number.isNaN(aDias("hoy"))).toBe(true);
  });
  it("formats in Spanish", () => {
    expect(formatearFecha("2027-04-02")).toBe("2 de abril de 2027");
    expect(formatearFechaCorta("2027-09-15")).toBe("15 sep 2027");
    expect(finDeAnio("2027-04-02")).toBe("2027-12-31");
  });
  it("reads today from the local clock", () => {
    expect(hoyLocal(new Date(2027, 0, 5, 23, 59))).toBe("2027-01-05");
  });
});

describe("leerNumero", () => {
  it("reads Spanish and plain formats", () => {
    expect(leerNumero("12")).toBe(12);
    expect(leerNumero(" 1234,5 ")).toBe(1234.5);
    expect(leerNumero("1.234,5")).toBe(1234.5);
    expect(leerNumero("3.000")).toBe(3000);
    expect(leerNumero("1.250.000")).toBe(1250000);
    expect(leerNumero("0.5")).toBe(0.5);
    expect(leerNumero("1,234.5")).toBe(1234.5);
    expect(leerNumero("-12,5")).toBe(-12.5);
    expect(leerNumero("1 500")).toBe(1500);
  });
  it("rejects what is not a number", () => {
    for (const t of ["", "abc", "12 libros", "1,2,3", "--3", "1e5", "."]) {
      expect(Number.isNaN(leerNumero(t))).toBe(true);
    }
  });
});

describe("formatearNumero", () => {
  it("uses a decimal comma and trims zeros", () => {
    expect(formatearNumero(12)).toBe("12");
    expect(formatearNumero(9.8684)).toBe("9,87");
    expect(formatearNumero(300.3701)).toBe("300,37");
    expect(formatearNumero(2)).toBe("2");
    expect(formatearNumero(1.5)).toBe("1,5");
  });
  it("keeps more decimals for small paces", () => {
    expect(formatearNumero(0.032877)).toBe("0,0329");
    expect(formatearNumero(0.230137)).toBe("0,23");
    expect(formatearNumero(0.2377)).toBe("0,238");
  });
  it("groups thousands from five digits", () => {
    expect(formatearNumero(3000)).toBe("3000");
    expect(formatearNumero(12000)).toBe("12.000");
    expect(formatearNumero(1250000.5)).toBe("1.250.000,5");
  });
  it("handles zero, negatives and non-numbers", () => {
    expect(formatearNumero(0)).toBe("0");
    expect(formatearNumero(-0.001)).toBe("-0,001");
    expect(formatearNumero(-0.00001)).toBe("0");
    expect(formatearNumero(-288.1579)).toBe("-288,16");
    expect(formatearNumero(NaN)).toBe("—");
  });
  it("formats percentages and field values", () => {
    expect(formatearPorcentaje(0.25)).toBe("25 %");
    expect(formatearPorcentaje(0.2)).toBe("20 %");
    expect(formatearPorcentaje(1 / 3)).toBe("33,3 %");
    expect(numeroParaCampo(1234.5)).toBe("1234,5");
  });
});

describe("the plan in the query string", () => {
  const pre = { meta: "Leer 12 libros", de: 0, a: 12, u: "libros", dias: 365, dps: 7 };
  const lector = (s: string) => new URLSearchParams(s);

  it("starts from the defaults with an empty query", () => {
    expect(estadoInicial(lector(""), "2027-01-01", pre)).toEqual({
      meta: "Leer 12 libros",
      de: "0",
      a: "12",
      u: "libros",
      desde: "2027-01-01",
      hasta: "2027-12-31",
      dps: "7",
      llevo: "",
    });
    expect(estadoInicial(null, "2027-01-01", pre).hasta).toBe("2027-12-31");
  });

  it("reads a link from the bank: starts today, lasts `dias` days", () => {
    const enlace = enlaceCalculadora({ meta: "Caminar 300 km", a: 300, u: "km", dias: 90 });
    expect(enlace.startsWith("/calculadora?")).toBe(true);
    const estado = estadoInicial(lector(enlace.split("?")[1]), "2027-03-01", pre);
    expect(estado).toMatchObject({ meta: "Caminar 300 km", de: "0", a: "300", u: "km", desde: "2027-03-01", hasta: "2027-05-29" });
  });

  it("round-trips a full plan", () => {
    const estado = {
      meta: "Bajar la deuda",
      de: "2400",
      a: "0",
      u: "€",
      desde: "2027-02-01",
      hasta: "2028-01-31",
      dps: "5",
      llevo: "1000",
    };
    expect(estadoInicial(lector(estadoAQuery(estado)), "2027-08-01", pre)).toEqual(estado);
  });

  it("falls back to defaults on malformed values", () => {
    const estado = estadoInicial(lector("a=muchos&desde=ayer&hasta=2027-02-30&dps=40&llevo=x&dias=-3"), "2027-01-01", pre);
    expect(estado).toMatchObject({ meta: "", a: "12", desde: "2027-01-01", hasta: "2027-12-31", dps: "7", llevo: "" });
  });

  it("cuts overlong names and units", () => {
    const estado = estadoInicial(lector(`meta=${"x".repeat(200)}&u=${"y".repeat(60)}`), "2027-01-01", pre);
    expect(estado.meta).toHaveLength(120);
    expect(estado.u).toHaveLength(24);
  });

  it("interprets the form and reports a bad current value", () => {
    const base = estadoInicial(lector(""), "2027-01-01", pre);
    const ok = interpretar({ ...base, llevo: "3" });
    expect(ok.errores).toEqual([]);
    expect(ok.actual).toBe(3);
    expect(interpretar(base).actual).toBe(0);
    expect(interpretar({ ...base, llevo: "tres" }).errores.map((e) => e.campo)).toEqual(["llevo"]);
    expect(interpretar({ ...base, a: "" }).errores.map((e) => e.campo)).toEqual(["objetivo"]);
  });
});
