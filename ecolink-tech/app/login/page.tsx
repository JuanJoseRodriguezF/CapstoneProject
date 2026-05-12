// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveSession } from "@/lib/storage";

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, password }),
    });

    setLoading(false);
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    saveSession({
      id_usuario: data.usuario.id_usuario,
      name: data.usuario.nombre,
      email: data.usuario.correo,
      rol: data.usuario.rol,
    });
    router.push("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-emerald-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-emerald-900 mb-2">Bienvenido</h1>
        <p className="text-gray-500 mb-8">Inicia sesión en EcoLink Tech</p>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-4 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
          />

          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-4 rounded-xl font-bold hover:bg-green-800 transition disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          ¿No tienes cuenta?{" "}
          <Link href="/signup" className="text-green-700 font-semibold hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
}
