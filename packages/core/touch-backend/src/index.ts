import { DragDropManager, BackendFactory } from 'dnd-core'
import { TouchBackendOptions } from './interfaces'
import TouchBackend from './TouchBackend'
import { OptionsReader } from './OptionsReader'

const createTouchBackendFactory: BackendFactory = (
	manager: DragDropManager,
	context: any,
	options: TouchBackendOptions = {},
) => new TouchBackend(manager, new OptionsReader(options, context))

export default createTouchBackendFactory
