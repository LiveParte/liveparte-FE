// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// const withPWA = require('next-pwa');

// const nextConfig = {
//   reactStrictMode: false,
//   onDemandEntries: {
//     maxInactiveAge: 10 * 1000,
//     pagesBufferLength: 1,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         pathname: '**',
//       },
//     ],
//   },
//   // pwa: {
//   //   dest: 'public',
//   //   disable: process.env.NODE_ENV === 'development',
//   //   runtimeCaching: [
//   //     {
//   //       urlPattern: /^https:\/\/res\.cloudinary\.com\/.*\.(mp4|webm)$/,
//   //       handler: 'CacheFirst',
//   //       options: {
//   //         cacheName: 'cloudinary-videos-cache',
//   //         expiration: {
//   //           maxEntries: 10,
//   //           maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
//   //         },
//   //         cacheableResponse: {
//   //           statuses: [0, 200],
//   //         },
//   //       },
//   //     },
//   //   ],
//   // },
// };

// module.exports = withBundleAnalyzer(withPWA(nextConfig));


const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  swcMinify: false,
  reactStrictMode: false,
  // externalDir,
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 10 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
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
      {
        protocol: 'https',
        hostname:'liveparte-s3-bucket.s3.amazonaws.com',
        pathname: '**',
      }
    ],
  },
  // mode: 'jit',

}
 
module.exports = withBundleAnalyzer(nextConfig)