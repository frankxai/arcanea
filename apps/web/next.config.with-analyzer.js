/** @type {import('next').NextConfig} */

// Optional: Install @next/bundle-analyzer to use this config
// pnpm add -D @next/bundle-analyzer
//
// Then rename this file to next.config.js (backup the original first)
// Run: ANALYZE=true pnpm run build

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // React 19 strict mode for better debugging
  reactStrictMode: true,

  // Power consumption optimization
  poweredByHeader: false,

  // Experimental features for Next.js 16
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],

    // Enable React 19 compiler optimizations
    reactCompiler: true,

    // Enable PPR (Partial Prerendering) for optimal performance
    ppr: 'incremental',

    // Turbopack configuration for monorepo
    turbo: {
      root: '../../',
    },
  },

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.in',
      },
      {
        protocol: 'https',
        hostname: 'arcanea.ai',
      },
      {
        protocol: 'https',
        hostname: 'cdn.arcanea.ai',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
    };

    // Handle canvas for server-side rendering
    if (isServer) {
      config.externals = [...(config.externals || []), 'canvas'];
    }

    return config;
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // TypeScript and ESLint configuration
  typescript: {
    // Enforce type checking during builds
    ignoreBuildErrors: false,
  },
  eslint: {
    // Enforce linting during builds
    ignoreDuringBuilds: false,
  },

  // Logging
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
};

module.exports = withBundleAnalyzer(nextConfig);
