import { DragSourceMonitor } from '../../types'
import { registerSource, SourceConnector } from '../../internals'
import { DragObjectWithType, DragSourceHookSpec } from '../types'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import { useDragSource } from './useDragSource'
import { useDragDropManager } from '../useDragDropManager'

export function useRegisteredDragSource<O extends DragObjectWithType, R, P>(
	spec: DragSourceHookSpec<O, R, P>,
	monitor: DragSourceMonitor,
	connector: SourceConnector,
): void {
	const manager = useDragDropManager()
	const handler = useDragSource(spec, monitor, connector)
	const itemType = spec.item.type

	useIsomorphicLayoutEffect(
		function registerDragSource() {
			const [handlerId, unregister] = registerSource(itemType, handler, manager)
			monitor.receiveHandlerId(handlerId)
			connector.receiveHandlerId(handlerId)
			return unregister
		},
		[manager, monitor, connector, handler, itemType],
	)
}
