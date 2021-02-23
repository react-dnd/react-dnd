import { invariant } from '@react-dnd/invariant'
import { ConnectDragSource, ConnectDragPreview } from '../../types'
import {
	DragSourceHookSpec,
	DragObjectWithType,
	FactoryOrInstance,
} from '../types'
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
export function useDrag<
	DragObject extends DragObjectWithType,
	DropResult,
	CollectedProps
>(
	specArg: FactoryOrInstance<
		DragSourceHookSpec<DragObject, DropResult, CollectedProps>
	>,
	deps?: unknown[],
): [CollectedProps, ConnectDragSource, ConnectDragPreview] {
	const spec = useOptionalFactory(specArg, deps)
	invariant(spec.item != null, 'item must be defined')
	invariant(spec.item.type != null, 'item type must be defined')

	const monitor = useDragSourceMonitor()
	const connector = useDragSourceConnector(spec.options, spec.previewOptions)
	useRegisteredDragSource(spec, monitor, connector)

	return [
		useCollectedProps(spec.collect, monitor, connector),
		useConnectDragSource(connector),
		useConnectDragPreview(connector),
	]
}
