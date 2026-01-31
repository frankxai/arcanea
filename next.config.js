// Next.js Configuration for Arcanea Library
const { withSuperbrain } = require('@superbrain/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // FrankX Brand Performance Optimizations
  reactStrictMode: true,
  swcMinify: true,
  
  // Image Optimization for FrankX Visual Standards
  images: {
    domains: ['localhost', 'arcanea.io'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Environment Variables for Arcanea Integration
  env: {
    ARCANEA_API_URL: process.env.ARCANEA_API_URL,
    SUPERBRAIN_KEY: process.env.SUPERBRAIN_KEY,
  },

  // Webpack Configuration for Custom Animations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    
    // Custom animation and effects support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    return config;
  },

  // Performance Optimizations
  poweredByHeader: false,
  compress: true,
  
  // Headers for Security and Performance
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

  // FrankX Brand Headers
  async rewrites() {
    return [
      {
        source: '/library',
        destination: '/arcanea-library',
      },
    ];
  },
};

// Superbrain Integration for AI Enhancement
module.exports = withSuperbrain(nextConfig);