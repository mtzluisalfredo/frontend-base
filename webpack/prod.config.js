const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const isomorphicConfig = require('./webpack-isomorphic-tools');
const generateScopedName = require('./lib/generateScopedName');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const uglify = new webpack.optimize.UglifyJsPlugin();
const extractCSS = new ExtractTextPlugin('css/[name].min.css');
const providePlugin = new webpack.ProvidePlugin({ Promise: 'es6-promise-promise' });
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicConfig);
const faviconPlugin = new FaviconsWebpackPlugin({
  logo: path.resolve(__dirname, '../src/images/favicon.png'),
  prefix: 'images/[hash]-',
  emitStats: true,
  statsFilename: '../icon-stats.json',
  inject: false,
  persistentCache: false,
  icons: {
    android: false,
    appleIcon: false,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: false,
  },
});
const definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: '"production"',
    API_HOST: JSON.stringify(process.env.API_HOST || 'http://localhost:3000/'),
  },
});

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    bundle: './src/js/index.js',
    thirdparty: './src/js/thirdparty/index.js',
    workers: './src/js/workers/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'js/[name]_[hash].js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loaders: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: [
            [
              'react-css-modules',
              {
                filetypes: {
                  '.scss': {
                    syntax: 'postcss-scss',
                  },
                },
                generateScopedName,
              },
            ],
          ],
        },
      },
      {
        test: /\.s?css$/,
        use: extractCSS.extract([
          {
            loader: 'css-loader',
            options: {
              publicPath: 'images/',
              modules: true,
              getLocalIdent: (context, localIdentName, localName) =>
                generateScopedName(localName, context.resourcePath),
            },
          },
          {
            loader: 'sass-loader?!css-loader',
            options: {
              outputStyle: 'compressed',
              data: '@import "variables";',
              includePaths: [
                path.resolve(__dirname, '../src/scss'),
              ],
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer,
              ],
            },
          },
        ]),
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /.*\.(png|jpe?g|svg)$/i,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              mozjpeg: {
                quality: 60,
              },
            },
          },
        ],
      },
      {
        test: /\.gql$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.join(__dirname, '../src/js'),
    },
  },
  plugins: [
    extractCSS,
    definePlugin,
    uglify,
    webpackIsomorphicToolsPlugin,
    providePlugin,
    faviconPlugin,
  ],
};
