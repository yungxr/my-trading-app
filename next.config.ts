import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@tsparticles"],
};

module.exports = {
  images: {
    domains: [], // Оставьте пустым для локальных файлов
  },
};

export default nextConfig;
