/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placeholder.com'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Fix for placeholder images 404 errors
  async rewrites() {
    return [
      {
        source: '/:lang/placeholder.svg',
        destination: '/placeholder.svg',
      },
      {
        source: '/:lang/:path*/placeholder.svg',
        destination: '/placeholder.svg',
      },
    ]
  },
  // Add performance optimizations
  experimental: {
    // Enable optimizations for Next.js 15
    optimizeCss: true,
    // Improved memory usage
    memoryBasedWorkersCount: true,
    // Optimize bundle size
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    // Configure caching behavior
    staleTimes: {
      dynamic: 60, // 60 seconds for dynamic content
    },
  },
  // Optimize build output
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Optimize image loading
  productionBrowserSourceMaps: false,
  // Remove the i18n configuration as it's not compatible with App Router
  // App Router has built-in internationalization support via route segments
}

export default nextConfig
