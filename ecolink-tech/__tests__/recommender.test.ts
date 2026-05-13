// __tests__/recommender.test.ts
import { getRecomendaciones } from "@/lib/recommender";
import { convenios } from "@/lib/data";

describe("getRecomendaciones", () => {
  test("returns all convenios when device is null", () => {
    const result = getRecomendaciones(null, convenios);
    expect(result.length).toBe(convenios.length);
  });

  test("filters out convenios with distancia > 10", () => {
    const conveniosFarAway = [
      ...convenios,
      { id: 99, nombre: "Lejano", marca: "X", tipo: "Reciclaje" as const, distancia: 15, direccion: "", telefono: "", descripcion: "", marcasCompatibles: [] },
    ];
    const device = { marca: "Samsung", modelo: "Galaxy", estado: 80 };
    const result = getRecomendaciones(device, conveniosFarAway);
    expect(result.every((c) => c.distancia <= 10)).toBe(true);
  });

  test("prioritizes convenios matching device brand", () => {
    const device = { marca: "Samsung", modelo: "Galaxy", estado: 80 };
    const result = getRecomendaciones(device, convenios);
    expect(result[0].marca).toBe("Samsung");
  });

  test("recommends Reciclaje when device estado < 50", () => {
    const device = { marca: "General", modelo: "X", estado: 30 };
    const result = getRecomendaciones(device, convenios);
    const firstTipo = result[0].tipo;
    expect(firstTipo).toBe("Reciclaje");
  });

  test("recommends Reparacion when device estado >= 50", () => {
    const device = { marca: "General", modelo: "X", estado: 75 };
    const result = getRecomendaciones(device, convenios);
    const tipos = result.map((c) => c.tipo);
    expect(tipos).toContain("Reparación");
  });

  test("returns empty array when no convenios provided", () => {
    const result = getRecomendaciones(null, []);
    expect(result).toHaveLength(0);
  });
});
