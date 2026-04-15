// app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/lib/storage";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    const ok = registerUser(name, email, password);
    if (!ok) {
      setError("Ya existe una cuenta con ese correo.");
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-4 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-4 rounded-xl font-bold hover:bg-green-800 transition"
          >
            Registrarse
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
