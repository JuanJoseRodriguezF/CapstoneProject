// app/api/citas/route.ts
export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { centroId, centroNombre, fecha, hora, userEmail } = body;

  if (!centroId || !fecha || !hora || !userEmail) {
    return NextResponse.json(
      { error: "Faltan campos requeridos: centroId, fecha, hora, userEmail" },
      { status: 400 }
    );
  }

  const cita = await prisma.cita.create({
    data: { centroId: Number(centroId), centroNombre, fecha, hora, userEmail },
  });

  return NextResponse.json({ success: true, cita }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("userEmail");

  const citas = await prisma.cita.findMany({
    where: userEmail ? { userEmail } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ citas });
}
