import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // explicitly set root of this workspace
  },
};

export default nextConfig;
