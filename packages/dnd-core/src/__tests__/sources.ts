import { DragSource } from '..'
import { IDragDropMonitor } from '../interfaces'

export class NormalSource extends DragSource {
	public didCallBeginDrag = false
	public recordedDropResult: any

	constructor(public item?: any) {
		super()
		this.item = item || { baz: 42 }
	}

	beginDrag() {
		this.didCallBeginDrag = true
		return this.item
	}

	endDrag(monitor: IDragDropMonitor) {
		this.recordedDropResult = monitor.getDropResult()
	}
}

export class NonDraggableSource extends DragSource {
	public didCallBeginDrag: boolean = false

	canDrag() {
		return false
	}

	beginDrag() {
		this.didCallBeginDrag = true
		return {}
	}
}

export class BadItemSource extends DragSource {
	beginDrag() {
		return 42
	}
}

export class NumberSource extends DragSource {
	constructor(public number: number, public allowDrag: boolean) {
		super()
	}

	canDrag() {
		return this.allowDrag
	}

	isDragging(monitor: IDragDropMonitor) {
		const item = monitor.getItem()
		return item.number === this.number
	}

	beginDrag() {
		return {
			number: this.number,
		}
	}
}
