// app/convenios/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import { convenios } from "@/lib/data";
import { getDevice } from "@/lib/storage";
import { getRecomendaciones } from "@/lib/recommender";
import ConvenioCard from "@/components/ConvenioCard";
import { useState, useEffect } from "react";
import Link from "next/link";

const TIPOS = ["Todos", "Reparación", "Reciclaje", "Mantenimiento"];

export default function Convenios() {
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("Todos");
  const [resultados, setResultados] = useState(convenios);

  useEffect(() => {
    // Simula latencia de red ≤ 5s (RNF-03)
    const timer = setTimeout(() => {
      const device = getDevice();
      setResultados(getRecomendaciones(device, convenios));
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const filtrados = filtro === "Todos"
    ? resultados
    : resultados.filter((c) => c.tipo === filtro);

  return (
    <div>
      <Navbar />
      <div className="pt-32 px-8 max-w-7xl mx-auto pb-16">

        <h1 className="text-4xl font-bold mb-2 text-emerald-900">Convenios Disponibles</h1>
        <p className="text-gray-500 mb-8">Centros verificados y aliados con EcoLink Tech</p>

        {/* Filtros RNF-08 */}
        <div className="flex gap-3 mb-8 flex-wrap" role="group" aria-label="Filtrar por tipo">
          {TIPOS.map((t) => (
            <button
              key={t}
              onClick={() => setFiltro(t)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-green-700 ${
                filtro === t
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
              }`}
              aria-pressed={filtro === t}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Estado de carga */}
        {loading ? (
          <div className="flex items-center justify-center py-24" role="status" aria-live="polite">
            <div className="w-10 h-10 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
            <span className="ml-4 text-gray-500">Buscando convenios disponibles...</span>
          </div>
        ) : filtrados.length === 0 ? (
          /* Mensaje de error accionable RNF-09 */
          <div className="text-center py-24" role="alert">
            <p className="text-5xl mb-4">🔍</p>
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              No encontramos convenios para este filtro
            </h2>
            <p className="text-gray-500 mb-6">
              Intenta seleccionar otro tipo de servicio o registra tu dispositivo para ver recomendaciones personalizadas.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setFiltro("Todos")}
                className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
              >
                Ver todos los convenios
              </button>
              <Link
                href="/registro"
                className="border border-green-700 text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition"
              >
                Registrar dispositivo
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtrados.map((c) => (
              <ConvenioCard key={c.id} convenio={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}