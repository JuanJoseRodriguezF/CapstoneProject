// components/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-emerald-50/80 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center px-8 h-20 max-w-7xl mx-auto">
        
        <h1 className="text-2xl font-extrabold text-emerald-900">
          EcoLink Tech
        </h1>

        <div className="hidden md:flex gap-8 text-gray-600">
          <Link href="/registro">Mis Equipos</Link>
          <Link href="/convenios">Convenios</Link>
          <Link href="/agendar">Perfil</Link>
        </div>

        <Link
          href="/registro"
          className="bg-green-700 text-white px-5 py-2 rounded-full font-semibold"
        >
          Donar Equipo
        </Link>
      </div>
    </nav>
  );
}