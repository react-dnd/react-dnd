import { IDragDropMonitor, IDragSource } from './interfaces'

export default class DragSource implements IDragSource {
	public canDrag(monitor: IDragDropMonitor, handle: string) {
		return true
	}

	public isDragging(monitor: IDragDropMonitor, handle: string) {
		return handle === monitor.getSourceId()
	}

	public beginDrag(monitor: IDragDropMonitor, handle: string) {
		// empty on purpose
	}

	public endDrag(monitor: IDragDropMonitor, handle: string) {
		// empty on purpose
	}
}
