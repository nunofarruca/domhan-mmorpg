const { merge } = require('webpack-merge');
const commonConfig = require('./webpack/webpack.common.js');

module.exports = (env, argv) => {
  const envMode = argv.mode === 'production' ? 'prod' : 'dev';

  console.log('\x1b[34m%s\x1b[0m', `Webpack build in mode: ${envMode}`);

  const envConfig = require(`./webpack/webpack.${envMode}.js`);
  const config = merge(commonConfig, envConfig);
  return config;
};
