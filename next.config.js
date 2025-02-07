/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'img.buymeacoffee.com',
      },
    ],
  },
  // // Optimize JavaScript bundles
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production',
  // },
  // experimental: {
  //   optimizeCss: true,
  //   optimizePackageImports: ['@mui/icons-material', '@mui/material'],
  // },
  // // Configure script loading
  // scripts: {
  //   strategy: 'lazyOnload',
  // },
}

module.exports = nextConfig
