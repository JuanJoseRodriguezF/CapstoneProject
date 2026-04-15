// components/ConvenioCard.tsx
"use client";
import { useRouter } from "next/navigation";
import type { Convenio } from "@/lib/data";

const TIPO_ICON: Record<string, string> = {
  "Reparación": "🔧",
  Reciclaje: "♻️",
  Mantenimiento: "🛠️",
};

const TIPO_COLOR: Record<string, string> = {
  "Reparación": "bg-blue-100 text-blue-700",
  Reciclaje: "bg-green-100 text-green-700",
  Mantenimiento: "bg-amber-100 text-amber-700",
};

export default function ConvenioCard({ convenio }: { convenio: Convenio }) {
  const router = useRouter();

  return (
    <article
      className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6 flex flex-col gap-3"
      aria-label={`Convenio: ${convenio.nombre}`}
    >
      <div className="flex justify-between items-start">
        <h2 className="font-bold text-lg text-emerald-900">{convenio.nombre}</h2>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${TIPO_COLOR[convenio.tipo]}`}>
          {TIPO_ICON[convenio.tipo]} {convenio.tipo}
        </span>
      </div>

      <p className="text-gray-500 text-sm">{convenio.descripcion}</p>

      <div className="text-sm text-gray-500 space-y-1">
        <p>
          <span aria-label="Ubicación">📍</span>{" "}
          {convenio.direccion} &middot; <strong>{convenio.distancia} km</strong>
        </p>
        <p>
          <span aria-label="Teléfono">📞</span> {convenio.telefono}
        </p>
      </div>

      <div className="flex flex-wrap gap-1 mt-1">
        {convenio.marcasCompatibles.map((m) => (
          <span key={m} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {m}
          </span>
        ))}
      </div>

      <button
        onClick={() => router.push(`/agendar?centroId=${convenio.id}`)}
        className="mt-2 bg-green-700 text-white py-2 rounded-xl font-semibold hover:bg-green-800 transition focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
        aria-label={`Agendar cita en ${convenio.nombre}`}
      >
        Agendar Cita
      </button>
    </article>
  );
}