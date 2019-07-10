const path = require('path')

function createWebpackConfiguration() {
	return {
		entry: './lib/index.js',
		resolve: {
			alias: {
				'dnd-core': path.join(__dirname, '../../core/dnd-core/lib/index.js'),
			},
			modules: [
				path.join(__dirname, '../../core/react-dnd'),
				path.join(__dirname, '../../core/dnd-core/node_modules'),
				path.join(__dirname, '../../core/react-dnd/node_modules'),
				path.join(__dirname, '../../../node_modules'),
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
	const commonConfig = createWebpackConfiguration()
	return [
		{
			...commonConfig,
			context: path.resolve(__dirname, '../../core/react-dnd'),
			output: {
				...commonConfig.output,
				library: 'ReactDnD',
				filename: `ReactDnD.${mode === 'production' ? 'min.' : ''}js`,
			},
		},
		{
			...commonConfig,
			context: path.resolve(__dirname, '../../core/html5-backend'),
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
