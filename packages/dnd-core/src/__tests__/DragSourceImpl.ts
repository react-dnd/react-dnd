import { DragDropMonitor, DragSource } from '../interfaces'

export default class DragSourceImpl implements DragSource {
	public canDrag(monitor: DragDropMonitor, handle: string) {
		return true
	}

	public isDragging(monitor: DragDropMonitor, handle: string) {
		return handle === monitor.getSourceId()
	}

	public beginDrag(monitor: DragDropMonitor, handle: string) {
		// empty on purpose
	}

	public endDrag(monitor: DragDropMonitor, handle: string) {
		// empty on purpose
	}
}
