import { DragDropManager, SentinelAction } from '../../interfaces'
import { PUBLISH_DRAG_SOURCE } from './types'

export default function createPublishDragSource<Context>(
	manager: DragDropManager<Context>,
) {
	return function publishDragSource(): SentinelAction | undefined {
		const monitor = manager.getMonitor()
		if (monitor.isDragging()) {
			return { type: PUBLISH_DRAG_SOURCE }
		}
	}
}
