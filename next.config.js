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
    ],
  },
}

module.exports = nextConfig
