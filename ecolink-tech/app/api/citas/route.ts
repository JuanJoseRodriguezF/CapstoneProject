// app/api/citas/route.ts
import { NextRequest, NextResponse } from "next/server";

// Almacenamiento en memoria (se reinicia con el servidor)
const citas: {
  id: number;
  centroId: number;
  centrNombre: string;
  fecha: string;
  hora: string;
  userEmail: string;
}[] = [];

let nextId = 1;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { centroId, centroNombre, fecha, hora, userEmail } = body;

  if (!centroId || !fecha || !hora || !userEmail) {
    return NextResponse.json(
      { error: "Faltan campos requeridos: centroId, fecha, hora, userEmail" },
      { status: 400 }
    );
  }

  const cita = { id: nextId++, centroId, centrNombre: centroNombre, fecha, hora, userEmail };
  citas.push(cita);

  return NextResponse.json({ success: true, cita }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("userEmail");

  const resultado = userEmail
    ? citas.filter((c) => c.userEmail === userEmail)
    : citas;

  return NextResponse.json({ citas: resultado });
}
