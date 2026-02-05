import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Compress responses
  compress: true,

  // Image optimization config (for future images)
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Production optimizations
  poweredByHeader: false,
  reactStrictMode: true,

  // Enable experimental features for performance
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
}

export default nextConfig
