/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@arcanea/ui"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

module.exports = nextConfig;