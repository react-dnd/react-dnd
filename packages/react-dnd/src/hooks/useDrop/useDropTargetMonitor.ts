import { useMemo } from 'react'
import { DropTargetMonitorImpl } from '../../internals'
import { DropTargetMonitor } from '../../types'
import { useDragDropManager } from '../useDragDropManager'

export function useDropTargetMonitor(): DropTargetMonitor {
	const manager = useDragDropManager()
	return useMemo(() => new DropTargetMonitorImpl(manager), [manager])
}
