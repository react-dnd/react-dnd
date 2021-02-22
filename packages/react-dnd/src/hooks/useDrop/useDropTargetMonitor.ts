import { DragDropManager } from 'dnd-core'
import { useMemo } from 'react'
import { DropTargetMonitorImpl, TargetConnector } from '../../internals'
import { DropTargetMonitor } from '../../types'

export function useDropTargetMonitor(
	manager: DragDropManager,
): [DropTargetMonitor, TargetConnector] {
	const monitor = useMemo(() => new DropTargetMonitorImpl(manager), [manager])
	const connector = useMemo(() => new TargetConnector(manager.getBackend()), [
		manager,
	])
	return [monitor, connector]
}
