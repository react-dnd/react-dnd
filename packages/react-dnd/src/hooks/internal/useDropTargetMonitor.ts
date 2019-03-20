import { useMemo, useRef, useEffect } from 'react'
import { DropTargetHookSpec } from '../../interfaces'
import { DropTarget } from 'dnd-core'
import DropTargetMonitorImpl from '../../DropTargetMonitorImpl'
import registerTarget from '../../registerTarget'
import { useDragDropManager } from './useDragDropManager'
import createTargetConnector from '../../createTargetConnector'

export function useDropTargetMonitor<CustomProps, DragItem, DropResult>(
	targetSpec: DropTargetHookSpec<CustomProps, DragItem, DropResult>,
) {
	const manager = useDragDropManager()

	// Ref out the spec object
	const targetSpecRef = useRef(targetSpec)
	useEffect(function updateDropTargetSpec() {
		targetSpecRef.current = targetSpec
	})

	// Create the monitor and connector
	const monitor = useMemo(() => new DropTargetMonitorImpl(manager), [manager])
	const connector = useMemo(() => createTargetConnector(manager.getBackend()), [
		manager,
	])

	// Can't use createSourceFactory, as semantics are different
	const handler = useMemo(
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

	useEffect(
		function registerTargetWithMonitor() {
			const { handlerId, unregister } = registerTarget(
				targetSpec.accept,
				handler,
				manager,
			)
			monitor.receiveHandlerId(handlerId)
			connector.receiveHandlerId(handlerId)
			return unregister
		},
		[monitor, connector],
	)

	return [monitor, connector]
}
