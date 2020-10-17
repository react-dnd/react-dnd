import { watchTypescript } from '../tasks/typescript'
import { watchBabel } from '../tasks/babel'
import { TaskFunction } from 'gulp'
import { argv } from 'yargs'
import { watchRollup } from '../tasks/rollup'

export function defineWatch(): TaskFunction {
	const stripInternalTypes = argv['stripInternalTypes'] as boolean

	return function watch() {
		watchTypescript(stripInternalTypes)
		watchBabel()
		watchRollup()
	}
}
