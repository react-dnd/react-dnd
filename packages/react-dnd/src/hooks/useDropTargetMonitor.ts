import { useMemo, useEffect } from 'react'
import registerTarget from '../registerTarget'
import { DragDropManager, TargetType, DropTarget } from 'dnd-core'
import DropTargetMonitorImpl from '../DropTargetMonitorImpl'
import { DropTargetMonitor } from '../interfaces'

export function useDropTargetMonitor<Context>(
	type: TargetType,
	target: DropTarget,
	manager: DragDropManager<Context>,
): DropTargetMonitor {
	const monitor = useMemo(() => new DropTargetMonitorImpl(manager), [manager])
	useEffect(
		function registerTargetWithMonitor() {
			const { handlerId, unregister } = registerTarget(type, target, manager)
			monitor.receiveHandlerId(handlerId)
			return unregister
		},
		[monitor],
	)

	return monitor
}
