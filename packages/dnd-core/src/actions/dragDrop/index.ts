import type { DragDropManager, DragDropActions } from '../../interfaces'
import { createBeginDrag } from './beginDrag'
import { createPublishDragSource } from './publishDragSource'
import { createHover } from './hover'
import { createDrop } from './drop'
import { createEndDrag } from './endDrag'

export * from './types'

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
