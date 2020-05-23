import { DragDropMonitor, DragSource } from '../interfaces'

export class DragSourceImpl implements DragSource {
	public canDrag(): boolean {
		return true
	}

	public isDragging(monitor: DragDropMonitor, handle: string): boolean {
		return handle === monitor.getSourceId()
	}

	public beginDrag(): void {
		// empty on purpose
	}

	public endDrag(): void {
		// empty on purpose
	}
}
