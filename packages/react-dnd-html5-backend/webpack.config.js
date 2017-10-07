const webpack = require('webpack')
const path = require('path')

module.exports = {
	entry: './src/index',
	resolve: {
		modules: [
			path.join(__dirname, 'node_modules'),
			path.join(__dirname, '..', '..', 'node_modules'),
		],
	},
	module: {
		rules: [{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }],
	},
	output: {
		filename: 'dist/ReactDnDHTML5Backend.min.js',
		libraryTarget: 'umd',
		library: 'ReactDnDHTML5Backend',
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
			},
		}),
	],
}
