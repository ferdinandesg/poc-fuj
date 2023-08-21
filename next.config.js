/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      os: false,
    };
    return config;
  },
  env: {
    PMS_URL: "http://localhost:3000"
  }

};

module.exports = nextConfig;
