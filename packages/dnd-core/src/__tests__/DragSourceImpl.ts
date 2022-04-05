/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DragDropMonitor, DragSource, Identifier } from '../interfaces.js'

export class DragSourceImpl implements DragSource {
	public canDrag(_monitor: DragDropMonitor, _targetId: Identifier): boolean {
		return true
	}

	public isDragging(monitor: DragDropMonitor, targetId: Identifier): boolean {
		return targetId === monitor.getSourceId()
	}

	public beginDrag(_monitor: DragDropMonitor, _targetId: Identifier): void {
		// empty on purpose
	}

	public endDrag(_monitor: DragDropMonitor, _targetId: Identifier): void {
		// empty on purpose
	}
}
