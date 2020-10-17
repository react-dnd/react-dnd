import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'
import { useCollector } from './useCollector'
import { HandlerManager, MonitorEventEmitter } from '../../interfaces'

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
				return undefined
			}
			return monitor.subscribeToStateChange(updateCollected, {
				handlerIds: [handlerId],
			})
		},
		[monitor, updateCollected],
	)

	return collected
}
