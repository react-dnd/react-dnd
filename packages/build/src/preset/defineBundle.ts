import { option } from 'yargs'
import { rollupBundle } from '../tasks/rollup'
import { TaskFunction } from '../types'
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { series } = require('gulp')

export function defineBundle(): TaskFunction {
	option('stripInternalTypes', { boolean: true, default: false })
	const build = series(rollupBundle())
	return build
}
