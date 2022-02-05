import type { DragDropManager, DragDropActions } from '../../interfaces.js'
import { createBeginDrag } from './beginDrag.js'
import { createPublishDragSource } from './publishDragSource.js'
import { createHover } from './hover.js'
import { createDrop } from './drop.js'
import { createEndDrag } from './endDrag.js'

export * from './types.js'

export function createDragDropActions(
	manager: DragDropManager,
): DragDropActions {
	return {
		beginDrag: createBeginDrag(manager),
		publishDragSource: createPublishDragSource(manager),
		hover: createHover(manager),
		drop: createDrop(manager),
		endDrag: createEndDrag(manager),
	}
}
