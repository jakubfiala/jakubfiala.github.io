const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const DEV = process.env.NODE_ENV === 'development';

const baseConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader?presets[]=env']
      },
      {
        test: /\.glsl$/,
        exclude: /node_modules/,
        use: ['webpack-glsl-loader']
      }
    ]
  }
};

const devConfig = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  entry: './index.js',
  devtool: 'source-map',
  mode: 'development'
};

const prodConfig = {
  performance: { hints: false },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  entry: './index.js',
  mode: 'production',
};

module.exports = Object.assign({}, baseConfig, DEV ? devConfig : prodConfig);
