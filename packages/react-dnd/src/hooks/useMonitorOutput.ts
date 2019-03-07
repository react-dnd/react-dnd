import { useEffect } from 'react'
import { useCollector } from './useCollector'
import { HandlerManager } from './util'
import { DragDropMonitor } from 'dnd-core'
import { DropTargetMonitor, DragSourceMonitor } from '../interfaces'

export function useMonitorOutput<Output = {}>(
	monitor: HandlerManager & (DropTargetMonitor | DragSourceMonitor),
	collect: (monitor: any) => Output,
): Output {
	const [value, updateIfNeeded] = useCollector(monitor, collect)

	// This runs on every render. There will be ways to optimise this, but for
	// now, this is the most correct thing to do.
	useEffect(function subscribeToMonitorStateChange() {
		const handlerId = monitor.getHandlerId()
		if (handlerId == null) {
			return undefined
		}
		const options = { handlerIds: [handlerId] }
		return (monitor as DragDropMonitor).subscribeToStateChange(
			updateIfNeeded,
			options,
		)
	})

	return value
}
