var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: './index',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['6to5?experimental'], exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /^react-dnd$/,
      '../../modules/index'
    ),
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