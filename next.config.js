/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-01.daraz.com.np',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'np-live-21.slatic.net',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
