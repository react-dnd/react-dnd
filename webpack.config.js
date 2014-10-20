var webpack = require('webpack');

module.exports = {
  entry: './modules/index',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony' }
    ]
  },
  output: {
    filename: 'dist/ReactDND.min.js',
    libraryTarget: 'umd',
    library: 'ReactDND'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};