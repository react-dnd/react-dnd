import { DragSourceMonitor } from '../../types'
import { registerSource, SourceConnector } from '../../internals'
import { DragSourceHookSpec } from '../types'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import { useDragSource } from './useDragSource'
import { useDragDropManager } from '../useDragDropManager'
import { invariant } from '@react-dnd/invariant'

export function useRegisteredDragSource<O, P>(
	spec: DragSourceHookSpec<O, P>,
	monitor: DragSourceMonitor,
	connector: SourceConnector,
): void {
	const manager = useDragDropManager()
	const handler = useDragSource(spec, monitor, connector)
	const itemType = spec.type
	invariant(itemType != null, 'spec.type must be defined')

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
		},
		[manager, monitor, connector, handler, itemType],
	)
}
