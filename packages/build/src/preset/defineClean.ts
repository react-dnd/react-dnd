import rimraf = require('rimraf')
import { TaskFunction } from '../types'
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { parallel } = require('gulp')

export function defineClean(): TaskFunction {
	function cleanLib(cb: (err: Error | null | undefined) => void) {
		rimraf('lib', cb)
	}
	function cleanDist(cb: (err: Error | null | undefined) => void) {
		rimraf('dist', cb)
	}
	return parallel(cleanLib, cleanDist)
}
