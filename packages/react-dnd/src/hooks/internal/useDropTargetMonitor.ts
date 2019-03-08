import * as React from 'react'
import { DropTargetHookSpec, DropTargetMonitor } from '../../interfaces'
import { DropTarget, DragDropManager } from 'dnd-core'
import DropTargetMonitorImpl from '../../DropTargetMonitorImpl'
import registerTarget from '../../registerTarget'

export function useDropTargetMonitor<CustomProps>(
	manager: DragDropManager<any>,
	targetSpec: DropTargetHookSpec<CustomProps>,
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
				targetSpec.type,
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
					return canDrop ? canDrop(monitor) : true
				},
				hover() {
					const { hover } = targetSpecRef.current
					if (hover) {
						hover(monitor)
					}
				},
				drop() {
					const { drop } = targetSpecRef.current
					if (drop) {
						return drop(monitor)
					}
				},
			} as DropTarget),
		[],
	)

	return monitor
}
