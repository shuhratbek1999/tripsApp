// next.config.js
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        ignored: [
          path.resolve("C:\\pagefile.sys"),
          "**/node_modules/**",
          "**/.next/**",
          "**/out/**",
        ],
      };
    }

    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = nextConfig;
