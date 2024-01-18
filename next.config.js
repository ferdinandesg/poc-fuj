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
    PMS_URL: "https://fast-one-payment-poc-9d1433ac8f17.herokuapp.com",
    AME_API: "http://localhost:3000/api"
  }

};

module.exports = nextConfig;
