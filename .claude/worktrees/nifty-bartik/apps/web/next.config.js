/** @type {import('next').NextConfig} */
const nextConfig = {
  // React 19 strict mode for better debugging
  reactStrictMode: true,

  // Power consumption optimization
  poweredByHeader: false,

  // Experimental features for Next.js 16
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Turbopack configuration for monorepo (moved to top-level in Next.js 16)
  turbopack: {
    root: '../../',
  },

  // Enable Cache Components (includes PPR functionality) for Next.js 16
  // Note: Set to true when ready for full cache components adoption
  // cacheComponents: true,

  // React compiler disabled - requires babel-plugin-react-compiler installation
  // reactCompiler: true,

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

  // TypeScript configuration
  typescript: {
    // All TypeScript errors fixed - strict checking enabled
    ignoreBuildErrors: false,
  },
  // Note: eslint config moved to next.config.js CLI options in Next.js 16
  // Use `next lint` command directly for linting

  // Logging
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
};

module.exports = nextConfig;
