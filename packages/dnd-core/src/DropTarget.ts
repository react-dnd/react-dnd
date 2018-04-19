import { DropTarget } from './interfaces'

export default class DropTargetImpl implements DropTarget {
	public canDrop() {
		return true
	}

	public hover() {}

	public drop() {}
}
