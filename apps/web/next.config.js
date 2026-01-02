/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack to avoid WSL2 I/O issues
  experimental: {
    turbo: {
      enabled: false
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
