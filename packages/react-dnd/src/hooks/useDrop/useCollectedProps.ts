import { TargetConnector } from '../../internals'
import { DropTargetMonitor } from '../../types'
import { useMonitorOutput } from '../useMonitorOutput'

export function useCollectedProps<Collected>(
	collector: ((monitor: DropTargetMonitor) => Collected) | undefined,
	monitor: DropTargetMonitor,
	connector: TargetConnector,
) {
	return useMonitorOutput(monitor, collector || (() => ({} as Collected)), () =>
		connector.reconnect(),
	)
}
