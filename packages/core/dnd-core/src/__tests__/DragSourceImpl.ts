import { DragDropMonitor, DragSource } from '../interfaces'

export default class DragSourceImpl implements DragSource {
	public canDrag() {
		return true
	}

	public isDragging(monitor: DragDropMonitor, handle: string) {
		return handle === monitor.getSourceId()
	}

	public beginDrag() {
		// empty on purpose
	}

	public endDrag() {
		// empty on purpose
	}
}
