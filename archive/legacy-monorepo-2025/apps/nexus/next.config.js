/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@arcanea/guardian-ai',
    '@arcanea/realm-engine',
    '@arcanea/ui-cosmos',
    '@arcanea/manifestation-tools'
  ],
  experimental: {
    turbo: {
      root: '/mnt/c/Users/Frank/Arcanea'
    }
  }
};

module.exports = nextConfig;
