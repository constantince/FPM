/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

module.exports = nextConfig;
