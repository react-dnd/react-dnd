declare var require: any
import { useMemo, useEffect, useRef } from 'react'
import { DragSource, DragDropManager } from 'dnd-core'
import {
	DragSourceHookSpec,
	DragSourceMonitor,
	DragObjectWithType,
} from '../../interfaces'
import DragSourceMonitorImpl from '../../DragSourceMonitorImpl'
import registerSource from '../../registerSource'
const invariant = require('invariant')

export function useDragSourceMonitor<
	DragObject extends DragObjectWithType,
	DropResult,
	CustomProps
>(
	manager: DragDropManager<any>,
	sourceSpec: DragSourceHookSpec<DragObject, DropResult, CustomProps>,
): DragSourceMonitor {
	const sourceSpecRef = useRef(sourceSpec)

	useEffect(() => {
		sourceSpecRef.current = sourceSpec
	})

	const monitor = useMemo(() => new DragSourceMonitorImpl(manager), [manager])
	useEffect(
		function registerSourceWithMonitor() {
			const { handlerId, unregister } = registerSource(
				sourceSpec.item.type,
				handler,
				manager,
			)
			monitor.receiveHandlerId(handlerId)
			return unregister
		},
		[monitor],
	)

	// Can't use createSourceFactory, as semantics are different
	const handler = useMemo(
		() =>
			({
				beginDrag() {
					const { begin, item } = sourceSpecRef.current
					if (begin) {
						const beginResult = begin(monitor)
						invariant(
							beginResult == null || typeof beginResult === 'object',
							'dragSpec.begin() must either return an object, undefined, or null',
						)
						return beginResult || item || {}
					}
					return item || {}
				},
				canDrag() {
					const { canDrag } = sourceSpecRef.current
					return canDrag ? canDrag(monitor) : true
				},
				isDragging(globalMonitor, target) {
					const { isDragging } = sourceSpecRef.current
					return isDragging
						? isDragging(monitor)
						: target === globalMonitor.getSourceId()
				},
				endDrag() {
					const { end } = sourceSpecRef.current
					if (end) {
						end(monitor.getItem(), monitor)
					}
				},
			} as DragSource),
		[],
	)

	return monitor
}
