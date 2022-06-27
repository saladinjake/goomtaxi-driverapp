const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: ['./src/up.js'],
  output: {
    path: `${__dirname}/nodist`,
    publicPath: '/',
    filename: 'bundlex.js'
  },
  module: {
    rules: [
    
    ]
  },
  plugins: [
     new CopyWebpackPlugin([  
       {
        from: `${__dirname}/server/dynamic_server/mongo_api/views`,
        to:`${__dirname}/buildfolder/dynamic_server/mongo_api/services/views`,
      },

    ]),
  ],
};
