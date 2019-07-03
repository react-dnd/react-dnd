export * from './interfaces'

import HTML5Backend from './HTML5Backend'
import getEmptyImage from './getEmptyImage'
import * as NativeTypes from './NativeTypes'
import { DragDropManager, BackendFactory } from 'dnd-core'
import { HTML5BackendContext } from 'interfaces'

export { NativeTypes, getEmptyImage }

const createHTML5Backend: BackendFactory = (
	manager: DragDropManager,
	context: HTML5BackendContext,
) => {
	return new HTML5Backend(manager, context)
}

export default createHTML5Backend
