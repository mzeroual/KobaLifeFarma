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
  // Add experimental options for Next.js 15
  experimental: {
    // Configure caching behavior
    staleTimes: {
      dynamic: 30, // 30 seconds for dynamic content
    },
  },
  // Remove the i18n configuration as it's not compatible with App Router
  // App Router has built-in internationalization support via route segments
}

export default nextConfig
