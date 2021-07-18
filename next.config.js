/* eslint @typescript-eslint/no-var-requires: "off" */
const webpack = require('webpack');
const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: false,
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
  i18n,
};
