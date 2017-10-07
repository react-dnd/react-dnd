var path = require('path')
var webpack = require('webpack')
var resolvers = require('../scripts/resolvers')

var isDev = process.env.NODE_ENV !== 'production'

module.exports = {
	entry: path.join(__dirname, 'renderPath.js'),

	output: {
		path: path.join(__dirname, '..', '__site_prerender__'),
		filename: 'renderPath.js',
		libraryTarget: 'commonjs2',
	},

	target: 'node',

	module: {
		rules: [
			{
				test: /\.md$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: false,
						},
					},
					path.join(__dirname, '../scripts/markdownLoader'),
				],
			},
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: 'null-loader',
			},
			{
				test: /\.less$/,
				use: 'null-loader',
			},
			{
				test: /\.png$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							query: {
								mimetype: 'image/png',
								name: 'images/[name]-[hash].[ext]',
							},
						},
					},
				],
			},
		],
	},

	resolve: {
		modules: [
			path.join(__dirname, '..', 'node_modules'),
			path.join(__dirname, '..', 'packages', 'dnd-core', 'node_modules'),
			path.join(__dirname, '..', 'packages', 'react-dnd', 'node_modules'),
			path.join(
				__dirname,
				'..',
				'packages',
				'react-dnd-html5-backend',
				'node_modules',
			),
		],
		alias: {
			'react-dnd/modules': path.join(__dirname, '../packages/react-dnd/src'),
			'react-dnd': path.join(__dirname, '../packages/react-dnd/src'),
			'react-dnd-html5-backend': path.join(
				__dirname,
				'../packages/react-dnd-html5-backend/src',
			),
			'dnd-core': path.join(__dirname, '../packages/dnd-core/src'),
		},
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			__DEV__: JSON.stringify(isDev || true),
		}),
		resolvers.resolveHasteDefines,
		...(process.env.NODE_ENV === 'production'
			? [
					new webpack.optimize.UglifyJsPlugin({
						compressor: {
							warnings: false,
						},
					}),
				]
			: []),
	],
}
