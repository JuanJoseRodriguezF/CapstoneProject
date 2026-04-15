// app/page.tsx
import Navbar from "@/components/Navbar";
import Link from "next/link";

const PASOS = [
  { num: "1", titulo: "Registra tu dispositivo", desc: "Ingresa marca y modelo en menos de 1 minuto.", href: "/registro" },
  { num: "2", titulo: "Explora convenios", desc: "Ve centros verificados recomendados para tu equipo.", href: "/convenios" },
  { num: "3", titulo: "Agenda tu cita", desc: "Elige fecha y horario en el centro que prefieras.", href: "/convenios" },
];

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 px-8 min-h-screen flex items-center bg-gradient-to-br from-white to-emerald-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full mb-6">
              ♻️ Plataforma de economía circular
            </span>
            <h1 className="text-6xl font-extrabold leading-tight mb-6 text-gray-900">
              Alarga la vida de tu{" "}
              <span className="text-green-700 italic">tecnología</span>
            </h1>
            <p className="text-gray-600 text-xl mb-8">
              Conectamos tus dispositivos con centros de reparación y reciclaje verificados.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/registro"
                className="bg-green-700 text-white px-6 py-4 rounded-2xl font-bold hover:bg-green-800 transition focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
                aria-label="Registrar mi dispositivo"
              >
                Registrar mi Dispositivo
              </Link>
              <Link
                href="/convenios"
                className="border border-green-700 text-green-700 px-6 py-4 rounded-2xl font-bold hover:bg-green-50 transition"
              >
                Ver Convenios
              </Link>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
              alt="Laptop sobre una mesa de trabajo"
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3 pasos RNF-08 */}
      <section className="px-8 py-20 bg-white" aria-label="Cómo funciona EcoLink Tech">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-emerald-900 mb-12">
            Empieza en 3 pasos simples
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {PASOS.map((paso) => (
              <Link
                key={paso.num}
                href={paso.href}
                className="group bg-emerald-50 rounded-2xl p-8 text-center hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-green-700"
                aria-label={`Paso ${paso.num}: ${paso.titulo}`}
              >
                <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center text-xl font-extrabold mx-auto mb-4 group-hover:scale-110 transition">
                  {paso.num}
                </div>
                <h3 className="font-bold text-lg text-emerald-900 mb-2">{paso.titulo}</h3>
                <p className="text-gray-500 text-sm">{paso.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}