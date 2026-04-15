// app/convenios/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import { convenios } from "@/lib/data";
import { getDevice } from "@/lib/storage";
import { getRecomendaciones } from "@/lib/recommender";
import ConvenioCard from "@/components/ConvenioCard";

export default function Convenios() {
  const device = getDevice();
  const resultados = getRecomendaciones(device, convenios);

  return (
    <div>
      <Navbar />

      <div className="pt-32 px-8 max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Convenios Disponibles
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resultados.map((c) => (
            <ConvenioCard key={c.id} convenio={c} />
          ))}
        </div>

      </div>
    </div>
  );
}