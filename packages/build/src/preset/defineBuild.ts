import { compileTypescript, emitTypings } from '../tasks/typescript'
import { option, argv } from 'yargs'
import { buildBabel } from '../tasks/babel'
import { rollupBundle } from '../tasks/rollup'
import { TaskFunction } from '../types'
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { series } = require('gulp')

export function defineBuild(): TaskFunction {
	option('stripInternalTypes', { boolean: true, default: false })
	const stripInternalTypes = argv['stripInternalTypes'] as boolean

	const build = series(
		compileTypescript(),
		emitTypings(stripInternalTypes),
		buildBabel(),
		rollupBundle()
	)
	build.flags = {
		'--stripInternalTypes': 'removes types marked as @internal',
	}
	return build
}
