// lib/storage.ts
export const saveDevice = (device: any) => {
  localStorage.setItem("device", JSON.stringify(device));
};

export const getDevice = () => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("device");
  return data ? JSON.parse(data) : null;
};

// Auth
export type User = { name: string; email: string };

const USERS_KEY = "ecolink_users";
const SESSION_KEY = "ecolink_session";

const getUsers = (): (User & { password: string })[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

// Inicializa un usuario de prueba si no hay usuarios registrados
export const seedDemoUser = () => {
  if (typeof window === "undefined") return;
  const users = getUsers();
  if (users.length === 0) {
    users.push({ name: "Demo User", email: "demo@ecolink.com", password: "demo123" });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

export const registerUser = (name: string, email: string, password: string): boolean => {
  const users = getUsers();
  if (users.find((u) => u.email === email)) return false;
  users.push({ name, email, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
};

export const loginUser = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return null;
  const session: User = { name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

export const getSession = (): User | null => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};