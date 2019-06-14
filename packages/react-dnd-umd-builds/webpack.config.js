const path = require('path')

const commonConfig = {
	entry: './index.ts',
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
		alias: {
			'dnd-core': path.join(__dirname, '..', 'dnd-core', 'src', 'index.ts'),
		},
		modules: [
			path.join(__dirname, '..', 'react-dnd'),
			path.join(__dirname, '..', 'dnd-core', 'node_modules'),
			path.join(__dirname, '..', 'react-dnd', 'node_modules'),
			path.join(__dirname, '..', '..', 'node_modules'),
		],
	},
	module: {
		rules: [
			{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
			{
				test: /\.ts(x|)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'umd',
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
}

module.exports = (env, { mode }) => {
	return [
		{
			...commonConfig,
			context: path.resolve(__dirname, '../react-dnd/src'),
			output: {
				...commonConfig.output,
				library: 'ReactDnD',
				filename: `ReactDnD.${mode === 'production' ? 'min.' : ''}js`,
			},
		},
		{
			...commonConfig,
			context: path.resolve(__dirname, '../react-dnd-html5-backend/src'),
			output: {
				...commonConfig.output,
				library: 'ReactDnDHTML5Backend',
				filename: `ReactDnDHTML5Backend.${
					mode === 'production' ? 'min.' : ''
				}js`,
			},
		},
	]
}
