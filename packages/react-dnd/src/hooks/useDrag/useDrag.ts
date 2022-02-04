import type { ConnectDragSource, ConnectDragPreview } from '../../types'
import type { DragSourceHookSpec, FactoryOrInstance } from '../types'
import { useRegisteredDragSource } from './useRegisteredDragSource'
import { useOptionalFactory } from '../useOptionalFactory'
import { useDragSourceMonitor } from './useDragSourceMonitor'
import { useDragSourceConnector } from './useDragSourceConnector'
import { useCollectedProps } from '../useCollectedProps'
import { useConnectDragPreview, useConnectDragSource } from './connectors'
import { invariant } from '@react-dnd/invariant'

/**
 * useDragSource hook
 * @param sourceSpec The drag source specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */
export function useDrag<
	DragObject = unknown,
	DropResult = unknown,
	CollectedProps = unknown,
>(
	specArg: FactoryOrInstance<
		DragSourceHookSpec<DragObject, DropResult, CollectedProps>
	>,
	deps?: unknown[],
): [CollectedProps, ConnectDragSource, ConnectDragPreview] {
	const spec = useOptionalFactory(specArg, deps)
	invariant(
		!(spec as any).begin,
		`useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)`,
	)

	const monitor = useDragSourceMonitor<DragObject, DropResult>()
	const connector = useDragSourceConnector(spec.options, spec.previewOptions)
	useRegisteredDragSource(spec, monitor, connector)

	return [
		useCollectedProps(spec.collect, monitor, connector),
		useConnectDragSource(connector),
		useConnectDragPreview(connector),
	]
}
