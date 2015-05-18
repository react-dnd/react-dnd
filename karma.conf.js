var path = require('path');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ }
        ]
      },
      resolve: {
        alias: {
          'react-dnd/modules': path.join(__dirname, './src'),
          'react-dnd': path.join(__dirname, './src')
        }
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};