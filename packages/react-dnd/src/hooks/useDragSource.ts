import { useMemo, useEffect } from 'react'
import { SourceType } from 'dnd-core'
import registerSource from '../registerSource'
import createSourceMonitor from '../createSourceMonitor'
import {
	DragSourceMonitor,
	DragPreviewOptions,
	DragSourceHookSpec,
} from '../interfaces'
import { useDragSourceHandler } from './useDragSourceHandler'
import { useDragDropManager } from './useDragDropManager'
import { useMonitorSubscription } from './useMonitorSubscription'
import { Ref, HandlerManager, isRef } from './util'
import { useMonitorOutput } from './useMonitorOutput'

/**
 * useDragSource hook
 * @param ref The drag source element
 * @param type The drag source type
 * @param sourceSpec The drag source specification
 */
export function useDragSource<DragObject, CustomProps>(
	ref: Ref<any>,
	type: SourceType,
	sourceSpec: DragSourceHookSpec<DragObject, CustomProps> & {
		dragSourceOptions?: {}
		dragPreview?: Ref<any> | Element
		dragPreviewOptions?: DragPreviewOptions
	},
): CustomProps {
	const dragDropManager = useDragDropManager()
	const backend = dragDropManager.getBackend()
	const sourceMonitor = useMemo(() => createSourceMonitor(dragDropManager), [
		dragDropManager,
	]) as DragSourceMonitor & HandlerManager

	const handler = useDragSourceHandler<DragObject, CustomProps>(sourceSpec)

	useMonitorSubscription(
		registerSource,
		type,
		handler,
		dragDropManager,
		sourceMonitor,
	)

	useEffect(function connectDragSourceToBackend() {
		const dragSourceNode = ref.current
		const dragSourceOptions = sourceSpec.dragSourceOptions
		return backend.connectDragSource(
			sourceMonitor.getHandlerId(),
			dragSourceNode,
			dragSourceOptions,
		)
	}, [])

	useEffect(function connectDragPreviewToBackend() {
		if (sourceSpec.dragPreview == null) {
			return undefined
		}

		// Accept ref or dom node
		const dragPreviewNode = isRef(sourceSpec.dragPreview)
			? (sourceSpec.dragPreview as Ref<any>).current
			: sourceSpec.dragPreview

		const dragPreviewOptions = sourceSpec.dragPreviewOptions
		return backend.connectDragPreview(
			sourceMonitor.getHandlerId(),
			dragPreviewNode,
			dragPreviewOptions,
		)
	}, [])

	return useMonitorOutput(sourceMonitor as any, sourceSpec.collect as any)
}
