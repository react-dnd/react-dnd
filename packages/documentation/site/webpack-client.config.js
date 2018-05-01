var path = require('path')
var webpack = require('webpack')
var resolvers = require('../scripts/resolvers')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var isDev = process.env.NODE_ENV !== 'production'
const root = path.join(__dirname, '..', '..', '..')

module.exports = {
	devtool: isDev ? 'cheap-eval-source-map' : 'source-map',

	entry: [path.join(__dirname, 'client.js')].concat(
		isDev
			? [
					'webpack-dev-server/client?http://localhost:8080',
					'webpack/hot/only-dev-server',
			  ]
			: [],
	),

	output: {
		path: path.join(__dirname, '..', '__site__/'),
		filename: isDev ? '[name].js' : '[name]-[hash].js',
		publicPath: '',
	},

	target: 'web',

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
				exclude: /node_modules/,
				use: isDev
					? ['react-hot-loader/webpack', 'babel-loader']
					: ['babel-loader'],
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						path.join(__dirname, '../scripts/cssTransformLoader'),
						'less-loader',
					],
				}),
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
			path.join(root, 'node_modules'),
			path.join(root, 'packages', 'dnd-core', 'node_modules'),
			path.join(root, 'packages', 'react-dnd', 'node_modules'),
			path.join(root, 'packages', 'react-dnd-html5-backend', 'node_modules'),
		],
		alias: {
			'react-dnd/modules': path.join(root, 'packages/react-dnd/src'),
			'react-dnd': path.join(root, 'packages/react-dnd/src'),
			'react-dnd-html5-backend': path.join(
				root,
				'packages/react-dnd-html5-backend/src',
			),
			'dnd-core': path.join(root, 'packages/dnd-core/src'),
		},
	},
	plugins: [
		new ExtractTextPlugin(isDev ? '[name].css' : '[name]-[hash].css'),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			__DEV__: JSON.stringify(isDev || true),
		}),
		resolvers.resolveHasteDefines,
	],
}

if (process.env.NODE_ENV === 'production') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
			},
		}),
	)
}
