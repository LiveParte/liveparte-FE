const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 10 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 1,
  },
  // images: {
  //   domains: ['res.cloudinary.com', 'url.com', 'imagedomain.com', 'imagedomain2.com'],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
  // mode: 'jit',

}
 
module.exports = withBundleAnalyzer(nextConfig)