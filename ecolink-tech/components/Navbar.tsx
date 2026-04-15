// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, logout, type User } from "@/lib/storage";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getSession());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-emerald-50/80 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center px-8 h-20 max-w-7xl mx-auto">

        <Link href="/" className="text-2xl font-extrabold text-emerald-900">
          EcoLink Tech
        </Link>

        <div className="hidden md:flex gap-8 text-gray-600">
          <Link href="/registro">Mis Equipos</Link>
          <Link href="/convenios">Convenios</Link>
          <Link href="/perfil">Perfil</Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-emerald-900 font-semibold hidden md:block">
                Hola, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="border border-green-700 text-green-700 px-5 py-2 rounded-full font-semibold hover:bg-green-700 hover:text-white transition"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-green-700 text-white px-5 py-2 rounded-full font-semibold"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}