/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/",
      destination: "/home-page",
    },
  ],
  images: {
    remotePatterns: [
      {
        // protocol: 'https',
        hostname: process.env.NEXT_IMAGE_DOMAIN,
        // port: '',
        pathname: "/sites/default/files/**",
      },

      {
        // protocol: 'https',
        hostname: "localhost",
        // port: '',
        pathname: "/sites/default/files/**",
      },
    ],
  },
}

module.exports = nextConfig
