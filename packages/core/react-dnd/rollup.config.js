import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'

export default {
	input: path.resolve(__dirname, 'lib/index.js'),
	output: [
		{
			name: 'ReactDnD',
			file: path.resolve(__dirname, 'dist/umd/ReactDnD.js'),
			format: 'umd',
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
	globals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	plugins: [
		resolve(),
		commonjs(),
		babel({
			presets: [
				[
					'@babel/env',
					{
						modules: 'false',
						corejs: '3.0.0',
						targets: {
							browsers: '> 0.25%, not dead',
							node: 8,
							ie: '11',
						},
					},
				],
			],
		}),
	],
}
