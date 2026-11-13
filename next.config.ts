import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/cases",
        destination: "/work",
        statusCode: 301,
      },
      {
        source: "/portfolio",
        destination: "/work",
        statusCode: 301,
      },
      {
        source: "/projects",
        destination: "/work",
        statusCode: 301,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
