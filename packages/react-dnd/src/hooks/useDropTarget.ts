import * as React from 'react'
import { TargetType } from 'dnd-core'
import registerTarget from '../registerTarget'
import createTargetMonitor from '../createTargetMonitor'
import { DropTargetMonitor, DropTargetHookSpec } from '../interfaces'
import { useDragDropManager } from './useDragDropManager'
import { useMonitorSubscription } from './useMonitorSubscription'
import { Ref, HandlerManager } from './util'

function useDropTargetHandler(targetSpec: DropTargetHookSpec) {
	const targetSpecRef = React.useRef(targetSpec)

	React.useEffect(function updateDropTargetSpec() {
		targetSpecRef.current = targetSpec
	})

	// Can't use createSourceFactory, as semantics are different
	const handler = React.useMemo(
		() => ({
			canDrop() {
				const { canDrop } = targetSpecRef.current
				return canDrop ? canDrop() : true
			},
			hover(component: any) {
				const { hover } = targetSpecRef.current
				if (hover) {
					hover(component)
				}
			},
			drop(component: any) {
				const { drop } = targetSpecRef.current
				if (drop) {
					drop(component)
				}
			},
		}),
		[],
	)

	return handler
}

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
	const targetMonitor = React.useMemo(
		() => createTargetMonitor(dragDropManager),
		[dragDropManager],
	) as DropTargetMonitor & HandlerManager
	const handler = useDropTargetHandler(targetSpec)

	useMonitorSubscription(
		registerTarget,
		type,
		handler,
		dragDropManager,
		targetMonitor,
	)

	React.useEffect(() => {
		const dropTargetNode = ref.current
		if (dropTargetNode) {
			const dropTargetOptions = targetSpec.dropTargetOptions
			const disconnectDropTarget = backend.connectDropTarget(
				targetMonitor.getHandlerId(),
				dropTargetNode,
				dropTargetOptions,
			)
			return disconnectDropTarget
		}
	}, [])

	return targetMonitor
}
