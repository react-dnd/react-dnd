import { useRef, useMemo } from 'react'
import { invariant } from '@react-dnd/invariant'
import {
	DragSourceHookSpec,
	DragObjectWithType,
	ConnectDragSource,
	ConnectDragPreview,
} from '../interfaces'
import { useMonitorOutput } from './internal/useMonitorOutput'
import { useIsomorphicLayoutEffect } from './internal/useIsomorphicLayoutEffect'
import { useDragSourceMonitor, useDragHandler } from './internal/drag'

/**
 * useDragSource hook
 * @param sourceSpec The drag source specification *
 */
export function useDrag<
	DragObject extends DragObjectWithType,
	DropResult,
	CollectedProps
>(
	spec: DragSourceHookSpec<DragObject, DropResult, CollectedProps>,
): [CollectedProps, ConnectDragSource, ConnectDragPreview] {
	const specRef = useRef(spec)
	specRef.current = spec

	// TODO: wire options into createSourceConnector
	invariant(spec.item != null, 'item must be defined')
	invariant(spec.item.type != null, 'item type must be defined')

	const [monitor, connector] = useDragSourceMonitor()
	useDragHandler(specRef, monitor, connector)

	const result: CollectedProps = useMonitorOutput(
		monitor,
		specRef.current.collect || (() => ({} as CollectedProps)),
		() => connector.reconnect(),
	)

	const connectDragSource = useMemo(() => connector.hooks.dragSource(), [
		connector,
	])
	const connectDragPreview = useMemo(() => connector.hooks.dragPreview(), [
		connector,
	])
	useIsomorphicLayoutEffect(() => {
		connector.dragSourceOptions = specRef.current.options || null
		connector.reconnect()
	}, [connector])
	useIsomorphicLayoutEffect(() => {
		connector.dragPreviewOptions = specRef.current.previewOptions || null
		connector.reconnect()
	}, [connector])
	return [result, connectDragSource, connectDragPreview]
}
