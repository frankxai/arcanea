/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack to avoid WSL2 I/O issues
  experimental: {
    // turbo key is invalid in recent Next.js versions if experimental
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // TypeScript and ESLint errors must be fixed before production builds
  // Removed ignoreBuildErrors and ignoreDuringBuilds for code quality
}

module.exports = nextConfig