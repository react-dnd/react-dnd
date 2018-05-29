export * from './interfaces'

import HTML5Backend from './HTML5Backend'
import getEmptyImage from './getEmptyImage'
import * as NativeTypes from './NativeTypes'
import { DragDropManager } from 'dnd-core'
export { NativeTypes, getEmptyImage }

export default function createHTML5Backend(manager: DragDropManager<any>) {
	return new HTML5Backend(manager)
}
