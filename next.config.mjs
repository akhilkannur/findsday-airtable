/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [

    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    unoptimized: true,
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap_index.xml',
        destination: '/sitemap.xml',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/tools/:slug',
        destination: '/apis/:slug',
        permanent: true,
      },
      {
        source: '/tools',
        destination: '/api',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
