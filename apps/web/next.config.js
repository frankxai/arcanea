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
  // Note: eslint config moved to eslint.config.js in Next.js 16+
}

module.exports = nextConfig
