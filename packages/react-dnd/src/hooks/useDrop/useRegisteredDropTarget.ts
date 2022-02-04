import { registerTarget, TargetConnector } from '../../internals'
import type { DropTargetMonitor } from '../../types'
import type { DropTargetHookSpec } from '../types'
import { useDragDropManager } from '../useDragDropManager'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import { useAccept } from './useAccept'
import { useDropTarget } from './useDropTarget'

export function useRegisteredDropTarget<O, R, P>(
	spec: DropTargetHookSpec<O, R, P>,
	monitor: DropTargetMonitor<O, R>,
	connector: TargetConnector,
): void {
	const manager = useDragDropManager()
	const dropTarget = useDropTarget(spec, monitor)
	const accept = useAccept(spec)

	useIsomorphicLayoutEffect(
		function registerDropTarget() {
			const [handlerId, unregister] = registerTarget(
				accept,
				dropTarget,
				manager,
			)
			monitor.receiveHandlerId(handlerId)
			connector.receiveHandlerId(handlerId)
			return unregister
		},
		[
			manager,
			monitor,
			dropTarget,
			connector,
			accept.map((a) => a.toString()).join('|'),
		],
	)
}
