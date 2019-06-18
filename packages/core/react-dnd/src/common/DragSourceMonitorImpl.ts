import {
	DragDropManager,
	DragDropMonitor,
	Unsubscribe,
	Listener,
	Identifier,
} from 'dnd-core'
import invariant from 'invariant'
import { DragSourceMonitor } from '../interfaces'

let isCallingCanDrag = false
let isCallingIsDragging = false

export class DragSourceMonitorImpl implements DragSourceMonitor {
	private internalMonitor: DragDropMonitor
	private sourceId: Identifier | null = null

	constructor(manager: DragDropManager<any>) {
		this.internalMonitor = manager.getMonitor()
	}

	public receiveHandlerId(sourceId: Identifier | null) {
		this.sourceId = sourceId
	}

	public getHandlerId(): Identifier | null {
		return this.sourceId
	}

	public canDrag() {
		invariant(
			!isCallingCanDrag,
			'You may not call monitor.canDrag() inside your canDrag() implementation. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor',
		)

		try {
			isCallingCanDrag = true
			return this.internalMonitor.canDragSource(this.sourceId as Identifier)
		} finally {
			isCallingCanDrag = false
		}
	}

	public isDragging() {
		if (!this.sourceId) {
			return false
		}
		invariant(
			!isCallingIsDragging,
			'You may not call monitor.isDragging() inside your isDragging() implementation. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor',
		)

		try {
			isCallingIsDragging = true
			return this.internalMonitor.isDraggingSource(this.sourceId)
		} finally {
			isCallingIsDragging = false
		}
	}

	public subscribeToStateChange(
		listener: Listener,
		options?: { handlerIds: Identifier[] | undefined },
	): Unsubscribe {
		return this.internalMonitor.subscribeToStateChange(listener, options)
	}

	public isDraggingSource(sourceId: Identifier): boolean {
		return this.internalMonitor.isDraggingSource(sourceId)
	}

	public isOverTarget(
		targetId: Identifier,
		options?: { shallow: boolean },
	): boolean {
		return this.internalMonitor.isOverTarget(targetId, options)
	}

	public getTargetIds(): Identifier[] {
		return this.internalMonitor.getTargetIds()
	}

	public isSourcePublic(): boolean | null {
		return this.internalMonitor.isSourcePublic()
	}

	public getSourceId(): Identifier | null {
		return this.internalMonitor.getSourceId()
	}

	public subscribeToOffsetChange(listener: Listener): Unsubscribe {
		return this.internalMonitor.subscribeToOffsetChange(listener)
	}

	public canDragSource(sourceId: Identifier): boolean {
		return this.internalMonitor.canDragSource(sourceId)
	}

	public canDropOnTarget(targetId: Identifier): boolean {
		return this.internalMonitor.canDropOnTarget(targetId)
	}

	public getItemType() {
		return this.internalMonitor.getItemType()
	}

	public getItem() {
		return this.internalMonitor.getItem()
	}

	public getDropResult() {
		return this.internalMonitor.getDropResult()
	}

	public didDrop() {
		return this.internalMonitor.didDrop()
	}

	public getInitialClientOffset() {
		return this.internalMonitor.getInitialClientOffset()
	}

	public getInitialSourceClientOffset() {
		return this.internalMonitor.getInitialSourceClientOffset()
	}

	public getSourceClientOffset() {
		return this.internalMonitor.getSourceClientOffset()
	}

	public getClientOffset() {
		return this.internalMonitor.getClientOffset()
	}

	public getDifferenceFromInitialOffset() {
		return this.internalMonitor.getDifferenceFromInitialOffset()
	}
}
