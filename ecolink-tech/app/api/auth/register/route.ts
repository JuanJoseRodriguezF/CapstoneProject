// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { nombre, correo, password, rol, telefono, ciudad } = await req.json();

  if (!nombre || !correo || !password) {
    return NextResponse.json(
      { error: "nombre, correo y password son requeridos" },
      { status: 400 }
    );
  }

  const existe = await prisma.usuario.findUnique({ where: { correo } });
  if (existe) {
    return NextResponse.json(
      { error: "Ya existe una cuenta con ese correo" },
      { status: 409 }
    );
  }

  const usuario = await prisma.usuario.create({
    data: { nombre, correo, password, rol: rol ?? "ciudadano", telefono, ciudad },
    select: { id_usuario: true, nombre: true, correo: true, rol: true },
  });

  return NextResponse.json({ success: true, usuario }, { status: 201 });
}
