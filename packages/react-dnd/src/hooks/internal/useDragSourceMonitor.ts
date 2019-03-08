import { useMemo, useEffect, useRef } from 'react'
import { DragSource, DragDropManager } from 'dnd-core'
import { DragSourceHookSpec, DragSourceMonitor } from '../../interfaces'
import DragSourceMonitorImpl from '../../DragSourceMonitorImpl'
import registerSource from '../../registerSource'

export function useDragSourceMonitor<DragObject, CustomProps>(
	manager: DragDropManager<any>,
	sourceSpec: DragSourceHookSpec<DragObject, CustomProps>,
): DragSourceMonitor {
	const sourceSpecRef = useRef(sourceSpec)

	useEffect(() => {
		sourceSpecRef.current = sourceSpec
	})

	const monitor = useMemo(() => new DragSourceMonitorImpl(manager), [manager])
	useEffect(
		function registerSourceWithMonitor() {
			const { handlerId, unregister } = registerSource(
				sourceSpec.type,
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
					const { begin } = sourceSpecRef.current
					if (begin) {
						return begin(monitor)
					} else {
						return {}
					}
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
						end(monitor)
					}
				},
			} as DragSource),
		[],
	)

	return monitor
}
