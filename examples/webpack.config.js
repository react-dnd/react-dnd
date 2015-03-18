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
    extensions: ['', '.js', '.jsx'],
    alias: {
      // TODO: temporary to work on unreleased 0.13-compat branch
      'react-router': 'react-router/build/npm'
    }
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
