declare var require: any
import { useEffect, useRef } from 'react'
import { DragSourceHookSpec, DragObjectWithType } from '../interfaces'
import { useDragSourceMonitor } from './internal/useDragSourceMonitor'
import { useDragDropManager } from './internal/useDragDropManager'
import { Ref, isRef } from './util'
import { useMonitorOutput } from './internal/useMonitorOutput'
const invariant = require('invariant')

/**
 * useDragSource hook (This API is experimental and subject to breaking changes in non-major versions)
 * @param sourceSpec The drag source specification *
 */
export function useDrag<
	DragObject extends DragObjectWithType,
	DropResult,
	CollectedProps,
	ElementType extends Element
>(
	spec: DragSourceHookSpec<DragObject, DropResult, CollectedProps>,
): CollectedProps & { ref: React.RefObject<ElementType> } {
	const { item, options, preview, previewOptions, collect } = spec
	let { ref } = spec
	invariant(item != null, 'item must be defined')
	invariant(item.type != null, 'item type must be defined')
	const manager = useDragDropManager()
	const backend = manager.getBackend()
	const monitor = useDragSourceMonitor<DragObject, DropResult, CollectedProps>(
		manager,
		spec,
	)
	if (!ref) {
		ref = useRef(null)
	}

	/*
	 * Connect the Drag Source Element to the Backend
	 */
	useEffect(function connectDragSource() {
		const node = ref!.current
		return backend.connectDragSource(monitor.getHandlerId(), node, options)
	}, [])

	/*
	 * Connect the Drag Preview Element to the Backend
	 */
	useEffect(
		function connectDragPreview() {
			if (preview) {
				const previewNode = isRef(preview)
					? (preview as Ref<any>).current
					: preview
				return backend.connectDragPreview(
					monitor.getHandlerId(),
					previewNode,
					previewOptions,
				)
			}
		},
		[preview && (preview as Ref<any>).current],
	)

	const result: CollectedProps & { ref: React.RefObject<Element> } = collect
		? (useMonitorOutput(monitor as any, collect as any) as any)
		: (({} as CollectedProps) as any)
	result.ref = ref!
	return result as any
}
