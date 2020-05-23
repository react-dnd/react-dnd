import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'

const input = path.resolve(__dirname, 'dist/esm/index.js')
function replaceNodeEnv(env) {
	return replace({
		values: { 'process.env.NODE_ENV': JSON.stringify(env) },
		delimiters: ['', ''],
	})
}
const commonPlugins = [resolve({ browser: true }), commonjs()]
const external = ['react', 'react-dom', 'react-dnd']
const globals = {
	react: 'React',
	'react-dom': 'ReactDOM',
}

export default [
	{
		input,
		external,
		plugins: [...commonPlugins, replaceNodeEnv('development')],
		output: [
			{
				name: 'ReactDnD',
				file: path.resolve(__dirname, 'dist/umd/ReactDnD.js'),
				format: 'umd',
				globals,
			},
		],
	},
	{
		input,
		external,
		plugins: [...commonPlugins, replaceNodeEnv('production'), terser()],
		output: [
			{
				name: 'ReactDnD',
				file: path.resolve(__dirname, 'dist/umd/ReactDnD.min.js'),
				format: 'umd',
				globals,
			},
		],
	},
]
