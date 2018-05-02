import { DropTarget } from '..'
import { IDragDropMonitor } from '../interfaces'

export class NormalTarget extends DropTarget {
	public didCallDrop: boolean = false
	public didCallHover: boolean = false
	public dropResult: any

	constructor(dropResult?: any) {
		super()
		this.dropResult = dropResult || { foo: 'bar' }
	}

	hover() {
		this.didCallHover = true
	}

	drop() {
		this.didCallDrop = true
		return this.dropResult
	}
}

export class NonDroppableTarget extends DropTarget {
	public didCallDrop: boolean = false
	public didCallHover: boolean = false

	canDrop() {
		return false
	}

	hover() {
		this.didCallHover = true
	}

	drop() {
		this.didCallDrop = true
	}
}

export class TargetWithNoDropResult extends DropTarget {
	public didCallDrop: boolean = false
	public didCallHover: boolean = false

	hover() {
		this.didCallHover = true
	}

	drop() {
		this.didCallDrop = true
	}
}

export class BadResultTarget extends DropTarget {
	drop() {
		return 42
	}
}

export class TransformResultTarget extends DropTarget {
	public didCallDrop: boolean = false
	public didCallHover: boolean = false

	constructor(public transform: any) {
		super()
	}

	hover() {
		this.didCallHover = true
	}

	drop(monitor: IDragDropMonitor) {
		this.didCallDrop = true
		const dropResult = monitor.getDropResult()
		return this.transform(dropResult)
	}
}
