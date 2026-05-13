// __tests__/storage.test.ts
import { getSession, saveSession, logout, saveDevice, getDevice } from "@/lib/storage";

const mockUser = {
  id_usuario: 1,
  name: "Test User",
  email: "test@ecolink.com",
  rol: "ciudadano",
};

const mockDevice = { marca: "Samsung", modelo: "Galaxy S21", estado: 80 };

beforeEach(() => {
  localStorage.clear();
});

describe("Session management", () => {
  test("getSession returns null when no session exists", () => {
    expect(getSession()).toBeNull();
  });

  test("saveSession stores user and getSession retrieves it", () => {
    saveSession(mockUser);
    const session = getSession();
    expect(session).not.toBeNull();
    expect(session?.email).toBe("test@ecolink.com");
    expect(session?.name).toBe("Test User");
    expect(session?.rol).toBe("ciudadano");
  });

  test("logout removes session from localStorage", () => {
    saveSession(mockUser);
    logout();
    expect(getSession()).toBeNull();
  });

  test("saveSession overwrites existing session", () => {
    saveSession(mockUser);
    saveSession({ ...mockUser, name: "Updated User" });
    expect(getSession()?.name).toBe("Updated User");
  });
});

describe("Device management", () => {
  test("getDevice returns null when no device exists", () => {
    expect(getDevice()).toBeNull();
  });

  test("saveDevice stores device and getDevice retrieves it", () => {
    saveDevice(mockDevice);
    const device = getDevice();
    expect(device).not.toBeNull();
    expect(device?.marca).toBe("Samsung");
    expect(device?.modelo).toBe("Galaxy S21");
    expect(device?.estado).toBe(80);
  });

  test("saveDevice overwrites existing device", () => {
    saveDevice(mockDevice);
    saveDevice({ ...mockDevice, modelo: "Galaxy S22" });
    expect(getDevice()?.modelo).toBe("Galaxy S22");
  });
});
