import { useMemo } from 'react'
import createTargetConnector from '../../createTargetConnector'
import { useDragDropManager } from './useDragDropManager'
import DropTargetMonitorImpl from '../../DropTargetMonitorImpl'
import { DropTargetMonitor } from '../../interfaces'

export function useDropTargetMonitor(): [DropTargetMonitor, any] {
	const manager = useDragDropManager()
	const monitor = useMemo(() => new DropTargetMonitorImpl(manager), [manager])
	const connector = useMemo(() => createTargetConnector(manager.getBackend()), [
		manager,
	])
	return [monitor, connector]
}
