var webpack = require('webpack');

module.exports = {
  entry: './index',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolveLoader: {
    modulesDirectories: ['..', 'node_modules']
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot-loader', 'jsx-loader?harmony'], exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /^react-dnd$/,
      '../../modules/index'
    )
  ]
};
