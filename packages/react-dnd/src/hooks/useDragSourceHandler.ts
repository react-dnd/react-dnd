import { useMemo, useEffect, useRef } from 'react'
import { DragDropMonitor } from 'dnd-core'
import { DragSourceHookSpec } from '../interfaces'

export function useDragSourceHandler<DragObject>(
	sourceSpec: DragSourceHookSpec<DragObject>,
) {
	const sourceSpecRef = useRef(sourceSpec)

	useEffect(() => {
		sourceSpecRef.current = sourceSpec
	})

	// Can't use createSourceFactory, as semantics are different
	const handler = useMemo(
		() => ({
			canDrag() {
				const { canDrag } = sourceSpecRef.current
				return canDrag ? canDrag() : true
			},
			isDragging(globalMonitor: DragDropMonitor, sourceId: string) {
				const { isDragging } = sourceSpecRef.current
				return isDragging
					? isDragging()
					: sourceId === globalMonitor.getSourceId()
			},
			beginDrag() {
				const { beginDrag } = sourceSpecRef.current
				return (beginDrag as any)()
			},
			endDrag() {
				const { endDrag } = sourceSpecRef.current
				if (endDrag) {
					;(endDrag as any)()
				}
			},
		}),
		[],
	)

	return handler
}
