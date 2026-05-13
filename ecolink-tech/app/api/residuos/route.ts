// app/api/residuos/route.ts
export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id_usuario = searchParams.get("id_usuario");

  const residuos = await prisma.residuo.findMany({
    where: id_usuario ? { id_usuario: Number(id_usuario) } : undefined,
    include: { usuario: { select: { nombre: true, correo: true } }, punto: true },
    orderBy: { fecha_registro: "desc" },
  });

  return NextResponse.json({ residuos });
}

export async function POST(req: NextRequest) {
  const { tipo, descripcion, id_usuario, id_punto } = await req.json();

  if (!tipo || !id_usuario) {
    return NextResponse.json(
      { error: "tipo e id_usuario son requeridos" },
      { status: 400 }
    );
  }

  const residuo = await prisma.residuo.create({
    data: { tipo, descripcion, id_usuario: Number(id_usuario), id_punto: id_punto ? Number(id_punto) : null },
  });

  return NextResponse.json({ success: true, residuo }, { status: 201 });
}
