import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  reactStrictMode: false,
  experimental: {
    nodeMiddleware: true,
  },
};

export default nextConfig;
