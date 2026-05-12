import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
  allowedDevOrigins: ["192.168.56.1", "192.168.1.0/24", "192.168.0.0/24"],
};

export default nextConfig;
