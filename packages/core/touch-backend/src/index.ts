import { DragDropManager, BackendFactory } from 'dnd-core'
import { TouchBackendOptions, TouchBackendContext } from './interfaces'
import { TouchBackend } from './TouchBackend'
export { TouchBackend } from './TouchBackend'

export const TouchBackendFactory: BackendFactory = function createBackend(
	manager: DragDropManager,
	context: TouchBackendContext = {},
	options: TouchBackendOptions = {},
): TouchBackend {
	return new TouchBackend(manager, context, options)
}
