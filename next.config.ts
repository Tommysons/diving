import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {
      allowedOrigins: ['lokawndr.com', '*.lokawndr.com'],
    },
  },

  async redirects() {
    return ['313', 'cpn', 'sattakut', 'sw', 'twins', 'udhdhoo', 'wr'].map((site) => ({
      source: `/images/${site}/:path*`,
      destination: `/images/dive-sites/${site}/:path*`,
      permanent: true,
    }))
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [{ key: 'Clerk-Redirect-To', value: '/' }],
      },
    ]
  },
}

export default nextConfig
