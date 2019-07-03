import { DragDropManager } from 'dnd-core'
import { TouchBackendOptions } from './interfaces'
import TouchBackend from './TouchBackend'

export default function createTouchBackendFactory(
	options: TouchBackendOptions,
) {
	return (manager: DragDropManager<any>) => new TouchBackend(manager, options)
}
