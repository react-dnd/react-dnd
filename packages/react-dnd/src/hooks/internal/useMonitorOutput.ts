import { useEffect } from 'react'
import { useCollector } from './useCollector'
import { HandlerManager } from '../../interfaces'
import { DragDropMonitor } from 'dnd-core'
import { Connector } from 'react-dnd/SourceConnector'

export function useMonitorOutput<
	Monitor extends DragDropMonitor & HandlerManager,
	Collected
>(
	monitor: Monitor,
	connector: Connector,
	collect: (monitor: Monitor) => Collected,
): Collected {
	const [collected, updateCollected] = useCollector(monitor, collect, connector)

	// This runs on every render. There will be ways to optimise this, but for
	// now, this is the most correct thing to do.
	useEffect(
		function subscribeToMonitorStateChange() {
			const handlerId = monitor.getHandlerId()
			if (handlerId == null) {
				return undefined
			}
			return monitor.subscribeToStateChange(updateCollected, {
				handlerIds: [handlerId],
			})
		},
		[monitor],
	)

	return collected
}
