import {
	DragDropManager,
	DragDropMonitor,
	Unsubscribe,
	Listener,
	Identifier,
} from 'dnd-core'
import invariant from 'invariant'
import { DropTargetMonitor } from '../interfaces'

let isCallingCanDrop = false

export class DropTargetMonitorImpl implements DropTargetMonitor {
	private internalMonitor: DragDropMonitor
	private targetId: Identifier | null = null

	constructor(manager: DragDropManager<any>) {
		this.internalMonitor = manager.getMonitor()
	}

	public receiveHandlerId(targetId: Identifier | null) {
		this.targetId = targetId
	}

	public getHandlerId(): Identifier | null {
		return this.targetId
	}

	public subscribeToStateChange(
		listener: Listener,
		options?: { handlerIds: Identifier[] | undefined },
	): Unsubscribe {
		return this.internalMonitor.subscribeToStateChange(listener, options)
	}

	public canDrop() {
		// Cut out early if the target id has not been set. This should prevent errors
		// where the user has an older version of dnd-core like in
		// https://github.com/react-dnd/react-dnd/issues/1310
		if (!this.targetId) {
			return false
		}
		invariant(
			!isCallingCanDrop,
			'You may not call monitor.canDrop() inside your canDrop() implementation. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor',
		)

		try {
			isCallingCanDrop = true
			return this.internalMonitor.canDropOnTarget(this.targetId)
		} finally {
			isCallingCanDrop = false
		}
	}

	public isOver(options: { shallow?: boolean }) {
		if (!this.targetId) {
			return false
		}
		return this.internalMonitor.isOverTarget(this.targetId, options)
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
