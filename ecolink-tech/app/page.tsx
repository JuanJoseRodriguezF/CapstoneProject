// app/page.tsx
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Navbar />

      <section className="pt-32 px-8 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-6xl font-extrabold leading-tight mb-6">
              Alarga la vida de tu{" "}
              <span className="text-green-700 italic">tecnología</span>
            </h1>

            <p className="text-gray-600 text-xl mb-8">
              Conectamos tus dispositivos con reparación y reciclaje sostenible.
            </p>

            <Link
              href="/registro"
              className="bg-green-700 text-white px-6 py-4 rounded-2xl font-bold"
            >
              Registrar mi Dispositivo
            </Link>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
}