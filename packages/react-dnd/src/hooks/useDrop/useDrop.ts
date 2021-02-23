import { invariant } from '@react-dnd/invariant'
import { ConnectDropTarget } from '../../types'
import {
	DropTargetHookSpec,
	DragObjectWithType,
	FactoryOrInstance,
} from '../types'
import { useRegisteredDropTarget } from './useRegisteredDropTarget'
import { useOptionalFactory } from '../useOptionalFactory'
import { useDropTargetMonitor } from './useDropTargetMonitor'
import { useDropTargetConnector } from './useDropTargetConnector'
import { useCollectedProps } from './useCollectedProps'
import { useConnectDropTarget } from './connectors'

/**
 * useDropTarget Hook
 * @param spec The drop target specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */
export function useDrop<
	DragObject extends DragObjectWithType,
	DropResult,
	CollectedProps
>(
	specArg: FactoryOrInstance<
		DropTargetHookSpec<DragObject, DropResult, CollectedProps>
	>,
	deps?: unknown[],
): [CollectedProps, ConnectDropTarget] {
	const spec = useOptionalFactory(specArg, deps)
	invariant(spec.accept != null, 'accept must be defined')

	const monitor = useDropTargetMonitor()
	const connector = useDropTargetConnector(spec.options)
	useRegisteredDropTarget(spec, monitor, connector)

	return [
		useCollectedProps(spec.collect, monitor, connector),
		useConnectDropTarget(connector),
	]
}
