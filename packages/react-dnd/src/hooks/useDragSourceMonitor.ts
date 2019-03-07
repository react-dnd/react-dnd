import { useMemo, useEffect } from 'react'
import registerSource from '../registerSource'
import { DragDropManager, SourceType, DragSource } from 'dnd-core'
import DragSourceMonitorImpl from '../DragSourceMonitorImpl'

export function useDragSourceMonitor<Context>(
	type: SourceType,
	source: DragSource,
	manager: DragDropManager<Context>,
) {
	const monitor = useMemo(() => new DragSourceMonitorImpl(manager), [manager])
	useEffect(
		function registerSourceWithMonitor() {
			const { handlerId, unregister } = registerSource(type, source, manager)
			monitor.receiveHandlerId(handlerId)
			return unregister
		},
		[monitor],
	)

	return monitor
}
