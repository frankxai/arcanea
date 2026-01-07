/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@arcanea/ui", "@arcanea/database", "@arcanea/ai-core"],
  experimental: {
    optimizePackageImports: ["@arcanea/ui"],
  },
  images: {
    domains: [
      "cdn.midjourney.com",
      "images.unsplash.com", 
      "arcanea-assets.s3.amazonaws.com"
    ],
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/academy',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/ai/:path*',
        destination: '/api/ai/:path*',
      },
    ]
  },
}

module.exports = nextConfig