import { useEffect, useMemo } from 'react'
import { invariant } from '@react-dnd/invariant'
import { DragDropMonitor, DragSource, Identifier } from 'dnd-core'
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
	Connector,
} from '../internals'
import { useMonitorOutput } from './useMonitorOutput'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'
import { useDragDropManager } from './useDragDropManager'

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

	const [monitor, connector] = useDragSourceMonitor()
	useDragHandler(spec, monitor, connector)

	const result: CollectedProps = useMonitorOutput(
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

function useDragHandler<O extends DragObjectWithType, R, P>(
	spec: DragSourceHookSpec<O, R, P>,
	monitor: DragSourceMonitor,
	connector: any,
) {
	const manager = useDragDropManager()
	const handler = useDragSource(spec, monitor, connector)

	useIsomorphicLayoutEffect(
		function registerHandler() {
			const [handlerId, unregister] = registerSource(
				spec.item.type,
				handler,
				manager,
			)
			monitor.receiveHandlerId(handlerId)
			connector.receiveHandlerId(handlerId)
			return unregister
		},
		[manager, monitor, connector, handler],
	)
}

function useDragSource<O extends DragObjectWithType, R, P>(
	spec: DragSourceHookSpec<O, R, P>,
	monitor: DragSourceMonitor,
	connector: any,
) {
	const handler = useMemo(() => new DragSourceImpl(spec, monitor, connector), [
		monitor,
		connector,
	])
	useEffect(() => {
		handler.spec = spec
	}, [spec])
	return handler
}

class DragSourceImpl<O extends DragObjectWithType, R, P> implements DragSource {
	public constructor(
		public spec: DragSourceHookSpec<O, R, P>,
		private monitor: DragSourceMonitor,
		private connector: Connector,
	) {}

	public beginDrag() {
		const spec = this.spec
		const monitor = this.monitor
		const { begin, item } = spec
		if (begin) {
			const beginResult = begin(monitor)
			invariant(
				beginResult == null || typeof beginResult === 'object',
				'dragSpec.begin() must either return an object, undefined, or null',
			)
			return beginResult || item || {}
		}
		return item || {}
	}

	public canDrag() {
		const spec = this.spec
		const monitor = this.monitor
		if (typeof spec.canDrag === 'boolean') {
			return spec.canDrag
		} else if (typeof spec.canDrag === 'function') {
			return spec.canDrag(monitor)
		} else {
			return true
		}
	}

	public isDragging(globalMonitor: DragDropMonitor, target: Identifier) {
		const spec = this.spec
		const monitor = this.monitor
		const { isDragging } = spec
		return isDragging
			? isDragging(monitor)
			: target === globalMonitor.getSourceId()
	}

	public endDrag() {
		const spec = this.spec
		const monitor = this.monitor
		const connector = this.connector
		const { end } = spec
		if (end) {
			end(monitor.getItem(), monitor)
		}
		connector.reconnect()
	}
}
