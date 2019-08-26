/* global __dirname */
/* DO NOT USE ES6 in this file */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const isDev = process.env.NODE_ENV !== 'production';
const publicPath = '/';

const modulesLoader = {
  test: /\.(js|jsx|mjs|ts|tsx)$/,
  include: [
    path.join(__dirname, '../'),
    path.join(__dirname, './'),
    /node_modules\/react-native-/,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: isDev,
      compact: !isDev,
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [
        [
          '@babel/transform-runtime',
          {
            helpers: false,
          },

        ],
        '@babel/plugin-proposal-export-namespace-from',
        'lodash',
        ["react-native-web"]
      ],
    },
  },
};

// This is needed for webpack to import static images in JavaScript files
const imageLoaderConfiguration = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg/],
  loader: 'url-loader',
  options: {
    limit: 8000,
    outputPath: 'assets/',
    name: '[name].[ext]',
  },
};

const otherFilesLoaderConfiguration = {
  exclude: [/\.(js|jsx|mjs|ts|tsx)$/, /\.html$/, /\.json$/],
  loader: 'file-loader',
  options: {
    outputPath: 'assets/',
  },
};

module.exports = {
  devServer: {
    open: true,
    port: 3000,
    historyApiFallback: true,
  },

  entry: [path.join(__dirname, '../index.web.js')],

  output: {
    path: path.join(__dirname, '../dist/web'),
    filename: 'bundle.js',
    publicPath,
  },

  module: {
    rules: [
      {
        oneOf: [imageLoaderConfiguration, modulesLoader, otherFilesLoaderConfiguration],
      },
    ],
  },

  plugins: [
    // `process.env.NODE_ENV === 'production'` must be `true` for production
    // builds to eliminate development checks and reduce build size.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.PUBLIC_PATH': JSON.stringify(publicPath),
      __DEV__: JSON.stringify(isDev),
    }),
    new CopyWebpackPlugin(
      [
      ].filter(Boolean)
    ),
    new HtmlWebpackPlugin({
      title: 'RNW',
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new WebpackPwaManifest({
      name: 'RNW',
      short_name: 'RNW',
      description: 'Test RNW integration',
      background_color: '#F5FCFF',
      theme_color: '#43d2fc',
      lang: 'en-US',
      orientation: 'portrait-primary',
      icons: [
      ],
      ios: true,
    }),
  ].filter(Boolean),

  resolve: {
    modules: [path.join(__dirname, '../node_modules'), path.join(__dirname, 'node_modules')],
    // Maps the 'react-native' import to 'react-native-web' and the stubs or mocks.
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.web.tsx', '.tsx', '.web.ts', '.ts'],
  },
  performance: {
    hints: isDev ? false : 'warning',
  },
};
