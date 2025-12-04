import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {
      allowedOrigins: ['lokawndr.com', '*.lokawndr.com'],
    },
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
