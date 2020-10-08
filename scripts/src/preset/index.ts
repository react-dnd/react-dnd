import { defineClean } from './defineClean'
import { defineBuild } from './defineBuild'

export function preset() {
	defineClean()
	defineBuild()
}
