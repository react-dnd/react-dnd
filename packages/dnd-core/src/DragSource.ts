import { DragSource } from './interfaces'

export default class DragSourceImpl implements DragSource {
	public canDrag() {
		return true
	}

	public isDragging(monitor, handle) {
		return handle === monitor.getSourceId()
	}

	public beginDrag() {}

	public endDrag() {}
}
