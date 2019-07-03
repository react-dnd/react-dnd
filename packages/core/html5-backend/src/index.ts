import HTML5Backend from './HTML5Backend'
import * as NativeTypes from './NativeTypes'
import { DragDropManager, BackendFactory } from 'dnd-core'
import { HTML5BackendContext } from './interfaces'

export * from './interfaces'
export { default as getEmptyImage } from './getEmptyImage'
export { NativeTypes }

const createHTML5Backend: BackendFactory = (
	manager: DragDropManager,
	context: HTML5BackendContext,
) => {
	return new HTML5Backend(manager, context)
}

export default createHTML5Backend
