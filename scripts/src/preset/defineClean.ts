import { parallel, TaskFunction } from 'gulp'
import rimraf = require('rimraf')

export function defineClean(): TaskFunction {
	function cleanLib(cb: (err: Error | undefined) => void) {
		rimraf('lib', cb)
	}
	function cleanDist(cb: (err: Error | undefined) => void) {
		rimraf('dist', cb)
	}
	return parallel(cleanLib, cleanDist)
}
