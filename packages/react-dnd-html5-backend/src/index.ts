export * from './interfaces'

import HTML5Backend from './HTML5Backend'
import getEmptyImage from './getEmptyImage'
import * as NativeTypes from './NativeTypes'
import { IDragDropManager } from 'dnd-core'
export { NativeTypes, getEmptyImage }

export default function createHTML5Backend(manager: IDragDropManager<any>) {
	return new HTML5Backend(manager)
}
