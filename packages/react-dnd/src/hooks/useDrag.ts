declare var require: any
import { useEffect } from 'react'
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
	CustomProps
>(spec: DragSourceHookSpec<DragObject, DropResult, CustomProps>): CustomProps {
	const { ref, item, options, preview, previewOptions, collect } = spec
	invariant(ref != null, 'ref instance must be defined')
	invariant(typeof ref === 'object', 'ref must be a ref object')
	invariant(item != null, 'item must be defined')
	invariant(item.type != null, 'item type must be defined')
	const manager = useDragDropManager()
	const backend = manager.getBackend()
	const monitor = useDragSourceMonitor<DragObject, DropResult, CustomProps>(
		manager,
		spec,
	)

	/*
	 * Connect the Drag Source Element to the Backend
	 */
	useEffect(function connectDragSource() {
		const node = ref.current
		return backend.connectDragSource(monitor.getHandlerId(), node, options)
	}, [])

	/*
	 * Connect the Drag Preview Element to the Backend
	 */
	useEffect(
		function connectDragPreview() {
			const connectPreview = (p: any) => {
				const previewNode = isRef(p) ? (p as Ref<any>).current : p
				return backend.connectDragPreview(
					monitor.getHandlerId(),
					previewNode,
					previewOptions,
				)
			}

			if (preview == null) {
				return
			}
			if (typeof (preview as any).then === 'function') {
				;(preview as any).then((p: any) => connectPreview(p))
			} else {
				connectPreview(preview)
			}
		},
		[preview && (preview as Ref<any>).current],
	)

	if (collect) {
		return useMonitorOutput(monitor as any, collect as any)
	} else {
		return {} as CustomProps
	}
}
