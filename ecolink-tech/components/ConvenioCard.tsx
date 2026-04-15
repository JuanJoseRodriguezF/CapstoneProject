// components/ConvenioCard.tsx
export default function ConvenioCard({ convenio }: any) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6 flex flex-col gap-4">
      
      <div className="flex justify-between">
        <div className="font-bold text-lg">{convenio.nombre}</div>
        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
          {convenio.tipo}
        </span>
      </div>

      <div className="text-gray-500 text-sm">
        Marca: {convenio.marca}
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <span>📍 {convenio.distancia} km</span>
        <span>🕒 Disponible</span>
      </div>

      <button className="mt-4 bg-green-700 text-white py-2 rounded-xl font-semibold hover:bg-green-800 transition">
        Agendar Cita
      </button>
    </div>
  );
}