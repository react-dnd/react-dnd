import { useMemo, useEffect } from 'react'
import { TargetType } from 'dnd-core'
import registerTarget from '../registerTarget'
import createTargetMonitor from '../createTargetMonitor'
import { DropTargetMonitor, DropTargetHookSpec } from '../interfaces'
import { useDragDropManager } from './useDragDropManager'
import { useMonitorSubscription } from './useMonitorSubscription'
import { Ref, HandlerManager } from './util'
import { useDropTargetHandler } from './useDropTargetHandler'

/**
 * useDropTarget Hook
 * @param ref The drop target's ref
 * @param type The drop target type
 * @param targetSpec The drop target specification
 */
export function useDropTarget(
	ref: Ref<any>,
	type: TargetType,
	targetSpec: DropTargetHookSpec & {
		dropTargetOptions?: {}
	},
): DropTargetMonitor & HandlerManager {
	const dragDropManager = useDragDropManager()
	const backend = dragDropManager.getBackend()
	const targetMonitor = useMemo(() => createTargetMonitor(dragDropManager), [
		dragDropManager,
	]) as DropTargetMonitor & HandlerManager
	const handler = useDropTargetHandler(targetSpec)

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

	return targetMonitor
}
