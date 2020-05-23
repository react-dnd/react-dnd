import { HTML5BackendImpl } from './HTML5BackendImpl'
import * as NativeTypes from './NativeTypes'
import { DragDropManager, BackendFactory } from 'dnd-core'
import { HTML5BackendContext } from './types'
export { getEmptyImage } from './getEmptyImage'
export { NativeTypes }

export const HTML5Backend: BackendFactory = function createBackend(
	manager: DragDropManager,
	context?: HTML5BackendContext,
): HTML5BackendImpl {
	return new HTML5BackendImpl(manager, context)
}
