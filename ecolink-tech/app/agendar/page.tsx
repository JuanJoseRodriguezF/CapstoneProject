// app/agendar/page.tsx
"use client";

import Navbar from "@/components/Navbar";

export default function Agendar() {
  const handleAgendar = () => {
    localStorage.setItem("cita", JSON.stringify({
      fecha: "2026-04-15",
      hora: "11:30"
    }));

    alert("Cita agendada");
  };

  return (
    <div>
      <Navbar />

      <div className="pt-32 max-w-xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Agendar Entrega
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow space-y-4">

          <button className="w-full p-3 border rounded-xl">
            11:30 AM
          </button>

          <button
            onClick={handleAgendar}
            className="w-full bg-green-700 text-white py-4 rounded-xl font-bold"
          >
            Confirmar
          </button>

        </div>
      </div>
    </div>
  );
}