import { useEffect } from 'react'
import { DropTargetHookSpec } from '../interfaces'
import { useDragDropManager } from './useDragDropManager'
import { useDropTargetHandler } from './useDropTargetHandler'
import { useMonitorOutput } from './useMonitorOutput'
import { useDropTargetMonitor } from './useDropTargetMonitor'

/**
 * useDropTarget Hook (This API is experimental and subject to breaking changes in non-breaking versions)
 * @param spec The drop target specification
 */
export function useDrop<CustomProps>(
	spec: DropTargetHookSpec<CustomProps>,
): CustomProps {
	const { ref, type, dropTargetOptions, collect } = spec
	const manager = useDragDropManager()
	const backend = manager.getBackend()
	const handler = useDropTargetHandler<CustomProps>(spec)
	const targetMonitor = useDropTargetMonitor(type, handler, manager)

	/*
	 * Connect the Drop Target Element to the Backend
	 */
	useEffect(function connectDropTarget() {
		if (ref && ref.current) {
			const dropTargetNode = ref.current
			if (dropTargetNode) {
				return backend.connectDropTarget(
					targetMonitor.getHandlerId(),
					dropTargetNode,
					dropTargetOptions,
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
