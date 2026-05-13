// __tests__/api.citas.test.ts
import { POST, GET } from "@/app/api/citas/route";
import { NextRequest } from "next/server";

jest.mock("@/lib/db", () => ({
  prisma: {
    cita: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

import { prisma } from "@/lib/db";

const makeRequest = (method: string, body?: object, search?: string) =>
  new NextRequest(`http://localhost/api/citas${search ?? ""}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

const validBody = {
  centroId: 1,
  centroNombre: "Centro Samsung",
  fecha: "2025-09-01",
  hora: "10:00",
  userEmail: "demo@ecolink.com",
};

describe("POST /api/citas", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns 400 when required fields are missing", async () => {
    const res = await POST(makeRequest("POST", { centroId: 1 }));
    expect(res.status).toBe(400);
  });

  test("creates cita and returns 201", async () => {
    (prisma.cita.create as jest.Mock).mockResolvedValue({ id: 1, ...validBody });
    const res = await POST(makeRequest("POST", validBody));
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.cita.userEmail).toBe("demo@ecolink.com");
  });
});

describe("GET /api/citas", () => {
  beforeEach(() => jest.clearAllMocks());

  test("returns all citas when no filter", async () => {
    (prisma.cita.findMany as jest.Mock).mockResolvedValue([{ id: 1, ...validBody }]);
    const res = await GET(makeRequest("GET"));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.citas).toHaveLength(1);
  });

  test("filters citas by userEmail", async () => {
    (prisma.cita.findMany as jest.Mock).mockResolvedValue([{ id: 1, ...validBody }]);
    const res = await GET(makeRequest("GET", undefined, "?userEmail=demo@ecolink.com"));
    expect(res.status).toBe(200);
    expect(prisma.cita.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userEmail: "demo@ecolink.com" } })
    );
  });
});
