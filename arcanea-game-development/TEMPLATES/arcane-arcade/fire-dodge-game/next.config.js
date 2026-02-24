/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Arcanea-specific optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'zustand'],
  },
  
  // Image optimization for game assets
  images: {
    domains: ['cdn.arcanea.ai', 'assets.arcanea.ai'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Arcanea branding
  generateBuildId: async () => {
    return `arcanea-build-${Date.now()}`;
  },
  
  // Trailing slash
  trailingSlash: false,
  
  // Export configuration
  output: 'export',
  
  // Webpack configuration for game optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          game: {
            test: /[\\/]node_modules[\\/](game|phaser|three)[\\/]/,
            name: 'game',
            chunks: 'all',
          },
        },
      },
    };

    return config;
  },
};

module.exports = nextConfig;