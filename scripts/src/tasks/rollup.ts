import { noopTask } from './common'
import { existsSync } from 'fs'
import { join } from 'path'
import { task as shellTask } from 'gulp-shell'
import { TaskFunction } from 'gulp'
import { subtaskFail, subtaskSuccess } from '../log'

const cwd = process.cwd()
const rollupConfigPath = join(cwd, 'rollup.config.js')

export function rollupBundle(): TaskFunction {
	return isRollupConfigured() ? execRollup : noopTask
}

function execRollup() {
	return Promise.resolve()
		.then(() => shellTask(['rollup -c rollup.config.js'], { quiet: true }))
		.then(() => subtaskSuccess('rollup'))
		.catch((err) => {
			subtaskFail(err)
			throw err
		})
}

function isRollupConfigured(): boolean {
	return existsSync(rollupConfigPath)
}

export function watchRollup(): TaskFunction {
	return isRollupConfigured()
		? () => Promise.resolve()
		: shellTask(['rollup -c rollup.config.js -w'])
}
