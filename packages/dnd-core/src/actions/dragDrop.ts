import {
	Action,
	DragDropManager,
	XYCoord,
	BeginDragPayload,
	BeginDragOptions,
	SentinelAction,
	DropPayload,
	HoverPayload,
	HoverOptions,
} from '../interfaces'
import invariant from 'invariant'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import matchesType from '../utils/matchesType'

export const BEGIN_DRAG = 'dnd-core/BEGIN_DRAG'
export const PUBLISH_DRAG_SOURCE = 'dnd-core/PUBLISH_DRAG_SOURCE'
export const HOVER = 'dnd-core/HOVER'
export const DROP = 'dnd-core/DROP'
export const END_DRAG = 'dnd-core/END_DRAG'

export default function createDragDropActions<Context>(
	manager: DragDropManager<Context>,
) {
	return {
		beginDrag(
			sourceIds: string[] = [],
			{
				publishSource,
				clientOffset,
				getSourceClientOffset,
			}: BeginDragOptions = {
				publishSource: true,
			},
		): Action<BeginDragPayload> | undefined {
			const monitor = manager.getMonitor()
			const registry = manager.getRegistry()
			invariant(!monitor.isDragging(), 'Cannot call beginDrag while dragging.')

			for (const s of sourceIds) {
				invariant(registry.getSource(s), 'Expected sourceIds to be registered.')
			}

			let sourceId = null
			for (let i = sourceIds.length - 1; i >= 0; i--) {
				if (monitor.canDragSource(sourceIds[i])) {
					sourceId = sourceIds[i]
					break
				}
			}
			if (sourceId === null) {
				return
			}

			let sourceClientOffset: XYCoord | null = null
			if (clientOffset) {
				invariant(
					typeof getSourceClientOffset === 'function',
					'When clientOffset is provided, getSourceClientOffset must be a function.',
				)
				sourceClientOffset = (getSourceClientOffset as any)(sourceId)
			}

			const source = registry.getSource(sourceId)
			const item = source.beginDrag(monitor, sourceId)
			invariant(isObject(item), 'Item must be an object.')

			registry.pinSource(sourceId)

			const itemType = registry.getSourceType(sourceId)
			return {
				type: BEGIN_DRAG,
				payload: {
					itemType,
					item,
					sourceId,
					clientOffset: clientOffset || null,
					sourceClientOffset: sourceClientOffset || null,
					isSourcePublic: !!publishSource,
				},
			}
		},

		publishDragSource(): SentinelAction | undefined {
			const monitor = manager.getMonitor()
			if (!monitor.isDragging()) {
				return
			}
			return { type: PUBLISH_DRAG_SOURCE }
		},

		hover(
			targetIdsArg: string[],
			{ clientOffset }: HoverOptions = {},
		): Action<HoverPayload> {
			invariant(isArray(targetIdsArg), 'Expected targetIds to be an array.')
			const targetIds = targetIdsArg.slice(0)

			const monitor = manager.getMonitor()
			const registry = manager.getRegistry()
			invariant(monitor.isDragging(), 'Cannot call hover while not dragging.')
			invariant(!monitor.didDrop(), 'Cannot call hover after drop.')

			// First check invariants.
			for (let i = 0; i < targetIds.length; i++) {
				const targetId = targetIds[i]
				invariant(
					targetIds.lastIndexOf(targetId) === i,
					'Expected targetIds to be unique in the passed array.',
				)

				const target = registry.getTarget(targetId)
				invariant(target, 'Expected targetIds to be registered.')
			}

			const draggedItemType = monitor.getItemType()

			// Remove those targetIds that don't match the targetType.  This
			// fixes shallow isOver which would only be non-shallow because of
			// non-matching targets.
			for (let i = targetIds.length - 1; i >= 0; i--) {
				const targetId = targetIds[i]
				const targetType = registry.getTargetType(targetId)
				if (!matchesType(targetType, draggedItemType)) {
					targetIds.splice(i, 1)
				}
			}

			// Finally call hover on all matching targets.
			for (const targetId of targetIds) {
				const target = registry.getTarget(targetId)
				target.hover(monitor, targetId)
			}

			return {
				type: HOVER,
				payload: {
					targetIds,
					clientOffset: clientOffset || null,
				},
			}
		},

		drop(options = {}): void {
			const monitor = manager.getMonitor()
			const registry = manager.getRegistry()
			invariant(monitor.isDragging(), 'Cannot call drop while not dragging.')
			invariant(
				!monitor.didDrop(),
				'Cannot call drop twice during one drag operation.',
			)

			const targetIds = monitor
				.getTargetIds()
				.filter(monitor.canDropOnTarget, monitor)

			targetIds.reverse()

			// Multiple actions are dispatched here, which is why this doesn't return an action
			targetIds.forEach((targetId, index) => {
				const target = registry.getTarget(targetId)

				let dropResult = target.drop(monitor, targetId)
				invariant(
					typeof dropResult === 'undefined' || isObject(dropResult),
					'Drop result must either be an object or undefined.',
				)
				if (typeof dropResult === 'undefined') {
					dropResult = index === 0 ? {} : monitor.getDropResult()
				}

				const action: Action<DropPayload> = {
					type: DROP,
					payload: {
						dropResult: {
							...options,
							...dropResult,
						},
					},
				}
				manager.dispatch(action)
			})
		},

		endDrag(): SentinelAction {
			const monitor = manager.getMonitor()
			const registry = manager.getRegistry()
			invariant(monitor.isDragging(), 'Cannot call endDrag while not dragging.')

			const sourceId = monitor.getSourceId()
			const source = registry.getSource(sourceId as string, true)
			source.endDrag(monitor, sourceId as string)
			registry.unpinSource()
			return { type: END_DRAG }
		},
	}
}
