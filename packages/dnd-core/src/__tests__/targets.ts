import { DropTargetImpl as DropTarget } from './DropTargetImpl'
import { DragDropMonitor } from '../interfaces'

export class NormalTarget extends DropTarget {
	public didCallDrop = false
	public didCallHover = false
	public dropResult: Record<string, any>

	public constructor(dropResult?: Record<string, any>) {
		super()
		this.dropResult = dropResult || { foo: 'bar' }
	}

	public hover(): void {
		this.didCallHover = true
	}

	public drop(): any {
		this.didCallDrop = true
		return this.dropResult
	}
}

export class NonDroppableTarget extends DropTarget {
	public didCallDrop = false
	public didCallHover = false

	public canDrop(): boolean {
		return false
	}

	public hover(): void {
		this.didCallHover = true
	}

	public drop(): void {
		this.didCallDrop = true
	}
}

export class TargetWithNoDropResult extends DropTarget {
	public didCallDrop = false
	public didCallHover = false

	public hover(): void {
		this.didCallHover = true
	}

	public drop(): void {
		this.didCallDrop = true
	}
}

export class BadResultTarget extends DropTarget {
	public drop(): any {
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

	public hover(): void {
		this.didCallHover = true
	}

	public drop(monitor: DragDropMonitor): any {
		this.didCallDrop = true
		const dropResult = monitor.getDropResult()
		return this.transform(dropResult) as any
	}
}
