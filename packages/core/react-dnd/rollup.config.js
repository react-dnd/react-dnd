import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'

export default {
	input: path.resolve(__dirname, 'dist/esm/index.js'),
	output: [
		{
			name: 'ReactDnD',
			file: path.resolve(__dirname, 'dist/umd/ReactDnD.js'),
			format: 'umd',
			globals: {
				react: 'React',
				'react-dom': 'ReactDOM',
			},
			plugins: [
				replace({
					values: { 'process.env.NODE_ENV': JSON.stringify('development') },
					delimiters: ['', ''],
				}),
			],
		},
		{
			name: 'ReactDnD',
			file: path.resolve(__dirname, 'dist/umd/ReactDnD.min.js'),
			format: 'umd',
			globals: {
				react: 'React',
				'react-dom': 'ReactDOM',
			},
			plugins: [
				terser(),
				replace({
					values: { 'process.env.NODE_ENV': JSON.stringify('production') },
					delimiters: ['', ''],
				}),
			],
		},
	],
	external: ['react', 'react-dom'],
	plugins: [resolve({ browser: true }), commonjs()],
}
