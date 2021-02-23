import { DragDropManager } from 'dnd-core'
import { useMemo } from 'react'
import { DragSourceMonitorImpl, SourceConnector } from '../../internals'
import { DragSourceMonitor } from '../../types'

export function useDragSourceMonitor(
	manager: DragDropManager,
): [DragSourceMonitor, SourceConnector] {
	const monitor = useMemo(() => new DragSourceMonitorImpl(manager), [manager])
	const connector = useMemo(() => new SourceConnector(manager.getBackend()), [
		manager,
	])
	return [monitor, connector]
}
