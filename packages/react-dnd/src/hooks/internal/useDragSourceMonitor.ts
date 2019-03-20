import { useMemo } from 'react'
import DragSourceMonitorImpl from '../../DragSourceMonitorImpl'
import createSourceConnector from '../../createSourceConnector'
import { useDragDropManager } from './useDragDropManager'
import { DragSourceMonitor } from '../../interfaces'

export function useDragSourceMonitor(): [DragSourceMonitor, any] {
	const manager = useDragDropManager()
	const monitor = useMemo(() => new DragSourceMonitorImpl(manager), [manager])
	const connector = useMemo(() => createSourceConnector(manager.getBackend()), [
		manager,
	])
	return [monitor, connector]
}
