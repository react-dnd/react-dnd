import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
	input: path.resolve(__dirname, 'packages/core/react-dnd/lib/index.js'),
	output: [
		{
			name: 'ReactDnD',
			file: path.resolve(
				__dirname,
				'packages/core/react-dnd/dist/umd/ReactDnD.js',
			),
			format: 'umd',
		},
		{
			name: 'ReactDnD',
			file: path.resolve(
				__dirname,
				'packages/core/react-dnd/dist/umd/ReactDnD.min.js',
			),
			format: 'umd',
			plugins: [terser()],
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
			exclude: 'node_modules/**',
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
						useBuiltIns: 'usage',
					},
				],
			],
		}),
	],
}
