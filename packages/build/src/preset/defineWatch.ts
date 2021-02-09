import { watchTypescript } from '../tasks/typescript'
import { watchBabel } from '../tasks/babel'
import { argv } from 'yargs'
import { watchRollup } from '../tasks/rollup'
import { TaskFunction } from '../types'

export function defineWatch(): TaskFunction {
	const stripInternalTypes = argv['stripInternalTypes'] as boolean

	return function watch() {
		watchTypescript(stripInternalTypes)
		watchBabel()
		watchRollup()
	}
}
