const webpack = require('webpack')
const path = require('path')

module.exports = {
	entry: './src/index',
	mode: 'none',
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".json"], 
		alias: { "dnd-core": require.resolve("dnd-core/lib/cjs") },
		modules: [
			path.join(__dirname, 'node_modules'),
			path.join(__dirname, '..', 'dnd-core', 'node_modules'),
			path.join(__dirname, '..', '..', 'node_modules'),
		],
	},
	module: {
		rules: [
			{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
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
