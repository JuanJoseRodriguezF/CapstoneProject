// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { correo, password } = await req.json();

  if (!correo || !password) {
    return NextResponse.json(
      { error: "correo y password son requeridos" },
      { status: 400 }
    );
  }

  const usuario = await prisma.usuario.findUnique({ where: { correo } });

  if (!usuario || usuario.password !== password) {
    return NextResponse.json(
      { error: "Correo o contraseña incorrectos" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    usuario: {
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
    },
  });
}
