/* eslint @typescript-eslint/no-var-requires: "off" */
const webpack = require('webpack');

module.exports = {
  reactStrictMode: true,
  env: {
    version: '0.1.0',
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      })
    );
    return config;
  },
};
