import { useEffect } from 'react'
import { SourceType } from 'dnd-core'
import { DragPreviewOptions, DragSourceHookSpec } from '../interfaces'
import { useDragSourceHandler } from './useDragSourceHandler'
import { useDragDropManager } from './useDragDropManager'
import { Ref, isRef } from './util'
import { useMonitorOutput } from './useMonitorOutput'
import { useDragSourceMonitor } from './useDragSourceMonitor'

/**
 * useDragSource hook (This API is experimental and subject to breaking changes in non-major versions)
 * @param ref The drag source element
 * @param type The drag source type
 * @param sourceSpec The drag source specification *
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
	const manager = useDragDropManager()
	const backend = manager.getBackend()
	const handler = useDragSourceHandler<DragObject, CustomProps>(sourceSpec)
	const sourceMonitor = useDragSourceMonitor(type, handler, manager)

	/*
	 * Connect the Drag Source Element to the Backend
	 */
	useEffect(function connectDragSource() {
		const dragSourceNode = ref.current
		const dragSourceOptions = sourceSpec.dragSourceOptions
		return backend.connectDragSource(
			sourceMonitor.getHandlerId(),
			dragSourceNode,
			dragSourceOptions,
		)
	}, [])

	/*
	 * Connect the Drag Previem Element to the Backend
	 */
	useEffect(function connectDragPreview() {
		if (sourceSpec.dragPreview == null) {
			return undefined
		}
		const dragPreviewNode = isRef(sourceSpec.dragPreview)
			? (sourceSpec.dragPreview as Ref<any>).current
			: sourceSpec.dragPreview
		const { dragPreviewOptions } = sourceSpec
		return backend.connectDragPreview(
			sourceMonitor.getHandlerId(),
			dragPreviewNode,
			dragPreviewOptions,
		)
	}, [])

	const collector = sourceSpec.collect || (() => ({}))
	return useMonitorOutput(sourceMonitor as any, collector as any)
}
