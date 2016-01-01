'use strict';

let path = require('path');
let webpack = require('webpack');
let _ = require('lodash');

let baseConfig = require('./base');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = _.merge({
  entry: [
    'webpack-dev-server/client?http://'+ /*'process.env.IP ||'127.0.0.1' +  process.env.PORT || '8000'*/ '46.101.88.132:8080/',
    'webpack/hot/only-dev-server',
    './src/components/run'
  ],
  cache: true,
  devtool: 'eval',
  // devtool: 'cheap-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ]
}, baseConfig);

config.resolve.alias.adapter =
  path.join(__dirname, '/../src') + '/adapters/SockAdapter';

// Add needed loaders
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
