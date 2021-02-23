import { useMemo } from 'react'
import { invariant } from '@react-dnd/invariant'
import { ConnectDragSource, ConnectDragPreview } from '../../types'
import { DragSourceHookSpec, DragObjectWithType } from '../types'
import { useMonitorOutput } from '../useMonitorOutput'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import { useRegisteredDragSource } from './useRegisteredDragSource'

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
	specFn: () => DragSourceHookSpec<DragObject, DropResult, CollectedProps>,
	deps?: unknown[],
): [CollectedProps, ConnectDragSource, ConnectDragPreview] {
	invariant(
		typeof specFn === 'function',
		'useDrag expects a function that returns a spec object',
	)
	const spec = useMemo(specFn, deps || [])
	// TODO: wire options into createSourceConnector
	invariant(spec.item != null, 'item must be defined')
	invariant(spec.item.type != null, 'item type must be defined')

	const [monitor, connector] = useRegisteredDragSource(spec)
	const collected: CollectedProps = useMonitorOutput(
		monitor,
		spec.collect || (() => ({} as CollectedProps)),
		() => connector.reconnect(),
	)

	const connectDragSource = useMemo(() => connector.hooks.dragSource(), [
		connector,
	])
	const connectDragPreview = useMemo(() => connector.hooks.dragPreview(), [
		connector,
	])
	useIsomorphicLayoutEffect(() => {
		connector.dragSourceOptions = spec.options || null
		connector.reconnect()
	}, [connector, spec.options])
	useIsomorphicLayoutEffect(() => {
		connector.dragPreviewOptions = spec.previewOptions || null
		connector.reconnect()
	}, [connector, spec.previewOptions])
	return [collected, connectDragSource, connectDragPreview]
}
