import { DragDropMonitor, DragSource } from './interfaces'

export default class DragSourceImpl implements DragSource {
	public canDrag() {
		return true
	}

	public isDragging(monitor: DragDropMonitor, handle: string) {
		return handle === monitor.getSourceId()
	}

	public beginDrag() {}

	public endDrag() {}
}
