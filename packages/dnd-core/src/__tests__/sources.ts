// tslint:disable max-classes-per-file

import DragSource from './DragSourceImpl'
import { DragDropMonitor } from '../interfaces'

export class NormalSource extends DragSource {
	public didCallBeginDrag = false
	public recordedDropResult: any

	constructor(public item?: any) {
		super()
		this.item = item || { baz: 42 }
	}

	public beginDrag() {
		this.didCallBeginDrag = true
		return this.item
	}

	public endDrag(monitor: DragDropMonitor) {
		this.recordedDropResult = monitor.getDropResult()
	}
}

export class NonDraggableSource extends DragSource {
	public didCallBeginDrag: boolean = false

	public canDrag() {
		return false
	}

	public beginDrag() {
		this.didCallBeginDrag = true
		return {}
	}
}

export class BadItemSource extends DragSource {
	public beginDrag() {
		return 42
	}
}

export class NumberSource extends DragSource {
	// tslint:disable-next-line variable-name
	constructor(public number: number, public allowDrag: boolean) {
		super()
	}

	public canDrag() {
		return this.allowDrag
	}

	public isDragging(monitor: DragDropMonitor) {
		const item = monitor.getItem()
		return item.number === this.number
	}

	public beginDrag() {
		return {
			number: this.number,
		}
	}
}
