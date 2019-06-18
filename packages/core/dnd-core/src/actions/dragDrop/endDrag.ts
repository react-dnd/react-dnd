import invariant from 'invariant'
import {
	DragDropManager,
	SentinelAction,
	DragDropMonitor,
} from '../../interfaces'
import { END_DRAG } from './types'

export default function createEndDrag<Context>(
	manager: DragDropManager<Context>,
) {
	return function endDrag(): SentinelAction {
		const monitor = manager.getMonitor()
		const registry = manager.getRegistry()
		verifyIsDragging(monitor)

		const sourceId = monitor.getSourceId()
		const source = registry.getSource(sourceId!, true)
		source.endDrag(monitor, sourceId!)
		registry.unpinSource()
		return { type: END_DRAG }
	}
}

function verifyIsDragging(monitor: DragDropMonitor) {
	invariant(monitor.isDragging(), 'Cannot call endDrag while not dragging.')
}
