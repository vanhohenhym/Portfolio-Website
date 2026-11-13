import type { NextConfig } from "next";

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only; `next build` writes the site to `out/`.
  output: "export",
  trailingSlash: true,
  basePath,
};

export default nextConfig;
