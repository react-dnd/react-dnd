import { task, parallel } from 'just-scripts'
import rimraf = require('rimraf')

export function defineClean(): void {
	function cleanLib(cb: (err: Error | undefined) => void) {
		rimraf('lib', cb)
	}
	function cleanDist(cb: (err: Error | undefined) => void) {
		rimraf('dist', cb)
	}
	task('clean', parallel(cleanLib, cleanDist))
}
