const webpack = require('webpack')
const path = require('path')

module.exports = {
	entry: './src/index',
	mode: 'production',
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		modules: [
			path.join(__dirname, 'node_modules'),
			path.join(__dirname, '..', '..', 'node_modules'),
		],
	},
	module: {
		rules: [{ test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }],
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
	],
}
