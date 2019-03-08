declare var require: any
import { useEffect } from 'react'
import { DropTargetHookSpec } from '../interfaces'
import { useDragDropManager } from './internal/useDragDropManager'
import { useDropTargetHandler } from './internal/useDropTargetHandler'
import { useMonitorOutput } from './internal/useMonitorOutput'
import { useDropTargetMonitor } from './internal/useDropTargetMonitor'
const invariant = require('invariant')

/**
 * useDropTarget Hook (This API is experimental and subject to breaking changes in non-breaking versions)
 * @param spec The drop target specification
 */
export function useDrop<CustomProps>(
	spec: DropTargetHookSpec<CustomProps>,
): CustomProps {
	const { ref, type, options, collect } = spec
	invariant(ref != null, 'ref instance must be defined')
	invariant(typeof ref === 'object', 'ref must be a ref object')
	invariant(type != null, 'type must be defined')

	const manager = useDragDropManager()
	const backend = manager.getBackend()
	const handler = useDropTargetHandler<CustomProps>(spec)
	const targetMonitor = useDropTargetMonitor(type, handler, manager)

	/*
	 * Connect the Drop Target Element to the Backend
	 */
	useEffect(function connectDropTarget() {
		if (ref.current) {
			const node = ref.current
			if (node) {
				return backend.connectDropTarget(
					targetMonitor.getHandlerId(),
					node,
					options,
				)
			}
		}
	})

	if (collect) {
		return useMonitorOutput(targetMonitor as any, collect as any)
	} else {
		return {} as CustomProps
	}
}
