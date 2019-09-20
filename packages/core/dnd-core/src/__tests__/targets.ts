import DropTarget from './DropTargetImpl'
import { DragDropMonitor } from '../interfaces'

export class NormalTarget extends DropTarget {
	public didCallDrop = false
	public didCallHover = false
	public dropResult: any

	public constructor(dropResult?: any) {
		super()
		this.dropResult = dropResult || { foo: 'bar' }
	}

	public hover() {
		this.didCallHover = true
	}

	public drop() {
		this.didCallDrop = true
		return this.dropResult
	}
}

export class NonDroppableTarget extends DropTarget {
	public didCallDrop = false
	public didCallHover = false

	public canDrop() {
		return false
	}

	public hover() {
		this.didCallHover = true
	}

	public drop() {
		this.didCallDrop = true
	}
}

export class TargetWithNoDropResult extends DropTarget {
	public didCallDrop = false
	public didCallHover = false

	public hover() {
		this.didCallHover = true
	}

	public drop() {
		this.didCallDrop = true
	}
}

export class BadResultTarget extends DropTarget {
	public drop() {
		return 42
	}
}

export class TransformResultTarget extends DropTarget {
	public didCallDrop = false
	public didCallHover = false
	private transform: (input: any) => any

	public constructor(transform: (input: any) => any) {
		super()
		this.transform = transform
	}

	public hover() {
		this.didCallHover = true
	}

	public drop(monitor: DragDropMonitor) {
		this.didCallDrop = true
		const dropResult = monitor.getDropResult()
		return this.transform(dropResult) as any
	}
}
