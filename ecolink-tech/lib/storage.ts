// lib/storage.ts
export const saveDevice = (device: any) => {
  localStorage.setItem("device", JSON.stringify(device));
};

export const getDevice = () => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("device");
  return data ? JSON.parse(data) : null;
};