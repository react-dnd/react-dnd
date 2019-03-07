import { useMemo, useEffect, useRef } from 'react'
import { DragSource } from 'dnd-core'
import { DragSourceHookSpec, DragSourceMonitor } from '../interfaces'

export function useDragSourceHandler<DragObject, CustomProps>(
	sourceSpec: DragSourceHookSpec<DragObject, CustomProps>,
) {
	const sourceSpecRef = useRef(sourceSpec)

	useEffect(() => {
		sourceSpecRef.current = sourceSpec
	})

	// Can't use createSourceFactory, as semantics are different
	const handler = useMemo(
		() =>
			({
				beginDrag(monitor, target) {
					const { beginDrag } = sourceSpecRef.current
					return beginDrag((monitor as any) as DragSourceMonitor)
				},
				canDrag(monitor, target) {
					const { canDrag } = sourceSpecRef.current
					return canDrag ? canDrag((monitor as any) as DragSourceMonitor) : true
				},
				isDragging(monitor, target) {
					const { isDragging } = sourceSpecRef.current
					return isDragging
						? isDragging((monitor as any) as DragSourceMonitor)
						: target === monitor.getSourceId()
				},
				endDrag(monitor, target) {
					const { endDrag } = sourceSpecRef.current
					if (endDrag) {
						endDrag((monitor as any) as DragSourceMonitor)
					}
				},
			} as DragSource),
		[],
	)

	return handler
}
