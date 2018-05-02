import { IDropTarget, IDragDropMonitor } from './interfaces'

export default class DropTarget implements IDropTarget {
	public canDrop(monitor: IDragDropMonitor, targetId: string) {
		return true
	}

	public hover(monitor: IDragDropMonitor, targetId: string) {
		// empty on purpose
	}

	public drop(monitor: IDragDropMonitor, targetId: string) {
		// empty on purpose
	}
}
