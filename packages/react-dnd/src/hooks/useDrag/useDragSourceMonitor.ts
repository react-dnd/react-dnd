import { useMemo } from 'react'
import { DragSourceMonitorImpl } from '../../internals'
import { DragSourceMonitor } from '../../types'
import { useDragDropManager } from '../useDragDropManager'

export function useDragSourceMonitor<O, R>(): DragSourceMonitor<O, R> {
	const manager = useDragDropManager()
	return useMemo(() => new DragSourceMonitorImpl(manager), [manager])
}
