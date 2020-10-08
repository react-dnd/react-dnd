/* eslint-disable @typescript-eslint/no-var-requires */
import { existsSync } from 'fs'
import { join } from 'path'
import { task, series, parallel, tscTask, condition } from 'just-scripts'
import { task as shellTask } from 'gulp-shell'
import gulp = require('gulp')
import babel = require('gulp-babel')

const babelCjsConfig = require('../../config/babel.config.cjs')
const babelEsmConfig = require('../../config/babel.config.cjs')

export function defineBuild(): void {
	function babelEsm() {
		return gulp
			.src('lib/**/*.js')
			.pipe(babel(babelEsmConfig))
			.pipe(gulp.dest('dist/esm'))
	}
	function babelCjs() {
		return gulp
			.src('lib/**/*.js')
			.pipe(babel(babelCjsConfig))
			.pipe(gulp.dest('dist/cjs'))
	}
	task('bundle', shellTask(['rollup -c rollup.config.js']))
	task(
		'build',
		series(
			tscTask(),
			parallel(babelEsm, babelCjs),
			condition('bundle', isRollupConfigured),
		),
	)
}

function isRollupConfigured(): boolean {
	return existsSync(join(process.cwd(), 'rollup.config.js'))
}
