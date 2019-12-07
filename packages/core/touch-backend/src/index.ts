import { DragDropManager, BackendFactory } from 'dnd-core'
import { TouchBackendOptions } from './interfaces'
import TouchBackend from './TouchBackend'

export const Backend: BackendFactory = (
	manager: DragDropManager,
	context: any,
	options: TouchBackendOptions = {},
) => new TouchBackend(manager, context, options)
