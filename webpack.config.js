/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

function createWebpackConfiguration() {
	return {
		entry: './lib/index.js',
		resolve: {
			alias: {
				'dnd-core': path.join(__dirname, 'packages/core/dnd-core'),
			},
			modules: [
				path.join(__dirname, 'packages/core/react-dnd'),
				path.join(__dirname, 'packages/core/dnd-core/node_modules'),
				path.join(__dirname, 'packages/core/react-dnd/node_modules'),
				path.join(__dirname, 'node_modules'),
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
				'react-dnd': {
					root: 'ReactDnD',
					commonjs2: 'react-dnd',
					commonjs: 'react-dnd',
					amd: 'react-dnd',
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
			context: path.resolve(__dirname, 'packages/core/react-dnd'),
			output: {
				...commonConfig.output,
				path: path.resolve(__dirname, 'packages/core/react-dnd/dist/umd'),
				library: 'ReactDnD',
				filename: `ReactDnD.${mode === 'production' ? 'min.' : ''}js`,
			},
		},
		{
			...commonConfig,
			context: path.resolve(__dirname, 'packages/core/html5-backend'),
			output: {
				...commonConfig.output,
				path: path.resolve(__dirname, 'packages/core/html5-backend/dist/umd'),
				library: 'ReactDnDHTML5Backend',
				filename: `ReactDnDHTML5Backend.${
					mode === 'production' ? 'min.' : ''
				}js`,
			},
		},
		{
			...commonConfig,
			context: path.resolve(__dirname, 'packages/core/touch-backend'),
			output: {
				...commonConfig.output,
				path: path.resolve(__dirname, 'packages/core/touch-backend/dist/umd'),
				library: 'ReactDnDTouchBackend',
				filename: `ReactDnDTouchBackend.${
					mode === 'production' ? 'min.' : ''
				}js`,
			},
		},
	]
}
