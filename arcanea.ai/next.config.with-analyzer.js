/** @type {import('next').NextConfig} */

// Optional: Install @next/bundle-analyzer to use this config
// npm install -D @next/bundle-analyzer
//
// Then rename this file to next.config.js (backup the original first)
// Run: ANALYZE=true npm run build

import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // React 19 strict mode for better debugging
  reactStrictMode: true,

  // Power consumption optimization
  poweredByHeader: false,

  // Transpile AI SDK packages for compatibility
  transpilePackages: ['@anthropic-ai/sdk', 'three'],

  // Experimental features for Next.js 16
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-toast',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],

    // Enable React 19 compiler optimizations
    reactCompiler: true,

    // Enable PPR (Partial Prerendering) for optimal performance
    ppr: 'incremental',

    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Image optimization configuration
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
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.in',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Webpack configuration for Three.js and WebAssembly
  webpack: (config, { isServer }) => {
    // Enable WebAssembly
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    // Handle Three.js modules
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
    };

    // Handle canvas for server-side rendering
    if (isServer) {
      config.externals = [...(config.externals || []), 'canvas', 'three'];
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
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
        ],
      },
    ];
  },

  // Rewrites for clean URLs
  async rewrites() {
    return [
      {
        source: '/studio',
        destination: '/studio',
      },
      {
        source: '/guardians/:guardian',
        destination: '/guardians/:guardian',
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

  // Output configuration for deployment
  output: 'standalone',
};

export default bundleAnalyzer(nextConfig);
