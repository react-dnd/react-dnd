import { TaskFunction } from '../types'
import { defineBuild } from './defineBuild'
import { defineWatch } from './defineWatch'
import { defineBundle } from './defineBundle'

export function preset(): Record<string, TaskFunction> {
	try {
		const build = defineBuild()
		const watch = defineWatch()
		const bundle = defineBundle()

		return {
			build,
			watch,
			bundle,
		}
	} catch (err) {
		console.error('error defining tasks', err)
		throw err
	}
}
