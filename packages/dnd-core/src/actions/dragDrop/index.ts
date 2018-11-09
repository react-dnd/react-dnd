import { DragDropManager } from '../../interfaces'
import createInitCoords from './initCoords'
import createBeginDrag from './beginDrag'
import createPublishDragSource from './publishDragSource'
import createHover from './hover'
import createDrop from './drop'
import createEndDrag from './endDrag'

export * from './types'

export default function createDragDropActions<Context>(
	manager: DragDropManager<Context>,
) {
	return {
		initCoords: createInitCoords(manager),
		beginDrag: createBeginDrag(manager),
		publishDragSource: createPublishDragSource(manager),
		hover: createHover(manager),
		drop: createDrop(manager),
		endDrag: createEndDrag(manager),
	}
}
