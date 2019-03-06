import * as React from 'react'
import { DragDropMonitor, SourceType } from 'dnd-core'
import registerSource from '../registerSource'
import createSourceMonitor from '../createSourceMonitor'
import {
	DragSourceMonitor,
	DragPreviewOptions,
	DragSourceHookSpec,
} from '../interfaces'
import { useDragDropManager } from './useDragDropManager'
import { useMonitorSubscription } from './useMonitorSubscription'
import { Ref, HandlerManager, isRef } from './util'

function useDragSourceHandler<DragObject>(
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

/**
 *
 * @param ref The drag source element
 * @param type The drag source type
 * @param sourceSpec The drag source specification
 */
export function useDragSource<DragObject = {}>(
	ref: Ref<any>,
	type: SourceType,
	sourceSpec: DragSourceHookSpec<DragObject> & {
		dragSourceOptions?: {}
		dragPreview?: Ref<any> | Element
		dragPreviewOptions?: DragPreviewOptions
	},
): DragSourceMonitor & HandlerManager {
	const dragDropManager = useDragDropManager()
	const backend = dragDropManager.getBackend()
	const sourceMonitor = React.useMemo(
		() => createSourceMonitor(dragDropManager),
		[dragDropManager],
	) as DragSourceMonitor & HandlerManager

	const handler = useDragSourceHandler<DragObject>(sourceSpec)

	useMonitorSubscription(
		registerSource,
		type,
		handler,
		dragDropManager,
		sourceMonitor,
	)

	React.useEffect(function connectDragSourceToBackend() {
		const dragSourceNode = ref.current
		const dragSourceOptions = sourceSpec.dragSourceOptions
		const disconnectDragSource = backend.connectDragSource(
			sourceMonitor.getHandlerId(),
			dragSourceNode,
			dragSourceOptions,
		)

		return disconnectDragSource
	}, [])

	React.useEffect(function connectDragPreviewToBackend() {
		if (sourceSpec.dragPreview == null) {
			return undefined
		}

		// Accept ref or dom node
		const dragPreviewNode = isRef(sourceSpec.dragPreview)
			? (sourceSpec.dragPreview as Ref<any>).current
			: sourceSpec.dragPreview
		const dragPreviewOptions = sourceSpec.dragPreviewOptions
		const disconnectDragPreview = backend.connectDragPreview(
			sourceMonitor.getHandlerId(),
			dragPreviewNode,
			dragPreviewOptions,
		)

		return disconnectDragPreview
	}, [])

	return sourceMonitor
}
