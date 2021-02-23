import { DragDropManager } from 'dnd-core'
import { useMemo } from 'react'
import { DragSourceMonitorImpl } from '../../internals'
import { DragSourceMonitor } from '../../types'

export function useDragSourceMonitor(
	manager: DragDropManager,
): DragSourceMonitor {
	return useMemo(() => new DragSourceMonitorImpl(manager), [manager])
}
