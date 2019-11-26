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
			name: 'ReactDnDTouchBackend',
			file: path.resolve(__dirname, 'dist/umd/ReactDnDTouchBackend.js'),
			format: 'umd',
			globals: {
				react: 'React',
				'react-dom': 'ReactDOM',
				'react-dnd': 'ReactDnD',
			},
			plugins: [
				replace({
					values: { 'process.env.NODE_ENV': JSON.stringify('development') },
					delimiters: ['', ''],
				}),
			],
		},
		{
			name: 'ReactDnDTouchBackend',
			file: path.resolve(__dirname, 'dist/umd/ReactDnDTouchBackend.min.js'),
			format: 'umd',
			globals: {
				react: 'React',
				'react-dom': 'ReactDOM',
				'react-dnd': 'ReactDnD',
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
	external: ['react', 'react-dom', 'react-dnd'],
	plugins: [
		resolve(),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
			presets: [
				[
					'@babel/env',
					{
						modules: 'false',
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
