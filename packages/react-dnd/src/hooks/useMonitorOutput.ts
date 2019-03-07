import { useEffect } from 'react'
import { useCollector } from './useCollector'
import { HandlerManager } from './util'
import { DragDropMonitor } from 'dnd-core'

export function useMonitorOutput<
	Monitor extends DragDropMonitor & HandlerManager,
	Collected
>(monitor: Monitor, collect: (monitor: Monitor) => Collected): Collected {
	const [collected, updateCollected] = useCollector(monitor, collect)

	// This runs on every render. There will be ways to optimise this, but for
	// now, this is the most correct thing to do.
	useEffect(function subscribeToMonitorStateChange() {
		const handlerId = monitor.getHandlerId()
		if (handlerId == null) {
			return undefined
		}
		return (monitor as DragDropMonitor).subscribeToStateChange(
			updateCollected,
			{ handlerIds: [handlerId] },
		)
	})

	return collected
}
