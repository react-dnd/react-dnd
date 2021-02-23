import { registerTarget, TargetConnector } from '../../internals'
import { DropTargetMonitor } from '../../types'
import { DragObjectWithType, DropTargetHookSpec } from '../types'
import { useDragDropManager } from '../useDragDropManager'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import { useAccept } from './useAccept'
import { useDropTarget } from './useDropTarget'
import { useDropTargetMonitor } from './useDropTargetMonitor'

export function useRegisteredDropTarget<O extends DragObjectWithType, R, P>(
	spec: DropTargetHookSpec<O, R, P>,
): [DropTargetMonitor, TargetConnector] {
	const manager = useDragDropManager()
	const [monitor, connector] = useDropTargetMonitor(manager)

	const dropTarget = useDropTarget(spec, monitor)

	// Reconnect on accept change
	const accept = useAccept(spec)

	useIsomorphicLayoutEffect(
		function registerHandler() {
			const [handlerId, unregister] = registerTarget(
				accept,
				dropTarget,
				manager,
			)
			monitor.receiveHandlerId(handlerId)
			connector.receiveHandlerId(handlerId)
			return unregister
		},
		[manager, monitor, dropTarget, connector, ...accept],
	)
	return [monitor, connector]
}
