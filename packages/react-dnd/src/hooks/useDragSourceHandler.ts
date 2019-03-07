import * as React from 'react'
import { DragDropMonitor } from 'dnd-core'
import { DragSourceHookSpec } from '../interfaces'

export function useDragSourceHandler<DragObject>(
	sourceSpec: DragSourceHookSpec<DragObject>,
) {
	const sourceSpecRef = React.useRef(sourceSpec)

	React.useEffect(() => {
		sourceSpecRef.current = sourceSpec
	})

	// Can't use createSourceFactory, as semantics are different
	const handler = React.useMemo(
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
			beginDrag(component: any) {
				const { beginDrag } = sourceSpecRef.current
				if (beginDrag) {
					beginDrag(component)
				}
			},
			endDrag(component: any) {
				const { endDrag } = sourceSpecRef.current
				if (endDrag) {
					endDrag(component)
				}
			},
		}),
		[],
	)

	return handler
}
