// app/registro/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveDevice } from "@/lib/storage";

export default function Registro() {
  const router = useRouter();

  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");

  const handleSubmit = () => {
    saveDevice({ marca, modelo, estado: 80 });
    router.push("/convenios");
  };

  return (
    <div>
      <Navbar />

      <div className="pt-32 max-w-3xl mx-auto p-6">

        <h1 className="text-4xl font-bold mb-8">
          Registra tu Dispositivo
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow space-y-6">

          <input
            placeholder="Marca (Apple, Samsung...)"
            className="w-full border p-4 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
            onChange={(e) => setMarca(e.target.value)}
        />

        <input
            placeholder="Modelo"
            className="w-full border p-4 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
            onChange={(e) => setModelo(e.target.value)}
        />

          <button
            onClick={handleSubmit}
            className="w-full bg-green-700 text-white py-4 rounded-xl font-bold"
          >
            Ver Convenios
          </button>

        </div>
      </div>
    </div>
  );
}