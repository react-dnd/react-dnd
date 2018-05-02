import invariant from 'invariant'
import {
	IDragDropManager,
	IDragDropMonitor,
	Unsubscribe,
	Listener,
	IXYCoord,
} from 'dnd-core'
import { ItemType } from 'dnd-core'
import { IDragSourceMonitor } from './interfaces'

let isCallingCanDrag = false
let isCallingIsDragging = false

class SourceMonitor implements IDragSourceMonitor {
	private internalMonitor: IDragDropMonitor
	private sourceId: string | undefined

	constructor(manager: IDragDropManager<any>) {
		this.internalMonitor = manager.getMonitor()
	}

	public receiveHandlerId(sourceId: string) {
		this.sourceId = sourceId
	}

	public canDrag() {
		invariant(
			!isCallingCanDrag,
			'You may not call monitor.canDrag() inside your canDrag() implementation. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html',
		)

		try {
			isCallingCanDrag = true
			return this.internalMonitor.canDragSource(this.sourceId as string)
		} finally {
			isCallingCanDrag = false
		}
	}

	public isDragging() {
		invariant(
			!isCallingIsDragging,
			'You may not call monitor.isDragging() inside your isDragging() implementation. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html',
		)

		try {
			isCallingIsDragging = true
			return this.internalMonitor.isDraggingSource(this.sourceId as string)
		} finally {
			isCallingIsDragging = false
		}
	}

	public subscribeToStateChange(
		listener: Listener,
		options?: { handlerIds: string[] | undefined },
	): Unsubscribe {
		return this.internalMonitor.subscribeToStateChange(listener, options)
	}

	public isDraggingSource(sourceId: string): boolean {
		return this.internalMonitor.isDraggingSource(sourceId)
	}

	public isOverTarget(
		targetId: string,
		options?: { shallow: boolean },
	): boolean {
		return this.internalMonitor.isOverTarget(targetId, options)
	}

	public getTargetIds(): string[] {
		return this.internalMonitor.getTargetIds()
	}

	public isSourcePublic(): boolean | null {
		return this.internalMonitor.isSourcePublic()
	}

	public getSourceId(): string | null {
		return this.internalMonitor.getSourceId()
	}

	public subscribeToOffsetChange(listener: Listener): Unsubscribe {
		return this.internalMonitor.subscribeToOffsetChange(listener)
	}

	public canDragSource(sourceId: string): boolean {
		return this.internalMonitor.canDragSource(sourceId)
	}

	public canDropOnTarget(targetId: string): boolean {
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

export default function createSourceMonitor(manager: IDragDropManager<any>) {
	return new SourceMonitor(manager) as IDragSourceMonitor
}
