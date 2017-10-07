import invariant from 'invariant'

let isCallingCanDrop = false

class TargetMonitor {
	constructor(manager) {
		this.internalMonitor = manager.getMonitor()
	}

	receiveHandlerId(targetId) {
		this.targetId = targetId
	}

	canDrop() {
		invariant(
			!isCallingCanDrop,
			'You may not call monitor.canDrop() inside your canDrop() implementation. ' +
				'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target-monitor.html',
		)

		try {
			isCallingCanDrop = true
			return this.internalMonitor.canDropOnTarget(this.targetId)
		} finally {
			isCallingCanDrop = false
		}
	}

	isOver(options) {
		return this.internalMonitor.isOverTarget(this.targetId, options)
	}

	getItemType() {
		return this.internalMonitor.getItemType()
	}

	getItem() {
		return this.internalMonitor.getItem()
	}

	getDropResult() {
		return this.internalMonitor.getDropResult()
	}

	didDrop() {
		return this.internalMonitor.didDrop()
	}

	getInitialClientOffset() {
		return this.internalMonitor.getInitialClientOffset()
	}

	getInitialSourceClientOffset() {
		return this.internalMonitor.getInitialSourceClientOffset()
	}

	getSourceClientOffset() {
		return this.internalMonitor.getSourceClientOffset()
	}

	getClientOffset() {
		return this.internalMonitor.getClientOffset()
	}

	getDifferenceFromInitialOffset() {
		return this.internalMonitor.getDifferenceFromInitialOffset()
	}
}

export default function createTargetMonitor(manager) {
	return new TargetMonitor(manager)
}
