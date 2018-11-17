import * as React from 'react'
import { DragDropMonitor, SourceType } from 'dnd-core'
import registerSource from '../registerSource'
import createSourceMonitor from '../createSourceMonitor'
import { DragSourceMonitor, DragSourceSpec } from '../interfaces'
import {
	Ref,
	NoArgs,
	HandlerManager,
	isRef,
	useDragDropManager,
	useMonitorSubscription,
} from './util'

function useDragSourceHandler<DragObject>(
	sourceSpec: DragSourceSpec<void, DragObject>,
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
				return canDrag != null ? (canDrag as NoArgs<boolean>)() : true
			},
			isDragging(globalMonitor: DragDropMonitor, sourceId: string) {
				const { isDragging } = sourceSpecRef.current
				return isDragging != null
					? (isDragging as NoArgs<boolean>)()
					: sourceId === globalMonitor.getSourceId()
			},
			beginDrag() {
				return (sourceSpecRef.current.beginDrag as NoArgs<DragObject>)()
			},
			endDrag() {
				const { endDrag } = sourceSpecRef.current
				if (endDrag != null) {
					;(endDrag as NoArgs<void>)()
				}
			},
		}),
		[],
	)

	return handler
}

export function useDragSource<DragObject = {}>(
	ref: Ref,
	type: SourceType,
	sourceSpec: DragSourceSpec<void, DragObject> & {
		dragSourceOptions?: {}
		dragPreview?: any
		dragPreviewOptions?: {}
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

	React.useEffect(() => {
		const dragSourceNode = ref.current
		const dragSourceOptions = sourceSpec.dragSourceOptions

		const disconnectDragSource = backend.connectDragSource(
			sourceMonitor.getHandlerId(),
			dragSourceNode,
			dragSourceOptions,
		)

		return disconnectDragSource
	}, [])

	React.useEffect(() => {
		if (sourceSpec.dragPreview == null) {
			return undefined
		}

		// Accept ref or dom node
		const dragPreviewNode = isRef(sourceSpec.dragPreview)
			? sourceSpec.dragPreview.current
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
