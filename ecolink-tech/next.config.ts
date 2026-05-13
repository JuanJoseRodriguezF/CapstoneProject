import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["ws", "@prisma/adapter-neon", "@neondatabase/serverless"],
  allowedDevOrigins: ["192.168.56.1", "192.168.1.0/24", "192.168.0.0/24"],
  turbopack: {},
};

export default nextConfig;
