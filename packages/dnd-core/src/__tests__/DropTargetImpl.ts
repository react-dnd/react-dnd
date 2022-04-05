/* eslint-disable @typescript-eslint/no-unused-vars */
import type { DragDropMonitor, DropTarget, Identifier } from '../interfaces.js'

export class DropTargetImpl implements DropTarget {
	public canDrop(_monitor: DragDropMonitor, _targetId: Identifier): boolean {
		return true
	}

	public hover(_monitor: DragDropMonitor, _targetId: Identifier): void {
		// empty on purpose
	}

	public drop(_monitor: DragDropMonitor, _targetId: Identifier): void {
		// empty on purpose
	}
}
