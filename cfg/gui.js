'use strict';

let path = require('path');
let webpack = require('webpack');
let _ = require('lodash');

let baseConfig = require('./base');


const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = _.merge({
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8000',
    'webpack/hot/only-dev-server',
    './src/components/run'
  ],
  cache: true,
  // devtool: 'eval',
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ]
}, baseConfig);

// Add needed loaders
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});
config.target = webpackTargetElectronRenderer(config);
module.exports = config;
