// app/api/historial/route.ts
export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id_recoleccion = searchParams.get("id_recoleccion");

  if (!id_recoleccion) {
    return NextResponse.json(
      { error: "id_recoleccion es requerido" },
      { status: 400 }
    );
  }

  const historial = await prisma.historialEstado.findMany({
    where: { id_recoleccion: Number(id_recoleccion) },
    orderBy: { fecha: "desc" },
  });

  return NextResponse.json({ historial });
}

export async function POST(req: NextRequest) {
  const { id_recoleccion, estado, responsable } = await req.json();

  if (!id_recoleccion || !estado || !responsable) {
    return NextResponse.json(
      { error: "id_recoleccion, estado y responsable son requeridos" },
      { status: 400 }
    );
  }

  const entrada = await prisma.historialEstado.create({
    data: {
      id_recoleccion: Number(id_recoleccion),
      estado,
      responsable,
    },
  });

  // Actualizar estado de la recolección
  await prisma.recoleccion.update({
    where: { id_recoleccion: Number(id_recoleccion) },
    data: { estado },
  });

  // Si finalizado, actualizar también el residuo
  if (estado === "finalizado") {
    const recoleccion = await prisma.recoleccion.findUnique({
      where: { id_recoleccion: Number(id_recoleccion) },
    });
    if (recoleccion) {
      await prisma.residuo.update({
        where: { id_residuo: recoleccion.id_residuo },
        data: { estado: "finalizado" },
      });
    }
  }

  return NextResponse.json({ success: true, entrada }, { status: 201 });
}
