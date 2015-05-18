var path = require('path');
var webpack = require('webpack');
var resolvers = require('../scripts/resolvers');

var isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: path.join(__dirname, 'renderPath.js'),

  output: {
    path: '__site_prerender__/',
    filename: 'renderPath.js',
    libraryTarget: 'commonjs2',
  },

  target: 'node',

  module: {
    loaders: [
      {
        test: /\.md$/,
        loader: [
          'html?{"minimize":false}',
          path.join(__dirname, '../scripts/markdownLoader')
        ].join('!')
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'null-loader'
      },
      {
        test: /\.less$/,
        loader: 'null-loader'
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
        query: { mimetype: 'image/png', name: 'images/[name]-[hash].[ext]' }
      }
    ]
  },

  resolve: {
    alias: {
      'react-dnd/modules': path.join(__dirname, '../src'),
      'react-dnd': path.join(__dirname, '../src')
    }
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': JSON.stringify(isDev || true)
    }),
    resolvers.resolveHasteDefines,
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );
}
