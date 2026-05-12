// lib/storage.ts
// Solo maneja la sesión del lado del cliente.
// El registro y login ahora usan los endpoints /api/auth/*

export type User = {
  id_usuario: number;
  name: string;
  email: string;
  rol: string;
};

const SESSION_KEY = "ecolink_session";

export const getSession = (): User | null => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveSession = (user: User) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};

// Dispositivo (sigue en localStorage como caché local)
export const saveDevice = (device: any) => {
  localStorage.setItem("device", JSON.stringify(device));
};

export const getDevice = () => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("device");
  return data ? JSON.parse(data) : null;
};