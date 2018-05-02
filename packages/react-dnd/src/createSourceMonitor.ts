import invariant from 'invariant'
import {
	IDragDropManager,
	IDragDropMonitor,
	Unsubscribe,
	Listener,
	IXYCoord,
} from 'dnd-core'
import { ItemType } from 'dnd-core'

let isCallingCanDrag = false
let isCallingIsDragging = false

export interface IDragSourceMonitor extends IDragDropMonitor {
	/**
	 * Returns true if no drag operation is in progress, and the owner's canDrag() returns true or is not defined.
	 */
	canDrag(): boolean

	/**
	 *  Returns true if a drag operation is in progress, and either the owner initiated the drag, or its isDragging() is defined and returns true.
	 */
	isDragging(): boolean

	/**
	 * Returns a string or an ES6 symbol identifying the type of the current dragged item. Returns null if no item is being dragged.
	 */
	getItemType(): ItemType | null

	/**
	 * Returns a plain object representing the currently dragged item. Every drag source must specify it by returning an object from its beginDrag() method.
	 * Returns null if no item is being dragged.
	 */
	getItem(): any

	/**
	 * Returns a plain object representing the last recorded drop result. The drop targets may optionally specify it by returning an object from their
	 * drop() methods. When a chain of drop() is dispatched for the nested targets, bottom up, any parent that explicitly returns its own result from drop()
	 * overrides the child drop result previously set by the child. Returns null if called outside endDrag().
	 */
	getDropResult(): any

	/**
	 *  Returns true if some drop target has handled the drop event, false otherwise. Even if a target did not return a drop result, didDrop() returns true.
	 * Use it inside endDrag() to test whether any drop target has handled the drop. Returns false if called outside endDrag().
	 */
	didDrop(): boolean

	/**
	 * Returns the { x, y } client offset of the pointer at the time when the current drag operation has started. Returns null if no item is being dragged.
	 */
	getInitialClientOffset(): IXYCoord | null

	/**
	 * Returns the { x, y } client offset of the drag source component's root DOM node at the time when the current drag operation has started.
	 * Returns null if no item is being dragged.
	 */
	getInitialSourceClientOffset(): IXYCoord | null

	/**
	 * Returns the last recorded { x, y } client offset of the pointer while a drag operation is in progress. Returns null if no item is being dragged.
	 */
	getClientOffset(): IXYCoord | null

	/**
	 * Returns the { x, y } difference between the last recorded client offset of the pointer and the client offset when the current drag operation has started.
	 * Returns null if no item is being dragged.
	 */
	getDifferenceFromInitialOffset(): IXYCoord | null

	/**
	 * Returns the projected { x, y } client offset of the drag source component's root DOM node, based on its position at the time when the current drag operation has
	 * started, and the movement difference. Returns null if no item is being dragged.
	 */
	getSourceClientOffset(): IXYCoord | null
}

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
