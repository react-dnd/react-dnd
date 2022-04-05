import type { DragDropMonitor } from '../interfaces'
import { DragSourceImpl as DragSource } from './DragSourceImpl.js'

export class NormalSource extends DragSource {
	public didCallBeginDrag = false
	public recordedDropResult: any
	public item: Record<string, any>

	public constructor(item?: Record<string, any>) {
		super()
		this.item = item || { baz: 42 }
	}

	public override beginDrag(): any {
		this.didCallBeginDrag = true
		return this.item
	}

	public override endDrag(monitor: DragDropMonitor): void {
		this.recordedDropResult = monitor.getDropResult()
	}
}

export class NonDraggableSource extends DragSource {
	public didCallBeginDrag = false

	public override canDrag(): boolean {
		return false
	}

	public override beginDrag(): any {
		this.didCallBeginDrag = true
		return {}
	}
}

export class BadItemSource extends DragSource {
	public override beginDrag(): any {
		return 42
	}
}

export class NumberSource extends DragSource {
	public number: number
	public allowDrag: boolean

	public constructor(number: number, allowDrag: boolean) {
		super()
		this.number = number
		this.allowDrag = allowDrag
	}

	public override canDrag(): boolean {
		return this.allowDrag
	}

	public override isDragging(monitor: DragDropMonitor): boolean {
		const item = monitor.getItem()
		return item.number === this.number
	}

	public override beginDrag(): any {
		return {
			number: this.number,
		}
	}
}
