const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.config.common.js');
const Dotenv = require('dotenv-webpack');
module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
  new Dotenv(),
    new webpack.DefinePlugin({
      'process.env': {  
        API_URL: JSON.stringify('http://localhost:12000/api/v1'),
        DEPLOY_FRONT_URL: JSON.stringify('http://localhost:4000'),
        DEPLOY_BACK_URL: JSON.stringify('http://localhost:12000/api/v1'),
      }
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
});
