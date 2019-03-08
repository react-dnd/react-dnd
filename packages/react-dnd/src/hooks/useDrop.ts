import { useEffect } from 'react'
import { TargetType } from 'dnd-core'
import { DropTargetHookSpec } from '../interfaces'
import { useDragDropManager } from './useDragDropManager'
import { Ref } from './util'
import { useDropTargetHandler } from './useDropTargetHandler'
import { useMonitorOutput } from './useMonitorOutput'
import { useDropTargetMonitor } from './useDropTargetMonitor'

/**
 * useDropTarget Hook (This API is experimental and subject to breaking changes in non-breaking versions)
 * @param ref The drop target's ref
 * @param type The drop target type
 * @param targetSpec The drop target specification
 */
export function useDropTarget<CustomProps>(
	ref: Ref<any>,
	type: TargetType,
	targetSpec: DropTargetHookSpec<CustomProps> & {
		dropTargetOptions?: {}
	},
): CustomProps {
	const manager = useDragDropManager()
	const backend = manager.getBackend()
	const handler = useDropTargetHandler<CustomProps>(targetSpec)
	const targetMonitor = useDropTargetMonitor(type, handler, manager)

	/*
	 * Connect the Drop Target Element to the Backend
	 */
	useEffect(function connectDropTarget() {
		const dropTargetNode = ref.current
		if (dropTargetNode) {
			const dropTargetOptions = targetSpec.dropTargetOptions
			return backend.connectDropTarget(
				targetMonitor.getHandlerId(),
				dropTargetNode,
				dropTargetOptions,
			)
		}
	}, [])

	const collector = targetSpec.collect || (() => ({}))
	return useMonitorOutput(targetMonitor as any, collector as any)
}
