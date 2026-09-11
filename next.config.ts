import type { NextConfig } from 'next';
const config: NextConfig = {
  allowedDevOrigins: process.env.NEXT_DEV_ALLOWED_ORIGINS?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  poweredByHeader: false,
  experimental: { useTypeScriptCli: false },
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
  async redirects() {
    return [{ source: '/', destination: '/en', permanent: false }];
  },
};
export default config;
