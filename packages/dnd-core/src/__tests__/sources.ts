import { DragSourceImpl as DragSource } from './DragSourceImpl'
import { DragDropMonitor } from '../interfaces'

export class NormalSource extends DragSource {
	public didCallBeginDrag = false
	public recordedDropResult: any
	public item: Record<string, any>

	public constructor(item?: Record<string, any>) {
		super()
		this.item = item || { baz: 42 }
	}

	public beginDrag(): any {
		this.didCallBeginDrag = true
		return this.item
	}

	public endDrag(monitor: DragDropMonitor): void {
		this.recordedDropResult = monitor.getDropResult()
	}
}

export class NonDraggableSource extends DragSource {
	public didCallBeginDrag = false

	public canDrag(): boolean {
		return false
	}

	public beginDrag(): any {
		this.didCallBeginDrag = true
		return {}
	}
}

export class BadItemSource extends DragSource {
	public beginDrag(): any {
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

	public canDrag(): boolean {
		return this.allowDrag
	}

	public isDragging(monitor: DragDropMonitor): boolean {
		const item = monitor.getItem()
		return item.number === this.number
	}

	public beginDrag(): any {
		return {
			number: this.number,
		}
	}
}
