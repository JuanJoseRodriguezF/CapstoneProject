// app/api/puntos/route.ts
export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const puntos = await prisma.puntoRecoleccion.findMany({
    orderBy: { nombre: "asc" },
  });
  return NextResponse.json({ puntos });
}

export async function POST(req: NextRequest) {
  const { nombre, direccion, ciudad } = await req.json();

  if (!nombre || !direccion || !ciudad) {
    return NextResponse.json(
      { error: "nombre, direccion y ciudad son requeridos" },
      { status: 400 }
    );
  }

  const punto = await prisma.puntoRecoleccion.create({
    data: { nombre, direccion, ciudad },
  });

  return NextResponse.json({ success: true, punto }, { status: 201 });
}
