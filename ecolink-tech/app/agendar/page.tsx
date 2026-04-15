// app/agendar/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getSession } from "@/lib/storage";
import { convenios } from "@/lib/data";

const HORARIOS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];

export default function Agendar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const centroId = Number(searchParams.get("centroId"));
  const centro = convenios.find((c) => c.id === centroId);

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getSession()) router.push("/login");
  }, []);

  const handleConfirmar = async () => {
    setError("");
    if (!fecha || !hora) {
      setError("Selecciona una fecha y un horario.");
      return;
    }

    const user = getSession();
    if (!user) { router.push("/login"); return; }

    setLoading(true);
    const res = await fetch("/api/citas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        centroId: centro?.id,
        centroNombre: centro?.nombre,
        fecha,
        hora,
        userEmail: user.email,
      }),
    });
    setLoading(false);

    if (res.ok) {
      setExito(true);
      localStorage.setItem("cita", JSON.stringify({ centroNombre: centro?.nombre, fecha, hora }));
    } else {
      setError("Error al agendar la cita. Intenta de nuevo.");
    }
  };

  if (exito) {
    return (
      <div>
        <Navbar />
        <div className="pt-32 max-w-xl mx-auto p-6 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">¡Cita Confirmada!</h1>
          <p className="text-gray-500 mb-1">{centro?.nombre}</p>
          <p className="text-gray-500 mb-6">{fecha} a las {hora}</p>
          <button
            onClick={() => router.push("/convenios")}
            className="bg-green-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800 transition"
          >
            Volver a Convenios
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="pt-32 max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-1">Agendar Cita</h1>
        {centro && (
          <p className="text-gray-500 mb-6">{centro.nombre} · {centro.tipo}</p>
        )}

        <div className="bg-white p-6 rounded-2xl shadow space-y-6">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha</label>
            <input
              type="date"
              value={fecha}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Horario</label>
            <div className="grid grid-cols-3 gap-3">
              {HORARIOS.map((h) => (
                <button
                  key={h}
                  onClick={() => setHora(h)}
                  className={`p-3 border rounded-xl font-medium transition ${
                    hora === h
                      ? "bg-green-700 text-white border-green-700"
                      : "hover:border-green-700 hover:text-green-700"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleConfirmar}
            disabled={loading}
            className="w-full bg-green-700 text-white py-4 rounded-xl font-bold hover:bg-green-800 transition disabled:opacity-50"
          >
            {loading ? "Confirmando..." : "Confirmar Cita"}
          </button>
        </div>
      </div>
    </div>
  );
}