// app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, password, telefono, ciudad }),
    });

    setLoading(false);
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    router.push("/login");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-emerald-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-emerald-900 mb-2">Crear cuenta</h1>
        <p className="text-gray-500 mb-8">Únete a EcoLink Tech</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Nombre completo"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border p-4 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full border p-4 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <input
            type="password"
            placeholder="Contraseña (mín. 6 caracteres)"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-4 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <input
            type="tel"
            placeholder="Teléfono (opcional)"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full border p-4 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <input
            type="text"
            placeholder="Ciudad (opcional)"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            className="w-full border p-4 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
          />

          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-4 rounded-xl font-bold hover:bg-green-800 transition disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-green-700 font-semibold hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
