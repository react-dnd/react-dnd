import { SourceConnector } from '../../internals'
import { DragSourceMonitor } from '../../types'
import { useMonitorOutput } from '../useMonitorOutput'

export function useCollectedProps<Collected>(
	collector: ((monitor: DragSourceMonitor) => Collected) | undefined,
	monitor: DragSourceMonitor,
	connector: SourceConnector,
) {
	return useMonitorOutput(monitor, collector || (() => ({} as Collected)), () =>
		connector.reconnect(),
	)
}
