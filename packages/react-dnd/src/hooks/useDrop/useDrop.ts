import type { ConnectDropTarget } from '../../types/index.js'
import type { DropTargetHookSpec, FactoryOrInstance } from '../types.js'
import { useRegisteredDropTarget } from './useRegisteredDropTarget.js'
import { useOptionalFactory } from '../useOptionalFactory.js'
import { useDropTargetMonitor } from './useDropTargetMonitor.js'
import { useDropTargetConnector } from './useDropTargetConnector.js'
import { useCollectedProps } from '../useCollectedProps.js'
import { useConnectDropTarget } from './connectors.js'

/**
 * useDropTarget Hook
 * @param spec The drop target specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */
export function useDrop<
	DragObject = unknown,
	DropResult = unknown,
	CollectedProps = unknown,
>(
	specArg: FactoryOrInstance<
		DropTargetHookSpec<DragObject, DropResult, CollectedProps>
	>,
	deps?: unknown[],
): [CollectedProps, ConnectDropTarget] {
	const spec = useOptionalFactory(specArg, deps)
	const monitor = useDropTargetMonitor<DragObject, DropResult>()
	const connector = useDropTargetConnector(spec.options)
	useRegisteredDropTarget(spec, monitor, connector)

	return [
		useCollectedProps(spec.collect, monitor, connector),
		useConnectDropTarget(connector),
	]
}
