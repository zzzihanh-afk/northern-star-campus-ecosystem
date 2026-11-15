/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  devIndicators: false,
  images: {
    domains: ['images.unsplash.com', 'localhost', 'suwiibbjkcfbdnpclgld.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'suwiibbjkcfbdnpclgld.supabase.co',
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
