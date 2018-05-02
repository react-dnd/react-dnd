import invariant from 'invariant'
import {
	ItemType,
	IDragDropManager,
	IDragDropMonitor,
	IXYCoord,
} from 'dnd-core'

let isCallingCanDrop = false

export interface ITargetMonitor {
	/**
	 * Returns true if there is a drag operation in progress, and the owner's canDrop() returns true or is not defined.
	 */
	canDrop(): boolean

	/**
	 * Returns true if there is a drag operation in progress, and the pointer is currently hovering over the owner.
	 * You may optionally pass { shallow: true } to strictly check whether only the owner is being hovered, as opposed
	 * to a nested target.
	 */
	isOver(options?: { shallow?: boolean }): boolean

	/**
	 * Returns a string or an ES6 symbol identifying the type of the current dragged item. Returns null if no item is being dragged.
	 */
	getItemType(): ItemType | null

	/**
	 * Returns a plain object representing the currently dragged item. Every drag source must specify it by returning an object from
	 * its beginDrag() method. Returns null if no item is being dragged.
	 */
	getItem(): any

	/**
	 * Returns a plain object representing the last recorded drop result. The drop targets may optionally specify it by returning an
	 * object from their drop() methods. When a chain of drop() is dispatched for the nested targets, bottom up, any parent that explicitly
	 * returns its own result from drop() overrides the drop result previously set by the child. Returns null if called outside drop().
	 */
	getDropResult(): any

	/**
	 *  Returns true if some drop target has handled the drop event, false otherwise. Even if a target did not return a drop result,
	 * didDrop() returns true. Use it inside drop() to test whether any nested drop target has already handled the drop. Returns false
	 * if called outside drop().
	 */
	didDrop(): boolean

	/**
	 * Returns the { x, y } client offset of the pointer at the time when the current drag operation has started. Returns null if no item
	 * is being dragged.
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
	 * Returns the { x, y } difference between the last recorded client offset of the pointer and the client offset when current the drag operation has
	 * started. Returns null if no item is being dragged.
	 */
	getDifferenceFromInitialOffset(): IXYCoord | null

	/**
	 * Returns the projected { x, y } client offset of the drag source component's root DOM node, based on its position at the time when the current
	 * drag operation has started, and the movement difference. Returns null if no item is being dragged.
	 */
	getSourceClientOffset(): IXYCoord | null
}

export class TargetMonitor implements ITargetMonitor {
	private internalMonitor: IDragDropMonitor
	private targetId: string | undefined

	constructor(manager: IDragDropManager<any>) {
		this.internalMonitor = manager.getMonitor()
	}

	public receiveHandlerId(targetId: string) {
		this.targetId = targetId
	}

	public canDrop() {
		invariant(
			!isCallingCanDrop,
			'You may not call monitor.canDrop() inside your canDrop() implementation. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target-monitor.html',
		)

		try {
			isCallingCanDrop = true
			return this.internalMonitor.canDropOnTarget(this.targetId as string)
		} finally {
			isCallingCanDrop = false
		}
	}

	public isOver(options: { shallow?: boolean }) {
		return this.internalMonitor.isOverTarget(this.targetId as string, options)
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

export default function createTargetMonitor(manager: IDragDropManager<any>) {
	return new TargetMonitor(manager) as ITargetMonitor
}
