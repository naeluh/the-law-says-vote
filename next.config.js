module.exports = {
  env: {
    OCD_API_KEY: '919b4b875a604655a3b6a6fe7813e3e1',
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    return config;
  },
};
