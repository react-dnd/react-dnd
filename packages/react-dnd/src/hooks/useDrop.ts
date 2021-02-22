import { useEffect, useMemo } from 'react'
import { invariant } from '@react-dnd/invariant'
import { DropTarget } from 'dnd-core'
import { ConnectDropTarget, DropTargetMonitor } from '../types'
import { useMonitorOutput } from './useMonitorOutput'
import { DropTargetHookSpec, DragObjectWithType } from './types'
import {
	registerTarget,
	DropTargetMonitorImpl,
	TargetConnector,
} from '../internals'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'
import { useDragDropManager } from './useDragDropManager'

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
	specFn: () => DropTargetHookSpec<DragObject, DropResult, CollectedProps>,
	deps?: unknown[],
): [CollectedProps, ConnectDropTarget] {
	invariant(
		typeof specFn === 'function',
		'useDrop expects a function that returns a spec object',
	)
	const spec = useMemo(specFn, deps || [])
	invariant(spec.accept != null, 'accept must be defined')

	const [monitor, connector] = useDropTargetMonitor()
	useDropHandler(spec, monitor, connector)

	const result: CollectedProps = useMonitorOutput(
		monitor,
		spec.collect || (() => ({} as CollectedProps)),
		() => connector.reconnect(),
	)

	const connectDropTarget = useMemo(() => connector.hooks.dropTarget(), [
		connector,
	])

	useIsomorphicLayoutEffect(() => {
		connector.dropTargetOptions = spec.options || null
		connector.reconnect()
	}, [spec.options])
	return [result, connectDropTarget]
}

function useDropTargetMonitor(): [DropTargetMonitor, TargetConnector] {
	const manager = useDragDropManager()
	const monitor = useMemo(() => new DropTargetMonitorImpl(manager), [manager])
	const connector = useMemo(() => new TargetConnector(manager.getBackend()), [
		manager,
	])
	return [monitor, connector]
}

function useDropHandler<O extends DragObjectWithType, R, P>(
	spec: DropTargetHookSpec<O, R, P>,
	monitor: DropTargetMonitor,
	connector: any,
) {
	const manager = useDragDropManager()
	const dropTarget = useDropTarget(spec, monitor)

	// Reconnect on accept change
	const accept = useAccept(spec)

	useIsomorphicLayoutEffect(
		function registerHandler() {
			const [handlerId, unregister] = registerTarget(
				accept,
				dropTarget,
				manager,
			)
			monitor.receiveHandlerId(handlerId)
			connector.receiveHandlerId(handlerId)
			return unregister
		},
		[manager, monitor, dropTarget, connector, ...accept],
	)
}

function useAccept<O extends DragObjectWithType, R, P>(
	spec: DropTargetHookSpec<O, R, P>,
) {
	const specAccept = spec.accept
	return useMemo(
		() => (Array.isArray(specAccept) ? specAccept : [specAccept]),
		[specAccept],
	)
}

function useDropTarget<O extends DragObjectWithType, R, P>(
	spec: DropTargetHookSpec<O, R, P>,
	monitor: DropTargetMonitor,
) {
	const dropTarget = useMemo(() => new DropTargetImpl(spec, monitor), [monitor])
	useEffect(() => {
		dropTarget.spec = spec
	}, [spec])
	return dropTarget
}

class DropTargetImpl<O extends DragObjectWithType, R, P> implements DropTarget {
	public constructor(
		public spec: DropTargetHookSpec<O, R, P>,
		private monitor: DropTargetMonitor,
	) {}

	public canDrop() {
		const spec = this.spec
		const monitor = this.monitor
		return spec.canDrop ? spec.canDrop(monitor.getItem(), monitor) : true
	}
	public hover() {
		const spec = this.spec
		const monitor = this.monitor
		if (spec.hover) {
			spec.hover(monitor.getItem(), monitor)
		}
	}

	public drop() {
		const spec = this.spec
		const monitor = this.monitor
		if (spec.drop) {
			return spec.drop(monitor.getItem(), monitor)
		}
	}
}
