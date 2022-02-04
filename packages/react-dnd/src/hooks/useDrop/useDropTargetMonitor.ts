import { useMemo } from 'react'
import { DropTargetMonitorImpl } from '../../internals'
import type { DropTargetMonitor } from '../../types'
import { useDragDropManager } from '../useDragDropManager'

export function useDropTargetMonitor<O, R>(): DropTargetMonitor<O, R> {
	const manager = useDragDropManager()
	return useMemo(() => new DropTargetMonitorImpl(manager), [manager])
}
