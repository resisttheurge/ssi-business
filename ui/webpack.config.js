'use strict'

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

/**
 * webpack configuration file
 *
 * webpack's configuration is notoriously complicated, so comments are included
 * to hopefully aid understanding
 *
 * a webpack configuration file is just a node module, and webpack expects it
 * to have an object with configuration information as its only export.
 * for those unfamiliar with node, this means that the `module.exports`
 * variable should contain the configuration object.
 *
 * since a webpack configuration file is just a node module, it can contain
 * any arbitrary javascript that might be useful. for example, in this
 * configuration file, we define a function, `buildConfig`, which creates our
 * webpack configuration object, configures it, and returns it. we call this
 * function in the final statement of the file, which sets the `module.exports`
 * variable to the result of the function call. while ultimately an unnecessary
 * abstraction for the purposes of this project, it may be helpful in
 * understanding the nature of a webpack configuration file.
 */

// flag set to true if in a production environment
// the 'build' npm_lifecycle_event indicates a production build
var production = process.env.npm_lifecycle_event === 'build'

// builds a webpack config object (used to generate `module.exports`)
function buildConfig() {

  // initialize config object (returned at end of function)
  // Reference: http://webpack.github.io/docs/configuration.html
  var config = {}

  // devtool determines style and type of generated source maps
  // source maps allow browsers to link sections of transpiled javascript to
  // the original source files, which in turn allows for a much better
  // debugging experience
  // Reference: http://webpack.github.io/docs/configuration.html#devtool
  config.devtool = production ? 'source-map' : 'eval-source-map'

  // the entry point (or points) of the application.
  // for each entry point, webpack will create at least one output file.
  // Reference: http://webpack.github.io/docs/configuration.html#entry
  config.entry = {
    app: path.resolve(__dirname, 'app/index.js')
  }

  // location and naming of webpack's output
  // Reference: http://webpack.github.io/docs/configuration.html#module-loaders
  config.output = {
    // root location of all output
    path: path.resolve(__dirname, 'dist/'),
    // public location of output. in production, root level. otherwise hosted
    // by the webpack dev server at root level on http://localhost:8080/
    publicPath: production ? '/' : 'http://localhost:8080/',
    // entry point naming convention. hash is added in production
    filename: production ? '[name].[hash].js' : '[name].js',
    // non-entry point naming convention. hash is added in production
    chunkFilename: production ? '[name].[hash].js' : '[name].js'
  }

  // the resolve object is used to determine where and what to look for when
  // importing in javascript.
  config.resolve = {
    // allowed implicit extensions for imports
    extensions: [
      '',
      '.js',
      '.css', '.scss', '.sass',
      '.html'
    ],
    // universally accessible recursive search directories. direct children of
    // these directories are importable whithout path operators like '.' or '..'
    modulesDirectories: [
      'assets',
      'components',
      'node_modules',
      'shared'
    ]
  }


  // initialize the module configuration object
  config.module = {}

  // the real meat of webpack. loaders are programs that process source files
  // for consumption by webpack.
  // Reference: http://webpack.github.io/docs/configuration.html#module-loaders
  config.module.loaders = [{
    // js loading
    // transpiles es2015 & stage-0 proposals of es2016 to plain javascript
    // Reference: https://github.com/babel/babel-loader
    test: /\.js$/,
    include: path.resolve(__dirname, 'app/'),
    exclude: /node_modules/,
    loader: 'babel'
  }, {
    // css and sass loading
    // Reference: https://github.com/webpack/style-loader
    // Reference: https://github.com/webpack/css-loader
    // Reference: https://github.com/jtangelder/sass-loader
    test: /\.([s]?css|sass)$/,
    include: [
      path.resolve(__dirname, 'app/'),
      path.resolve(__dirname, 'node_modules/')
    ],
    // this is really complicated! too complicated for comments.
    // if you really need to know, ask someone or look at the webpack
    // documentation in general as well as the documentation for the
    // specific loaders
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    loader:
      production
        ? ExtractTextPlugin.extract(
            'style',
            'css?sourceMap&minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'
          )
        : 'style!css?sourceMap&minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'
  }, {
    // asset loading
    // Reference: https://github.com/webpack/url-loader
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
    include: path.resolve(__dirname, 'app/'),
    loader: 'url?limit=10000'
  }, {
    // html loading
    // Allow loading html through js. very useful for angular templates.
    // Reference: https://github.com/webpack/html-loader
    test: /\.html$/,
    include: path.resolve(__dirname, 'app/'),
    loader: 'html'
  }]

  // initialize global webpack plugins (both dev and prod)
  config.plugins = [

    // runs ng-annotate on preminimized javascript
    // Reference: https://github.com/olov/ng-annotate
    // Reference: https://github.com/jeffling/ng-annotate-webpack-plugin
    new ngAnnotatePlugin(),

    // ensure that all chunks are rendered with a fixed occurence order
    // Reference: https://github.com/webpack/docs/wiki/list-of-plugins#occurrenceorderplugin
    new webpack.optimize.OccurenceOrderPlugin(),

    // Render index.html
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'app/index.html'),
      inject: 'body'
    }),

    // Copy assets from the assets folder
    // Reference: https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'app/assets'),
      to: 'assets'
    }])
  ]

  // add production-only plugins
  if(production) {
    config.plugins.push(
      // Extract css files
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      new ExtractTextPlugin('[name].[hash].css'),

      // Only emit files when there are no errors
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      new webpack.NoErrorsPlugin(),

      // Dedupe modules in the output
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      new webpack.optimize.DedupePlugin(),

      // Minify all javascript, switch loaders to minimizing mode
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      new webpack.optimize.UglifyJsPlugin()
    )
  }

  // Dev server configuration
  // Reference: http://webpack.github.io/docs/configuration.html#devserver
  // Reference: http://webpack.github.io/docs/webpack-dev-server.html
  config.devServer = {
    contentBase: path.resolve(__dirname, 'dist'),
    stats: 'minimal'
  }

  // return the finished config
  return config
}

// finally, set our module exports to the result of a call to the `buildConfig`
// function. this is our configuration object.
module.exports = buildConfig()
