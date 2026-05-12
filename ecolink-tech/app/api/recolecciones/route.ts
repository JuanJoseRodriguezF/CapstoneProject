// app/api/recolecciones/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id_gestor = searchParams.get("id_gestor");

  const recolecciones = await prisma.recoleccion.findMany({
    where: id_gestor ? { id_gestor: Number(id_gestor) } : undefined,
    include: {
      residuo: true,
      gestor: { select: { nombre: true, correo: true } },
      historial: { orderBy: { fecha: "desc" } },
    },
    orderBy: { fecha_asignacion: "desc" },
  });

  return NextResponse.json({ recolecciones });
}

export async function POST(req: NextRequest) {
  const { id_residuo, id_gestor, fecha_recoleccion } = await req.json();

  if (!id_residuo || !id_gestor) {
    return NextResponse.json(
      { error: "id_residuo e id_gestor son requeridos" },
      { status: 400 }
    );
  }

  const recoleccion = await prisma.recoleccion.create({
    data: {
      id_residuo: Number(id_residuo),
      id_gestor: Number(id_gestor),
      fecha_recoleccion: fecha_recoleccion ? new Date(fecha_recoleccion) : null,
    },
  });

  // Registrar en historial automáticamente
  await prisma.historialEstado.create({
    data: {
      id_recoleccion: recoleccion.id_recoleccion,
      estado: "en proceso",
      responsable: `gestor:${id_gestor}`,
    },
  });

  // Actualizar estado del residuo
  await prisma.residuo.update({
    where: { id_residuo: Number(id_residuo) },
    data: { estado: "asignado" },
  });

  return NextResponse.json({ success: true, recoleccion }, { status: 201 });
}
