// __tests__/api.auth.test.ts
import { POST as registerPOST } from "@/app/api/auth/register/route";
import { POST as loginPOST } from "@/app/api/auth/login/route";
import { NextRequest } from "next/server";

// Mock de Prisma
jest.mock("@/lib/db", () => ({
  prisma: {
    usuario: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

import { prisma } from "@/lib/db";

const makeRequest = (body: object) =>
  new NextRequest("http://localhost/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

describe("POST /api/auth/register", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 400 when required fields are missing", async () => {
    const res = await registerPOST(makeRequest({ nombre: "Test" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  test("returns 409 when email already exists", async () => {
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue({ id_usuario: 1 });
    const res = await registerPOST(makeRequest({ nombre: "Test", correo: "test@test.com", password: "123456" }));
    expect(res.status).toBe(409);
  });

  test("returns 201 and creates user successfully", async () => {
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.usuario.create as jest.Mock).mockResolvedValue({
      id_usuario: 1, nombre: "Test", correo: "test@test.com", rol: "ciudadano",
    });
    const res = await registerPOST(makeRequest({ nombre: "Test", correo: "test@test.com", password: "123456" }));
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.usuario.correo).toBe("test@test.com");
  });
});

describe("POST /api/auth/login", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 400 when fields are missing", async () => {
    const res = await loginPOST(makeRequest({ correo: "test@test.com" }));
    expect(res.status).toBe(400);
  });

  test("returns 401 when user not found", async () => {
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue(null);
    const res = await loginPOST(makeRequest({ correo: "x@x.com", password: "wrong" }));
    expect(res.status).toBe(401);
  });

  test("returns 401 when password is incorrect", async () => {
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue({
      id_usuario: 1, nombre: "Test", correo: "test@test.com", password: "correct", rol: "ciudadano",
    });
    const res = await loginPOST(makeRequest({ correo: "test@test.com", password: "wrong" }));
    expect(res.status).toBe(401);
  });

  test("returns 200 with user data on successful login", async () => {
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue({
      id_usuario: 1, nombre: "Test", correo: "test@test.com", password: "demo123", rol: "ciudadano",
    });
    const res = await loginPOST(makeRequest({ correo: "test@test.com", password: "demo123" }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.usuario.correo).toBe("test@test.com");
  });
});
