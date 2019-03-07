import { useMemo, useEffect } from 'react'
import { TargetType } from 'dnd-core'
import registerTarget from '../registerTarget'
import createTargetMonitor from '../createTargetMonitor'
import { DropTargetMonitor, DropTargetHookSpec } from '../interfaces'
import { useDragDropManager } from './useDragDropManager'
import { useMonitorSubscription } from './useMonitorSubscription'
import { Ref, HandlerManager } from './util'
import { useDropTargetHandler } from './useDropTargetHandler'
import { useMonitorOutput } from './useMonitorOutput'

/**
 * useDropTarget Hook
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
	const dragDropManager = useDragDropManager()
	const backend = dragDropManager.getBackend()
	const targetMonitor = useMemo(() => createTargetMonitor(dragDropManager), [
		dragDropManager,
	]) as DropTargetMonitor & HandlerManager
	const handler = useDropTargetHandler<CustomProps>(targetSpec)

	useMonitorSubscription(
		registerTarget,
		type,
		handler,
		dragDropManager,
		targetMonitor,
	)

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
