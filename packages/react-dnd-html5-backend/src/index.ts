import HTML5Backend from './HTML5Backend'
import getEmptyImage from './getEmptyImage'
import * as NativeTypes from './NativeTypes'
import { IDragDropManager } from 'dnd-core'

export { NativeTypes, getEmptyImage }

// TODO: The any prop should probably include the window context
export default function createHTML5Backend(manager: IDragDropManager<any>) {
	return new HTML5Backend(manager)
}
