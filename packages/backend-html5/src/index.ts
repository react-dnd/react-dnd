import { HTML5BackendImpl } from './HTML5BackendImpl.js'
export * as NativeTypes from './NativeTypes.js'
import type { DragDropManager, BackendFactory } from 'dnd-core'
import type { HTML5BackendContext, HTML5BackendOptions } from './types.js'
export type { HTML5BackendContext, HTML5BackendOptions } from './types.js'
export { getEmptyImage } from './getEmptyImage.js'

export const HTML5Backend: BackendFactory = function createBackend(
	manager: DragDropManager,
	context?: HTML5BackendContext,
	options?: HTML5BackendOptions,
): HTML5BackendImpl {
	return new HTML5BackendImpl(manager, context, options)
}
