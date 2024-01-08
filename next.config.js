/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "themesberg.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
