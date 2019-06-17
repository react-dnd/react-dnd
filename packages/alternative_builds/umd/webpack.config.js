const path = require('path')

function babelLoader(browserslist) {
	return {
		loader: 'babel-loader',
		options: {
			presets: [
				[
					'@babel/preset-env',
					{
						targets: browserslist,
					},
				],
			],
		},
	}
}

function tsLoader() {
	return {
		loader: 'ts-loader',
		options: {
			transpileOnly: true,
		},
	}
}

function createWebpackConfiguration(browserslist) {
	return {
		entry: './index.ts',
		resolve: {
			extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
			alias: {
				'dnd-core': path.join(__dirname, '../../core/dnd-core/src/index.ts'),
			},
			modules: [
				path.join(__dirname, '../../core/react-dnd'),
				path.join(__dirname, '../../core/dnd-core/node_modules'),
				path.join(__dirname, '../../core/react-dnd/node_modules'),
				path.join(__dirname, '../../../node_modules'),
			],
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [babelLoader(browserslist)],
				},
				{
					test: /\.ts(x|)$/,
					exclude: /node_modules/,
					use: [babelLoader(browserslist), tsLoader()],
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
}

module.exports = (env, { mode }) => {
	const commonConfig = createWebpackConfiguration('> 0.25%, not dead')
	return [
		{
			...commonConfig,
			context: path.resolve(__dirname, '../../core/react-dnd/src'),
			output: {
				...commonConfig.output,
				library: 'ReactDnD',
				filename: `ReactDnD.${mode === 'production' ? 'min.' : ''}js`,
			},
		},
		{
			...commonConfig,
			context: path.resolve(__dirname, '../../core/html5-backend/src'),
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
