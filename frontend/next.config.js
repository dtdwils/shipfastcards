/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MEDUSA_BACKEND_URL: process.env.MEDUSA_BACKEND_URL,
  },
};

module.exports = nextConfig;
