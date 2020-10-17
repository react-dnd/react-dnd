import { FSWatcher } from 'fs'
import { noopStep } from './common'
import { subtaskSuccess, subtaskFail } from '../log'
import { src, dest, watch, TaskFunction, parallel } from 'gulp'
import babel = require('gulp-babel')
import debug = require('gulp-debug')
import plumber = require('gulp-plumber')

/* eslint-disable @typescript-eslint/no-var-requires */
const babelCjsConfig = require('../../config/babel.config.cjs')
const babelEsmConfig = require('../../config/babel.config.cjs')
/* eslint-enable  @typescript-eslint/no-var-requires */

const BABEL_GLOBS = ['lib/**/*.js']

/**
 * Transpile ts output into babel cjs
 * @param verbose
 */
function babelCjs(logFiles: boolean, listen: boolean): TaskFunction {
	const title = 'babel-cjs'
	return function execute() {
		const task: NodeJS.ReadWriteStream = src(BABEL_GLOBS)
			.pipe(
				plumber({
					errorHandler: !listen,
				}),
			)
			.pipe(babel(babelCjsConfig))
			.pipe(logFiles ? debug({ title }) : noopStep())
			.pipe(dest('dist/cjs'))

		if (listen) {
			task.on('end', () => subtaskSuccess(title))
			task.on('error', () => subtaskFail(title))
		}
		return task
	}
}

/**
 * Transpile ts output into babel esm
 * @param verbose
 */
function babelEsm(logFiles: boolean, listen: boolean): TaskFunction {
	const title = 'babel-esm'
	return function execute() {
		const task: NodeJS.ReadWriteStream = src(BABEL_GLOBS)
			.pipe(
				plumber({
					errorHandler: !listen,
				}),
			)
			.pipe(babel(babelEsmConfig))
			.pipe(logFiles ? debug({ title }) : noopStep())
			.pipe(dest('dist/esm'))

		if (listen) {
			task.on('end', () => subtaskSuccess(title))
			task.on('error', () => subtaskFail(title))
		}
		return task
	}
}

function babelTasks(logFiles: boolean, listen: boolean) {
	return parallel(babelEsm(logFiles, listen), babelCjs(logFiles, listen))
}

/**
 * Transpiles babel from lib/ into dist/esm and dist/cjs
 * @param env
 * @param listen
 */
export function buildBabel(): TaskFunction {
	return babelTasks(false, true)
}
/**
 * Watches typescript from src/ to the lib/ folder
 * @param verbose verbose mode
 */
export function watchBabel(): FSWatcher {
	return watch(BABEL_GLOBS, babelTasks(true, false))
}
