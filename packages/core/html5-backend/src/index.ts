import HTML5Backend from './HTML5Backend'
import * as NativeTypes from './NativeTypes'
import { DragDropManager, BackendFactory } from 'dnd-core'
export { getEmptyImage } from './getEmptyImage'
export { NativeTypes }

export const Backend: BackendFactory = (
	manager: DragDropManager,
	context: any,
) => new HTML5Backend(manager, context)
