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
    unoptimized: false,
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
        source: '/open-source',
        destination: '/open-source-sales-tools',
        permanent: true,
      },
      {
        source: '/open-source/:slug',
        destination: '/open-source-sales-tools/:slug',
        permanent: true,
      },
      {
        source: '/apis/suitecrm',
        destination: '/open-source-sales-tools/suitecrm',
        permanent: true,
      },
      {
        source: '/apis/espocrm',
        destination: '/open-source-sales-tools/espocrm',
        permanent: true,
      },
      {
        source: '/apis/twenty',
        destination: '/open-source-sales-tools/twenty',
        permanent: true,
      },
      {
        source: '/apis/mautic',
        destination: '/open-source-sales-tools/mautic',
        permanent: true,
      },
      {
        source: '/apis/erxes',
        destination: '/open-source-sales-tools/erxes',
        permanent: true,
      },
      {
        source: '/apis/civicrm',
        destination: '/open-source-sales-tools/civicrm',
        permanent: true,
      },
      {
        source: '/tools/:slug',
        destination: '/apis/:slug',
        permanent: true,
      },
      {
        source: '/sales-tools/tool-alpha',
        destination: '/api',
        permanent: true,
      },
      {
        source: '/sales-tools/tool-beta',
        destination: '/api',
        permanent: true,
      },
      {
        source: '/sales-tools/tool-gamma',
        destination: '/api',
        permanent: true,
      },
      {
        source: '/sales-tools/tool-delta',
        destination: '/api',
        permanent: true,
      },
      {
        source: '/drops/drop-1',
        destination: '/api',
        permanent: true,
      },
      {
        source: '/drops/drop-4',
        destination: '/api',
        permanent: true,
      },
      {
        source: '/apis/drift',
        destination: '/api',
        permanent: true,
      },
      {
        source: '/apis/intercom',
        destination: '/api',
        permanent: true,
      },
      {
        source: '/apis/get-response',
        destination: '/api',
        permanent: true,
      },
      {
        source: '/apis/kustomer',
        destination: '/api',
        permanent: true,
      },
      {
        source: '/sales-tools/:slug',
        destination: '/apis/:slug',
        permanent: true,
      },
      {
        source: '/sales-tools',
        destination: '/api',
        permanent: true,
      },
      {
        source: '/tools',
        destination: '/api',
        permanent: true,
      },
      {
        source: '/drops',
        destination: '/api',
        permanent: true,
      },
      {
        source: '/drops/:slug',
        destination: '/api',
        permanent: true,
      },
      {
        source: '/skills/crm-updater',
        destination: '/skills',
        permanent: true,
      },
      {
        source: '/skills/follow-up-drafter',
        destination: '/skills',
        permanent: true,
      },
      {
        source: '/skills/founder-led-sales',
        destination: '/skills',
        permanent: true,
      },
      {
        source: '/skills/pricing-strategy',
        destination: '/skills',
        permanent: true,
      },
      {
        source: '/skills/lead-qualifier',
        destination: '/skills',
        permanent: true,
      }
    ]
  },
}

export default nextConfig
