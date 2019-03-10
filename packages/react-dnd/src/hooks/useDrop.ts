declare var require: any
import { useEffect } from 'react'
import { DropTargetHookSpec } from '../interfaces'
import { useDragDropManager } from './internal/useDragDropManager'
import { useDropTargetMonitor } from './internal/useDropTargetMonitor'
import { useMonitorOutput } from './internal/useMonitorOutput'
const invariant = require('invariant')

/**
 * useDropTarget Hook (This API is experimental and subject to breaking changes in non-breaking versions)
 * @param spec The drop target specification
 */
export function useDrop<DragObject, DropResult, CustomProps>(
	spec: DropTargetHookSpec<DragObject, DropResult, CustomProps>,
): CustomProps {
	const { ref, type, options, collect } = spec
	invariant(ref != null, 'ref instance must be defined')
	invariant(typeof ref === 'object', 'ref must be a ref object')
	invariant(type != null, 'type must be defined')

	const manager = useDragDropManager()
	const backend = manager.getBackend()
	const monitor = useDropTargetMonitor(manager, spec)

	/*
	 * Connect the Drop Target Element to the Backend
	 */
	useEffect(function connectDropTarget() {
		if (ref.current) {
			const node = ref.current
			if (node) {
				return backend.connectDropTarget(monitor.getHandlerId(), node, options)
			}
		}
	})

	if (collect) {
		return useMonitorOutput(monitor as any, collect as any)
	} else {
		return {} as CustomProps
	}
}
