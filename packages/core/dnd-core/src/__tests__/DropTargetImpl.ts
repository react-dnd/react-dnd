import { DropTarget } from '../interfaces'

export class DropTargetImpl implements DropTarget {
	public canDrop(): boolean {
		return true
	}

	public hover(): void {
		// empty on purpose
	}

	public drop(): void {
		// empty on purpose
	}
}
