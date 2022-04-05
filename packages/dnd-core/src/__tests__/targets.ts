import type { DragDropMonitor } from '../interfaces.js'
import { DropTargetImpl as DropTarget } from './DropTargetImpl.js'

export class NormalTarget extends DropTarget {
	public didCallDrop = false
	public didCallHover = false
	public dropResult: Record<string, any>

	public constructor(dropResult?: Record<string, any>) {
		super()
		this.dropResult = dropResult || { foo: 'bar' }
	}

	public override hover(): void {
		this.didCallHover = true
	}

	public override drop(): any {
		this.didCallDrop = true
		return this.dropResult
	}
}

export class NonDroppableTarget extends DropTarget {
	public didCallDrop = false
	public didCallHover = false

	public override canDrop(): boolean {
		return false
	}

	public override hover(): void {
		this.didCallHover = true
	}

	public override drop(): void {
		this.didCallDrop = true
	}
}

export class TargetWithNoDropResult extends DropTarget {
	public didCallDrop = false
	public didCallHover = false

	public override hover(): void {
		this.didCallHover = true
	}

	public override drop(): void {
		this.didCallDrop = true
	}
}

export class BadResultTarget extends DropTarget {
	public override drop(): any {
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

	public override hover(): void {
		this.didCallHover = true
	}

	public override drop(monitor: DragDropMonitor): any {
		this.didCallDrop = true
		const dropResult = monitor.getDropResult()
		return this.transform(dropResult) as any
	}
}
