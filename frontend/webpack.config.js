const { mergeWithRules } = require('webpack-merge');
const commonConfig = require('./webpack/webpack.common.js');
const prodConfig = require('./webpack/webpack.prod.js');
const devConfig = require('./webpack/webpack.dev.js');

module.exports = (env, argv) => {
  const envConfig = argv.mode === 'production' ? prodConfig : devConfig;

  return mergeWithRules({
    module: {
      rules: {
        test: 'match',
        use: 'replace',
      },
    },
  })(commonConfig, envConfig);
};
