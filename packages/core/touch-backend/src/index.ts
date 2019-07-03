import { DragDropManager, BackendFactory } from 'dnd-core'
import { TouchBackendOptions, TouchBackendContext } from './interfaces'
import TouchBackend from './TouchBackend'

const createTouchBackendFactory: BackendFactory = (
	manager: DragDropManager,
	context: TouchBackendContext,
	options: TouchBackendOptions,
) => new TouchBackend(manager, context, options)

export default createTouchBackendFactory
