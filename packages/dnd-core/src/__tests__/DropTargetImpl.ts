import { DropTarget, DragDropMonitor } from '../interfaces'

export default class DropTargetImpl implements DropTarget {
	public canDrop(monitor: DragDropMonitor, targetId: string) {
		return true
	}

	public hover(monitor: DragDropMonitor, targetId: string) {
		// empty on purpose
	}

	public drop(monitor: DragDropMonitor, targetId: string) {
		// empty on purpose
	}
}
