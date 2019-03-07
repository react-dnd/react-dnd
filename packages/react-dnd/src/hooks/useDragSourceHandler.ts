import { useMemo, useEffect, useRef } from 'react'
import { DragSource } from 'dnd-core'
import { DragSourceHookSpec } from '../interfaces'

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
					return beginDrag()
				},
				canDrag(monitor, target) {
					const { canDrag } = sourceSpecRef.current
					return canDrag ? canDrag() : true
				},
				isDragging(monitor, target) {
					const { isDragging } = sourceSpecRef.current
					return isDragging ? isDragging() : target === monitor.getSourceId()
				},
				endDrag(monitor, target) {
					const { endDrag } = sourceSpecRef.current
					if (endDrag) {
						endDrag()
					}
				},
			} as DragSource),
		[],
	)

	return handler
}
