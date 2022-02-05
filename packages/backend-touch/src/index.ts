import type { DragDropManager, BackendFactory } from 'dnd-core'
import type { TouchBackendOptions, TouchBackendContext } from './interfaces.js'
import { TouchBackendImpl } from './TouchBackendImpl.js'

export * from './interfaces.js'
export * from './TouchBackendImpl.js'

export const TouchBackend: BackendFactory = function createBackend(
	manager: DragDropManager,
	context: TouchBackendContext = {},
	options: Partial<TouchBackendOptions> = {},
): TouchBackendImpl {
	return new TouchBackendImpl(manager, context, options)
}
