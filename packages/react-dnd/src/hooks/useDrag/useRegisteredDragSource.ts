import { DragSourceMonitor } from '../../types'
import { registerSource, SourceConnector } from '../../internals'
import { DragObjectWithType, DragSourceHookSpec } from '../types'
import { useDragDropManager } from '../useDragDropManager'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import { useDragSource } from './useDragSource'
import { useDragSourceMonitor } from './useDragSourceMonitor'

export function useRegisteredDragSource<O extends DragObjectWithType, R, P>(
	spec: DragSourceHookSpec<O, R, P>,
): [DragSourceMonitor, SourceConnector] {
	const manager = useDragDropManager()
	const [monitor, connector] = useDragSourceMonitor(manager)
	const handler = useDragSource(spec, monitor, connector)

	useIsomorphicLayoutEffect(
		function registerHandler() {
			const [handlerId, unregister] = registerSource(
				spec.item.type,
				handler,
				manager,
			)
			monitor.receiveHandlerId(handlerId)
			connector.receiveHandlerId(handlerId)
			return unregister
		},
		[manager, monitor, connector, handler],
	)
	return [monitor, connector]
}
