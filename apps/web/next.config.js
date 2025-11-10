/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@arcanea/ui"],
  // Disable Turbopack to avoid WSL2 I/O issues
  experimental: {
    turbo: {
      enabled: false
    }
  }
}

module.exports = nextConfig
