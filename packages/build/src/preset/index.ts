import { TaskFunction } from '../types'
import { defineBuild } from './defineBuild'
import { defineBundle } from './defineBundle'

export function preset(): Record<string, TaskFunction> {
	try {
		const build = defineBuild()
		const bundle = defineBundle()

		return {
			build,
			bundle,
		}
	} catch (err) {
		console.error('error defining tasks', err)
		throw err
	}
}
