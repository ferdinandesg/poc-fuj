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
    TWILLIO_ID: "AC9a4c0a9a02687fc7268278ac917f5763",
    TWILLIO_AUTH: "6f1fbdffee8a6fd1eca748e344da12d2"
  }

};

module.exports = nextConfig;
