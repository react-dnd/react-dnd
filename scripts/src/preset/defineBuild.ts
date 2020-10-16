import { series, TaskFunction } from 'gulp'
import { compileTypescript, emitTypings } from '../tasks/typescript'
import { option, argv } from 'yargs'
import { buildBabel } from '../tasks/babel'
import { rollupBundle } from '../tasks/rollup'

export function defineBuild(): TaskFunction {
	option('stripInternalTypes', { boolean: true, default: false })
	const stripInternalTypes = argv['stripInternalTypes'] as boolean

	const build = series(
		compileTypescript(),
		emitTypings(stripInternalTypes),
		buildBabel(),
		rollupBundle(),
	)
	build.flags = {
		'--stripInternalTypes': 'removes types marked as @internal',
	}
	return build
}
