import { TaskFunction } from '../types'
import { build } from './defineBuild'

export function preset(): Record<string, TaskFunction> {
	try {
		return {
			build,
		}
	} catch (err) {
		console.error('error defining tasks', err)
		throw err
	}
}
