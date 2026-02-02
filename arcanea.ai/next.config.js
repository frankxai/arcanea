/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@anthropic-ai/sdk'],
  experimental: {
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arcanea.ai',
      },
      {
        protocol: 'https',
        hostname: 'cdn.arcanea.ai',
      },
    ],
  },
  webpack: (config) => {
    // Enable WebAssembly for Three.js optimizations
    config.experiments = {
      ...config.experiments,
      syncWebAssembly: true,
    };
    
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/studio',
        destination: '/app/studio/page',
      },
      {
        source: '/guardians/:guardian',
        destination: '/app/guardians/[guardian]/page',
      },
      {
        source: '/api/worldbuilding',
        destination: '/api/worldbuilding/route',
      },
      {
        source: '/api/guardians',
        destination: '/api/guardians/route',
      },
    ];
  },
};

export default nextConfig;