import { TaskFunction } from 'gulp'
import { defineClean } from './defineClean'
import { defineBuild } from './defineBuild'
import { defineWatch } from './defineWatch'

export function preset(): Record<string, TaskFunction> {
	const clean = defineClean()
	const build = defineBuild()
	const watch = defineWatch()

	return {
		clean,
		build,
		watch,
	}
}
