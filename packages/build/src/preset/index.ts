import { TaskFunction } from '../types'
import { defineClean } from './defineClean'
import { defineBuild } from './defineBuild'
import { defineWatch } from './defineWatch'
import { defineBundle } from './defineBundle'

export function preset(): Record<string, TaskFunction> {
	try {
		const clean = defineClean()
		const build = defineBuild()
		const watch = defineWatch()
		const bundle = defineBundle()

		return {
			clean,
			build,
			watch,
			bundle,
		}
	} catch (err) {
		console.error('error defining tasks', err)
		throw err
	}
}
