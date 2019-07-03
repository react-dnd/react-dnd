import { DropTarget } from '../interfaces'

export default class DropTargetImpl implements DropTarget {
	public canDrop() {
		return true
	}

	public hover() {
		// empty on purpose
	}

	public drop() {
		// empty on purpose
	}
}
