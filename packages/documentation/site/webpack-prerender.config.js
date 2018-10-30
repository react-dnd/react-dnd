var path = require('path')
const root = path.join(__dirname, '..', '..', '..')

module.exports = {
	mode: 'development',
	entry: path.join(__dirname, 'renderPath.ts'),
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
				test: /\.ts(x|)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						},
					},
				],
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
		extensions: ['.js', '.ts', '.tsx'],
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
}
