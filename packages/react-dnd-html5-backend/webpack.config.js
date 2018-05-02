const webpack = require('webpack')
const path = require('path')

module.exports = {
	entry: './src/index',
	mode: 'none',
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		modules: [
			path.join(__dirname, 'node_modules'),
			path.join(__dirname, '..', '..', 'node_modules'),
		],
	},
	module: {
		rules: [
			{
				test: /\.ts(x|)$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
					options: { transpileOnly: true },
				},
			},
		],
	},
	output: {
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
