const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'url.com', 'imagedomain.com', 'imagedomain2.com'],
  },

}
 
module.exports = withBundleAnalyzer(nextConfig)