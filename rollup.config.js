import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
	input: path.resolve(__dirname, 'packages/core/react-dnd/lib/index.js'),
	output: [
		{
			file: path.resolve(
				__dirname,
				'packages/core/react-dnd/dist/umd/ReacDnD.js',
			),
			format: 'umd',
		},
		{
			file: path.resolve(
				__dirname,
				'packgages/core/react-dnd/dist/umd/ReacDnD.min.js',
			),
			format: 'umd',
		},
	],
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
		terser(),
	],
}
