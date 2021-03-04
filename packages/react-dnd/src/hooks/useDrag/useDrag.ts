import { ConnectDragSource, ConnectDragPreview } from '../../types'
import { DragSourceHookSpec, FactoryOrInstance } from '../types'
import { useRegisteredDragSource } from './useRegisteredDragSource'
import { useOptionalFactory } from '../useOptionalFactory'
import { useDragSourceMonitor } from './useDragSourceMonitor'
import { useDragSourceConnector } from './useDragSourceConnector'
import { useCollectedProps } from '../useCollectedProps'
import { useConnectDragPreview, useConnectDragSource } from './connectors'

/**
 * useDragSource hook
 * @param sourceSpec The drag source specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */
export function useDrag<DragObject, DropResult, CollectedProps>(
	specArg: FactoryOrInstance<
		DragSourceHookSpec<DragObject, DropResult, CollectedProps>
	>,
	deps?: unknown[],
): [CollectedProps, ConnectDragSource, ConnectDragPreview] {
	const spec = useOptionalFactory(specArg, deps)
	const monitor = useDragSourceMonitor()
	const connector = useDragSourceConnector(spec.options, spec.previewOptions)
	useRegisteredDragSource(spec, monitor, connector)

	return [
		useCollectedProps(spec.collect, monitor, connector),
		useConnectDragSource(connector),
		useConnectDragPreview(connector),
	]
}
