import { DragDropManager, BackendFactory } from 'dnd-core'
import { TouchBackendOptions } from './interfaces'
import TouchBackend from './TouchBackend'

const createBackend: BackendFactory = (
	manager: DragDropManager,
	context: any,
	options: TouchBackendOptions = {},
) => new TouchBackend(manager, context, options)

export default createBackend
