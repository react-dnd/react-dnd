import { Store } from 'redux'
import invariant from 'invariant'
import isArray from 'lodash/isArray'
import matchesType from './utils/matchesType'
import {
	getSourceClientOffset,
	getDifferenceFromInitialOffset,
} from './utils/coords'
import { areDirty } from './utils/dirtiness'
import { State } from './reducers'
import {
	DragDropMonitor,
	Listener,
	Unsubscribe,
	XYCoord,
	HandlerRegistry,
	Identifier,
} from './interfaces'

export default class DragDropMonitorImpl implements DragDropMonitor {
	constructor(private store: Store<State>, public registry: HandlerRegistry) {}

	public subscribeToStateChange(
		listener: Listener,
		options: { handlerIds: string[] | undefined } = { handlerIds: undefined },
	): Unsubscribe {
		const { handlerIds } = options
		invariant(typeof listener === 'function', 'listener must be a function.')
		invariant(
			typeof handlerIds === 'undefined' || isArray(handlerIds),
			'handlerIds, when specified, must be an array of strings.',
		)

		let prevStateId = this.store.getState().stateId
		const handleChange = () => {
			const state = this.store.getState()
			const currentStateId = state.stateId
			try {
				const canSkipListener =
					currentStateId === prevStateId ||
					(currentStateId === prevStateId + 1 &&
						!areDirty(state.dirtyHandlerIds, handlerIds))

				if (!canSkipListener) {
					listener()
				}
			} finally {
				prevStateId = currentStateId
			}
		}

		return this.store.subscribe(handleChange)
	}

	public subscribeToOffsetChange(listener: Listener): Unsubscribe {
		invariant(typeof listener === 'function', 'listener must be a function.')

		let previousState = this.store.getState().dragOffset
		const handleChange = () => {
			const nextState = this.store.getState().dragOffset
			if (nextState === previousState) {
				return
			}

			previousState = nextState
			listener()
		}

		return this.store.subscribe(handleChange)
	}

	public canDragSource(sourceId: string): boolean {
		const source = this.registry.getSource(sourceId)
		invariant(source, 'Expected to find a valid source.')

		if (this.isDragging()) {
			return false
		}

		return source.canDrag(this, sourceId)
	}

	public canDropOnTarget(targetId: string): boolean {
		const target = this.registry.getTarget(targetId)
		invariant(target, 'Expected to find a valid target.')

		if (!this.isDragging() || this.didDrop()) {
			return false
		}

		const targetType = this.registry.getTargetType(targetId)
		const draggedItemType = this.getItemType()
		return (
			matchesType(targetType, draggedItemType) && target.canDrop(this, targetId)
		)
	}

	public isDragging() {
		return Boolean(this.getItemType())
	}

	public isDraggingSource(sourceId: string): boolean {
		const source = this.registry.getSource(sourceId, true)
		invariant(source, 'Expected to find a valid source.')

		if (!this.isDragging() || !this.isSourcePublic()) {
			return false
		}

		const sourceType = this.registry.getSourceType(sourceId)
		const draggedItemType = this.getItemType()
		if (sourceType !== draggedItemType) {
			return false
		}

		return source.isDragging(this, sourceId)
	}

	public isOverTarget(targetId: string, options = { shallow: false }) {
		const { shallow } = options
		if (!this.isDragging()) {
			return false
		}

		const targetType = this.registry.getTargetType(targetId)
		const draggedItemType = this.getItemType()
		if (draggedItemType && !matchesType(targetType, draggedItemType)) {
			return false
		}

		const targetIds = this.getTargetIds()
		if (!targetIds.length) {
			return false
		}

		const index = targetIds.indexOf(targetId)
		if (shallow) {
			return index === targetIds.length - 1
		} else {
			return index > -1
		}
	}

	public getItemType() {
		return this.store.getState().dragOperation.itemType as Identifier
	}

	public getItem() {
		return this.store.getState().dragOperation.item
	}

	public getSourceId() {
		return this.store.getState().dragOperation.sourceId
	}

	public getTargetIds() {
		return this.store.getState().dragOperation.targetIds
	}

	public getDropResult() {
		return this.store.getState().dragOperation.dropResult
	}

	public didDrop() {
		return this.store.getState().dragOperation.didDrop
	}

	public isSourcePublic() {
		return this.store.getState().dragOperation.isSourcePublic
	}

	public getInitialClientOffset(): XYCoord | null {
		return this.store.getState().dragOffset.initialClientOffset
	}

	public getInitialSourceClientOffset(): XYCoord | null {
		return this.store.getState().dragOffset.initialSourceClientOffset
	}

	public getClientOffset(): XYCoord | null {
		return this.store.getState().dragOffset.clientOffset
	}

	public getSourceClientOffset(): XYCoord | null {
		return getSourceClientOffset(this.store.getState().dragOffset)
	}

	public getDifferenceFromInitialOffset() {
		return getDifferenceFromInitialOffset(this.store.getState().dragOffset)
	}
}
