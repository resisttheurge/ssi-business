'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// flag indicating production environment (npm build lifecycle event)
const production = process.env.npm_lifecycle_event === 'build'

// source map strategy
const devtool = 'source-map'

// entry file(s)
const entry = {
  app: path.resolve(__dirname, 'app/index.js')
}

// output options and file(s)
const output = {
  path: path.resolve(__dirname, 'dist', 'app'),
  publicPath: production ? 'http://10.1.1.136/' : 'http://localhost:8080/',
  filename: '[name].[hash].js',
  chunkFilename: '[name].[hash].js'
}

// module import resolution
const resolve = {

  // allowed file extensions for module import expressions
  extensions: [
    '',
    '.js',
    '.css', '.less', '.scss', '.sass',
    '.html'
  ],

  // npm module directory matchers
  modulesDirectories: [

    // node libraries
    'node_modules',

    // web assets
    'assets',

    // javascript library
    'lib',

    // angular templates
    'templates',

    // angular injectables
    'animations',
    'components',
    'configs', // scripts executed by angular.module(...).config()
    'constants',
    'controllers',
    'decorators',
    'directives',
    'factories',
    'filters',
    'modules',
    'providers',
    'scripts', // scripts executed by angular.module(...).run()
    'services',
    'values'
  ]
}

const _module = {

  preLoaders: [{
    // edge case of non-es6-module-compatible dependency, solved by
    // auto-injecting its dependencies and required output
    test: /restangular(.min)?.js$/,
    include: /node_modules/,
    loaders: ['imports?angular=angular&_=lodash', 'exports?"restangular"']
  }, {
    // similar situation for the angular component router
    test: /angular_1_router.js$/,
    include: /node_modules/,
    loaders: ['exports?"ngComponentRouter"']
  }],

  loaders: [{
    test: /\.js$/,
    include: [/app/, /assets/],
    exclude: /node_modules/,
    loaders: ['ng-annotate', 'babel']
  }, {
    test: /\.html$/,
    include: [/app/, /assets/],
    exclude: [/node_modules/, path.resolve(__dirname, 'app/index.html')],
    loaders: ['ngtemplate', 'html']
  }, {
    test: /\.css$/,
    include: [/app/, /assets/, /node_modules/],
    loaders: [
      'classnames',
      ExtractTextPlugin.extract(
        'style',
        'css?sourceMap?localIdentName=[path][name]---[local]---[hash:base64:5]'
      )
    ]
  }, {
    test: /\.s[ca]ss$/,
    include: [/app/, /assets/, /node_modules/],
    loaders: ['classnames', ExtractTextPlugin.extract('style', 'css?sourceMap!sass')]
  }, {
    test: /\.less$/,
    include: [/app/, /assets/, /node_modules/],
    loaders: ['classnames', ExtractTextPlugin.extract('style', 'css?sourceMap!less')]
  }, {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico|json)$/,
    include: [/app/, /lib/, /assets/],
    exclude: /node_modules/,
    loaders: ['url?limit=10000&name=[path][name].[ext]?[hash]']
  }]
}

const prodPlugins =
  production ? [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false
    })
  ] : []

const plugins = [

  // safe reliance on filename hashing
  new webpack.optimize.OccurenceOrderPlugin(),
  new HtmlWebpackPlugin({
    template: `html?interpolate!${path.resolve(__dirname, 'app/index.html')}`,
    inject: 'head'
  }),
  new ExtractTextPlugin('[name].[hash].css'),
  ...prodPlugins,
]

const devServer = {
  historyApiFallback: true,
  contentBase: 'http://localhost:8080/',
  stats: {
    colors: true
  }
}

module.exports = {
  devtool,
  entry,
  output,
  resolve,
  module: _module,
  plugins,
  devServer
}
