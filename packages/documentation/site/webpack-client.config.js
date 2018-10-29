var path = require('path')
const root = path.join(__dirname, '..', '..', '..')

module.exports = (env, argv) => {
	const isDev = argv.mode !== 'production'
	return {
		mode: 'development',
		entry: [path.join(__dirname, 'client.tsx')],
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
}
