// app/perfil/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, getDevice, logout, type User } from "@/lib/storage";
import Link from "next/link";

type Cita = {
  centroNombre: string;
  fecha: string;
  hora: string;
};

type Device = {
  marca: string;
  modelo: string;
  estado: number;
};

const ESTADO_LABEL = (estado: number) => {
  if (estado >= 75) return { label: "Buen estado", color: "text-green-700 bg-green-100" };
  if (estado >= 40) return { label: "Estado regular", color: "text-amber-700 bg-amber-100" };
  return { label: "Requiere atención", color: "text-red-700 bg-red-100" };
};

export default function Perfil() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [device, setDevice] = useState<Device | null>(null);
  const [cita, setCita] = useState<Cita | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session) { router.push("/login"); return; }
    setUser(session);
    setDevice(getDevice());
    const citaData = localStorage.getItem("cita");
    if (citaData) setCita(JSON.parse(citaData));
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) return null;

  const initials = user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const estadoInfo = device ? ESTADO_LABEL(device.estado) : null;

  return (
    <div>
      <Navbar />
      <div className="pt-32 px-8 max-w-3xl mx-auto pb-16">

        <h1 className="text-4xl font-bold text-emerald-900 mb-8">Mi Perfil</h1>

        {/* Tarjeta de usuario */}
        <section
          className="bg-white rounded-2xl shadow p-8 mb-6 flex items-center gap-6"
          aria-label="Información del usuario"
        >
          <div
            className="w-20 h-20 rounded-full bg-green-700 flex items-center justify-center text-white text-2xl font-extrabold flex-shrink-0"
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <span className="inline-block mt-2 text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
              Usuario activo
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="border border-red-300 text-red-500 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-50 transition focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Cerrar sesión"
          >
            Cerrar Sesión
          </button>
        </section>

        {/* Dispositivo registrado */}
        <section
          className="bg-white rounded-2xl shadow p-8 mb-6"
          aria-label="Dispositivo registrado"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">📱 Mi Dispositivo</h2>
            <Link
              href="/registro"
              className="text-sm text-green-700 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-green-700 rounded"
            >
              {device ? "Actualizar" : "Registrar"}
            </Link>
          </div>

          {device ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-700 text-lg">{device.marca} {device.modelo}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${estadoInfo?.color}`}>
                  {estadoInfo?.label}
                </span>
              </div>
              {/* Barra de estado */}
              <div>
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Estado del equipo</span>
                  <span>{device.estado}%</span>
                </div>
                <div
                  className="w-full bg-gray-100 rounded-full h-3"
                  role="progressbar"
                  aria-valuenow={device.estado}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Estado del dispositivo: ${device.estado}%`}
                >
                  <div
                    className={`h-3 rounded-full transition-all ${
                      device.estado >= 75 ? "bg-green-500" :
                      device.estado >= 40 ? "bg-amber-400" : "bg-red-400"
                    }`}
                    style={{ width: `${device.estado}%` }}
                  />
                </div>
              </div>
              <Link
                href="/convenios"
                className="inline-block mt-2 bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-800 transition focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
              >
                Ver convenios recomendados →
              </Link>
            </div>
          ) : (
            <div className="text-center py-6" role="alert">
              <p className="text-gray-400 mb-4">Aún no has registrado ningún dispositivo.</p>
              <Link
                href="/registro"
                className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
              >
                Registrar mi dispositivo
              </Link>
            </div>
          )}
        </section>

        {/* Cita activa */}
        <section
          className="bg-white rounded-2xl shadow p-8"
          aria-label="Cita agendada"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">🗓️ Mi Cita</h2>
            {cita && (
              <Link
                href="/convenios"
                className="text-sm text-green-700 font-semibold hover:underline"
              >
                Cambiar
              </Link>
            )}
          </div>

          {cita ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-2">
              <p className="font-semibold text-emerald-900 text-lg">{cita.centroNombre}</p>
              <p className="text-gray-600">
                <span aria-label="Fecha">📅</span> {new Date(cita.fecha + "T00:00:00").toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
              <p className="text-gray-600">
                <span aria-label="Hora">🕐</span> {cita.hora} hrs
              </p>
              <span className="inline-block text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                ✅ Confirmada
              </span>
            </div>
          ) : (
            <div className="text-center py-6" role="alert">
              <p className="text-gray-400 mb-4">No tienes ninguna cita agendada.</p>
              <Link
                href="/convenios"
                className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
              >
                Buscar centro de servicio
              </Link>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
