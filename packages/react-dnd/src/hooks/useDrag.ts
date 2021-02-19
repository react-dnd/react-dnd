import { useRef, useMemo, MutableRefObject } from 'react'
import { invariant } from '@react-dnd/invariant'
import { DragDropMonitor, DragSource } from 'dnd-core'
import {
	ConnectDragSource,
	ConnectDragPreview,
	DragSourceMonitor,
} from '../types'
import { DragSourceHookSpec, DragObjectWithType } from './types'
import {
	registerSource,
	DragSourceMonitorImpl,
	SourceConnector,
} from '../internals'
import { useMonitorOutput } from './useMonitorOutput'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'
import { useDragDropManager } from './useDragDropManager'

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

function useDragSourceMonitor(): [DragSourceMonitor, SourceConnector] {
	const manager = useDragDropManager()
	const monitor = useMemo(() => new DragSourceMonitorImpl(manager), [manager])
	const connector = useMemo(() => new SourceConnector(manager.getBackend()), [
		manager,
	])
	return [monitor, connector]
}

function useDragHandler<
	DragObject extends DragObjectWithType,
	DropResult,
	CustomProps
>(
	spec: MutableRefObject<
		DragSourceHookSpec<DragObject, DropResult, CustomProps>
	>,
	monitor: DragSourceMonitor,
	connector: any,
) {
	const manager = useDragDropManager()
	const handler = useMemo(() => {
		return {
			beginDrag() {
				const { begin, item } = spec.current
				if (begin) {
					const beginResult = begin(monitor)
					invariant(
						beginResult == null || typeof beginResult === 'object',
						'dragSpec.begin() must either return an object, undefined, or null',
					)
					return beginResult || item || {}
				}
				return item || {}
			},
			canDrag() {
				if (typeof spec.current.canDrag === 'boolean') {
					return spec.current.canDrag
				} else if (typeof spec.current.canDrag === 'function') {
					return spec.current.canDrag(monitor)
				} else {
					return true
				}
			},
			isDragging(globalMonitor: DragDropMonitor, target) {
				const { isDragging } = spec.current
				return isDragging
					? isDragging(monitor)
					: target === globalMonitor.getSourceId()
			},
			endDrag() {
				const { end } = spec.current
				if (end) {
					end(monitor.getItem(), monitor)
				}
				connector.reconnect()
			},
		} as DragSource
	}, [])

	useIsomorphicLayoutEffect(function registerHandler() {
		const [handlerId, unregister] = registerSource(
			spec.current.item.type,
			handler,
			manager,
		)
		monitor.receiveHandlerId(handlerId)
		connector.receiveHandlerId(handlerId)
		return unregister
	}, [])
}
