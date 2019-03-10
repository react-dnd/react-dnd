import * as React from 'react'
import { DropTargetHookSpec, DropTargetMonitor } from '../../interfaces'
import { DropTarget, DragDropManager } from 'dnd-core'
import DropTargetMonitorImpl from '../../DropTargetMonitorImpl'
import registerTarget from '../../registerTarget'

export function useDropTargetMonitor<CustomProps, DragItem, DropResult>(
	manager: DragDropManager<any>,
	targetSpec: DropTargetHookSpec<CustomProps, DragItem, DropResult>,
): DropTargetMonitor {
	const targetSpecRef = React.useRef(targetSpec)

	React.useEffect(function updateDropTargetSpec() {
		targetSpecRef.current = targetSpec
	})

	const monitor = React.useMemo(() => new DropTargetMonitorImpl(manager), [
		manager,
	])
	React.useEffect(
		function registerTargetWithMonitor() {
			const { handlerId, unregister } = registerTarget(
				targetSpec.accept,
				handler,
				manager,
			)
			monitor.receiveHandlerId(handlerId)
			return unregister
		},
		[monitor],
	)

	// Can't use createSourceFactory, as semantics are different
	const handler = React.useMemo(
		() =>
			({
				canDrop() {
					const { canDrop } = targetSpecRef.current
					return canDrop ? canDrop(monitor.getItem(), monitor) : true
				},
				hover() {
					const { hover } = targetSpecRef.current
					if (hover) {
						hover(monitor.getItem(), monitor)
					}
				},
				drop() {
					const { drop } = targetSpecRef.current
					if (drop) {
						return drop(monitor.getItem(), monitor)
					}
				},
			} as DropTarget),
		[],
	)

	return monitor
}
