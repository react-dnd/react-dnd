import type { HandlerManager, MonitorEventEmitter } from '../types'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'
import { useCollector } from './useCollector'

export function useMonitorOutput<Monitor extends HandlerManager, Collected>(
	monitor: Monitor & MonitorEventEmitter,
	collect: (monitor: Monitor) => Collected,
	onCollect?: () => void,
): Collected {
	const [collected, updateCollected] = useCollector(monitor, collect, onCollect)

	useIsomorphicLayoutEffect(
		function subscribeToMonitorStateChange() {
			const handlerId = monitor.getHandlerId()
			if (handlerId == null) {
				return
			}
			return monitor.subscribeToStateChange(updateCollected, {
				handlerIds: [handlerId],
			})
		},
		[monitor, updateCollected],
	)

	return collected
}
