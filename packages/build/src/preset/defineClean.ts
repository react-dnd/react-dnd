import rimraf = require('rimraf')
import { TaskFunction } from '../types'
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { parallel } = require('gulp')

export function defineClean(): TaskFunction {
	function cleanLib(cb: (err: Error | undefined) => void) {
		rimraf('lib', cb)
	}
	function cleanDist(cb: (err: Error | undefined) => void) {
		rimraf('dist', cb)
	}
	return parallel(cleanLib, cleanDist)
}
