const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    if (options.isServer) {
      config.externals = [
        "@tanstack/react-query",
        ...config.externals,
      ];
    }
    const reactQueryPath = path.resolve(
      require.resolve("@tanstack/react-query")
    );
    config.resolve.alias["@tanstack/react-query"] = reactQueryPath;
    return config;
  },
};

module.exports = nextConfig;
