import { useEffect } from 'react'
import { DragSourceHookSpec } from '../interfaces'
import { useDragSourceHandler } from './useDragSourceHandler'
import { useDragDropManager } from './useDragDropManager'
import { Ref, isRef } from './util'
import { useMonitorOutput } from './useMonitorOutput'
import { useDragSourceMonitor } from './useDragSourceMonitor'

/**
 * useDragSource hook (This API is experimental and subject to breaking changes in non-major versions)
 * @param sourceSpec The drag source specification *
 */
export function useDrag<DragObject, CustomProps>(
	spec: DragSourceHookSpec<DragObject, CustomProps>,
): CustomProps {
	const {
		ref,
		type,
		dragSourceOptions,
		dragPreview,
		dragPreviewOptions,
		collect,
	} = spec
	const manager = useDragDropManager()
	const backend = manager.getBackend()
	const handler = useDragSourceHandler<DragObject, CustomProps>(spec)
	const sourceMonitor = useDragSourceMonitor(type, handler, manager)

	/*
	 * Connect the Drag Source Element to the Backend
	 */
	useEffect(function connectDragSource() {
		const dragSourceNode = ref.current
		return backend.connectDragSource(
			sourceMonitor.getHandlerId(),
			dragSourceNode,
			dragSourceOptions,
		)
	}, [])

	/*
	 * Connect the Drag Preview Element to the Backend
	 */
	useEffect(function connectDragPreview() {
		if (dragPreview == null) {
			return undefined
		}
		const dragPreviewNode = isRef(dragPreview)
			? (dragPreview as Ref<any>).current
			: dragPreview
		return backend.connectDragPreview(
			sourceMonitor.getHandlerId(),
			dragPreviewNode,
			dragPreviewOptions,
		)
	}, [])

	if (collect) {
		return useMonitorOutput(sourceMonitor as any, collect as any)
	} else {
		return {} as CustomProps
	}
}
