// lib/recommender.ts
export const getRecomendaciones = (device: any, convenios: any[]) => {
  if (!device) return convenios;

  return convenios
    .filter(c => c.distancia <= 10)
    .sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      if (a.marca === device.marca) scoreA += 2;
      if (b.marca === device.marca) scoreB += 2;

      if (device.estado < 50 && a.tipo === "Reciclaje") scoreA += 1;
      if (device.estado >= 50 && a.tipo === "Reparación") scoreA += 1;

      return scoreB - scoreA;
    });
};