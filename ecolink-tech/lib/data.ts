// lib/data.ts
export type Convenio = {
  id: number;
  nombre: string;
  marca: string;
  tipo: "Reparación" | "Reciclaje" | "Mantenimiento";
  distancia: number;
  direccion: string;
  telefono: string;
  descripcion: string;
  marcasCompatibles: string[];
};

export const convenios: Convenio[] = [
  {
    id: 1,
    nombre: "Centro Autorizado Samsung",
    marca: "Samsung",
    tipo: "Reparación",
    distancia: 2,
    direccion: "Av. Tecnológica 123, Zona Centro",
    telefono: "+1 (555) 100-2000",
    descripcion: "Centro oficial Samsung con técnicos certificados para reparación de smartphones, tablets y electrodomésticos.",
    marcasCompatibles: ["Samsung"],
  },
  {
    id: 2,
    nombre: "Eco Reciclaje Apple",
    marca: "Apple",
    tipo: "Reciclaje",
    distancia: 5,
    direccion: "Calle Verde 456, Parque Industrial",
    telefono: "+1 (555) 200-3000",
    descripcion: "Punto de reciclaje certificado para dispositivos Apple. Recuperación responsable de materiales y datos seguros.",
    marcasCompatibles: ["Apple"],
  },
  {
    id: 3,
    nombre: "TechFix Dell & HP",
    marca: "Dell",
    tipo: "Mantenimiento",
    distancia: 3,
    direccion: "Boulevard Innovación 789, Sector Norte",
    telefono: "+1 (555) 300-4000",
    descripcion: "Servicio técnico especializado en laptops y equipos de escritorio Dell y HP. Mantenimiento preventivo y correctivo.",
    marcasCompatibles: ["Dell", "HP"],
  },
  {
    id: 4,
    nombre: "Acer Service Center",
    marca: "Acer",
    tipo: "Reparación",
    distancia: 7,
    direccion: "Paseo Digital 321, Zona Sur",
    telefono: "+1 (555) 400-5000",
    descripcion: "Centro de servicio autorizado Acer para reparación de laptops, monitores y accesorios.",
    marcasCompatibles: ["Acer"],
  },
  {
    id: 5,
    nombre: "EcoTech Reciclaje General",
    marca: "General",
    tipo: "Reciclaje",
    distancia: 4,
    direccion: "Av. Sustentable 654, Centro Comercial Verde",
    telefono: "+1 (555) 500-6000",
    descripcion: "Acepta cualquier marca y tipo de dispositivo electrónico para reciclaje responsable. Certificado ISO 14001.",
    marcasCompatibles: ["Samsung", "Apple", "Dell", "HP", "Acer", "Lenovo", "Sony", "LG"],
  },
  {
    id: 6,
    nombre: "Lenovo & Sony Repairs",
    marca: "Lenovo",
    tipo: "Mantenimiento",
    distancia: 6,
    direccion: "Calle Circuito 987, Polígono Tecnológico",
    telefono: "+1 (555) 600-7000",
    descripcion: "Taller especializado en equipos Lenovo y Sony. Diagnóstico gratuito y garantía de 90 días en reparaciones.",
    marcasCompatibles: ["Lenovo", "Sony"],
  },
];