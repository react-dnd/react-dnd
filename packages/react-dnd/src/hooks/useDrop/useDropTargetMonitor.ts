import { DragDropManager } from 'dnd-core'
import { useMemo } from 'react'
import { DropTargetMonitorImpl } from '../../internals'
import { DropTargetMonitor } from '../../types'

export function useDropTargetMonitor(
	manager: DragDropManager,
): DropTargetMonitor {
	return useMemo(() => new DropTargetMonitorImpl(manager), [manager])
}
