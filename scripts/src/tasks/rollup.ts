import { noopTask } from './common'
import { join } from 'path'
import { parallel, TaskFunction } from 'gulp'
import { subtaskFail, subtaskSuccess } from '../log'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import rollup = require('rollup')

/* eslint-disable @typescript-eslint/no-var-requires */
const commonjs = require('@rollup/plugin-commonjs')
const replace = require('@rollup/plugin-replace')
/* eslint-enable @typescript-eslint/no-var-requires */

function getUmdConfiguration(): UmdConfig | undefined {
	// eslint-disable-next-line
	const { umd } = require(join(process.cwd(), 'package.json'))
	return umd
}

export function rollupBundle(): TaskFunction {
	const umd = getUmdConfiguration()
	return umd == null
		? noopTask
		: parallel(
				() =>
					rollupDebug(umd)
						.then(() => subtaskSuccess('rollup-dbg'))
						.catch((err: Error) => {
							subtaskFail('rollup-dbg')
							throw err
						}),
				() =>
					rollupMin(umd)
						.then(() => subtaskSuccess('rollup-min'))
						.catch((err: Error) => {
							subtaskFail('rollup-min')
							throw err
						}),
		  )
}

interface UmdConfig {
	name: string
	external: string[]
	input: string
	globals: Record<string, string>
}

async function rollupDebug(config: UmdConfig) {
	const rcfg = debugConfig(config)
	const bundle = await rollup.rollup(rcfg)
	await bundle.write(rcfg)
}
async function rollupMin(config: UmdConfig) {
	const rcfg = minConfig(config)
	const bundle = await rollup.rollup(rcfg)
	await bundle.write(rcfg)
}

export function watchRollup() {
	const umd = getUmdConfiguration()
	if (umd == null) {
		return
	}
	const handleEvent = (task: string) => {
		return ({ code }: { code: string }) => {
			if (code === 'END') {
				subtaskSuccess(task)
			}
			if (code === 'ERROR') {
				subtaskSuccess(task)
			}
		}
	}

	const mcfg = minConfig(umd)
	const dcfg = debugConfig(umd)
	const minWatch = rollup.watch(mcfg)
	const dbgWatch = rollup.watch(dcfg)
	minWatch.on('event', handleEvent('rollup-min'))
	dbgWatch.on('event', handleEvent('rollup-dbg'))
}

function replaceNodeEnv(env: string) {
	return replace({
		values: { 'process.env.NODE_ENV': JSON.stringify(env) },
		delimiters: ['', ''],
	})
}

function debugConfig({
	name,
	input,
	external,
	globals,
}: UmdConfig): rollup.RollupOptions {
	return {
		input,
		external,
		plugins: [
			nodeResolve(NODE_RESOLVE_OPTS),
			commonjs(),
			replaceNodeEnv('development'),
		],
		output: {
			name,
			file: join(process.cwd(), `dist/umd/${name}.js`),
			format: 'umd',
			globals,
		},
	}
}
function minConfig({
	name,
	input,
	external,
	globals,
}: UmdConfig): rollup.RollupOptions {
	return {
		input,
		external,
		plugins: [
			nodeResolve(NODE_RESOLVE_OPTS),
			commonjs(),
			replaceNodeEnv('production'),
			terser(),
		],
		output: {
			name,
			file: join(process.cwd(), `dist/umd/${name}.min.js`),
			format: 'umd',
			globals,
		},
	}
}

const NODE_RESOLVE_OPTS = {
	browser: true,
	mainFields: ['main:bundle', 'module', 'main'],
}
