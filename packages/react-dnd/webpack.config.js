const webpack = require('webpack') // eslint-disable-line import/no-extraneous-dependencies
const path = require('path')

module.exports = {
	entry: './src/index',
	resolve: {
		modules: [
			path.join(__dirname, 'node_modules'),
			path.join(__dirname, '..', 'dnd-core', 'node_modules'),
			path.join(__dirname, '..', '..', 'node_modules'),
		],
	},
	module: {
		rules: [{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }],
	},
	externals: [
		{
			react: {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react',
			},
		},
	],
	output: {
		filename: 'dist/ReactDnD.min.js',
		libraryTarget: 'umd',
		library: 'ReactDnD',
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
	],
}
