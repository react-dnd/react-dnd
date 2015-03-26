var webpack = require('webpack');

module.exports = {
  entry: './index',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      // TODO: temp dnd-core for npm link
      { test: /\.js$/, loaders: ['6to5?experimental'], exclude: /node_modules|dnd-core/ }
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /^react-dnd$/,
      '../../modules/index'
    )
  ]
};
