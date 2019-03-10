declare var require: any
import { useEffect, useRef } from 'react'
import { DropTargetHookSpec } from '../interfaces'
import { useDragDropManager } from './internal/useDragDropManager'
import { useDropTargetMonitor } from './internal/useDropTargetMonitor'
import { useMonitorOutput } from './internal/useMonitorOutput'
const invariant = require('invariant')

/**
 * useDropTarget Hook (This API is experimental and subject to breaking changes in non-breaking versions)
 * @param spec The drop target specification
 */
export function useDrop<DragObject, DropResult, CollectedProps>(
	spec: DropTargetHookSpec<DragObject, DropResult, CollectedProps>,
): [CollectedProps, React.RefObject<any>] {
	const { accept, options, collect } = spec
	invariant(accept != null, 'accept must be defined')
	let { ref } = spec
	if (!ref) {
		ref = useRef(null)
	}

	const manager = useDragDropManager()
	const backend = manager.getBackend()
	const monitor = useDropTargetMonitor(manager, spec)

	/*
	 * Connect the Drop Target Element to the Backend
	 */
	useEffect(function connectDropTarget() {
		if (ref!.current) {
			const node = ref!.current
			if (node) {
				return backend.connectDropTarget(monitor.getHandlerId(), node, options)
			}
		}
	})

	const result: CollectedProps & { ref: React.RefObject<Element> } = collect
		? (useMonitorOutput(monitor as any, collect as any) as any)
		: (({} as CollectedProps) as any)
	return [result, ref]
}
