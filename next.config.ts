import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  reactStrictMode: false,
  serverRuntimeConfig:{
    runtime: "nodejs"
  },
  serverExternalPackages: ['bcryptjs', 'crypto'],
  experimental: {
    nodeMiddleware: true,
  },
};

export default nextConfig;
