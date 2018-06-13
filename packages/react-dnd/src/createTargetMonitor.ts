import { DragDropManager, DragDropMonitor } from 'dnd-core'
import { DropTargetMonitor } from './interfaces'
const invariant = require('invariant')

let isCallingCanDrop = false

export class TargetMonitor implements DropTargetMonitor {
	private internalMonitor: DragDropMonitor
	private targetId: string | undefined

	constructor(manager: DragDropManager<any>) {
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

export default function createTargetMonitor<Context>(
	manager: DragDropManager<Context>,
): DropTargetMonitor {
	return new TargetMonitor(manager) as DropTargetMonitor
}
