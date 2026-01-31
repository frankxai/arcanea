/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  async rewrites() {
    return [
      {
        source: '/api/vision/:path*',
        destination: '/api/vision/:path*',
      },
    ];
  },
};

module.exports = nextConfig;