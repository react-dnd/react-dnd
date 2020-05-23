import { HTML5Backend } from './HTML5Backend'
import * as NativeTypes from './NativeTypes'
import { DragDropManager, BackendFactory } from 'dnd-core'
import { HTML5BackendContext } from './types'
export { getEmptyImage } from './getEmptyImage'
export { NativeTypes }
export { HTML5Backend } from './HTML5Backend'

export const HTML5BackendFactory: BackendFactory = function createBackend(
	manager: DragDropManager,
	context?: HTML5BackendContext,
): HTML5Backend {
	return new HTML5Backend(manager, context)
}
