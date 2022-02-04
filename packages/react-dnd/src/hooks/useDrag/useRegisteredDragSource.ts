import type { DragSourceMonitor } from '../../types'
import { registerSource, SourceConnector } from '../../internals'
import type { DragSourceHookSpec } from '../types'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import { useDragSource } from './useDragSource'
import { useDragDropManager } from '../useDragDropManager'
import { useDragType } from './useDragType'

export function useRegisteredDragSource<O, R, P>(
	spec: DragSourceHookSpec<O, R, P>,
	monitor: DragSourceMonitor<O, R>,
	connector: SourceConnector,
): void {
	const manager = useDragDropManager()
	const handler = useDragSource(spec, monitor, connector)
	const itemType = useDragType(spec)

	useIsomorphicLayoutEffect(
		function registerDragSource() {
			if (itemType != null) {
				const [handlerId, unregister] = registerSource(
					itemType,
					handler,
					manager,
				)
				monitor.receiveHandlerId(handlerId)
				connector.receiveHandlerId(handlerId)
				return unregister
			}
			return
		},
		[manager, monitor, connector, handler, itemType],
	)
}
