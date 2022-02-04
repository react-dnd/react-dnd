import type { DragDropManager, BackendFactory } from 'dnd-core'
import type { TouchBackendOptions, TouchBackendContext } from './interfaces'
import { TouchBackendImpl } from './TouchBackendImpl'

export * from './interfaces'
export * from './TouchBackendImpl'

export const TouchBackend: BackendFactory = function createBackend(
	manager: DragDropManager,
	context: TouchBackendContext = {},
	options: Partial<TouchBackendOptions> = {},
): TouchBackendImpl {
	return new TouchBackendImpl(manager, context, options)
}
