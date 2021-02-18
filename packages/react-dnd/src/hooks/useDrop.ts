import { useRef, useMemo, MutableRefObject } from 'react'
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
 * @param spec The drop target specification
 */
export function useDrop<
	DragObject extends DragObjectWithType,
	DropResult,
	CollectedProps
>(
	spec: DropTargetHookSpec<DragObject, DropResult, CollectedProps>,
): [CollectedProps, ConnectDropTarget] {
	const specRef = useRef(spec)
	specRef.current = spec
	invariant(spec.accept != null, 'accept must be defined')

	const [monitor, connector] = useDropTargetMonitor()
	useDropHandler(specRef, monitor, connector)

	const result: CollectedProps = useMonitorOutput(
		monitor,
		specRef.current.collect || (() => ({} as CollectedProps)),
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

function useDropHandler<
	DragObject extends DragObjectWithType,
	DropResult,
	CustomProps
>(
	spec: MutableRefObject<
		DropTargetHookSpec<DragObject, DropResult, CustomProps>
	>,
	monitor: DropTargetMonitor,
	connector: any,
) {
	const manager = useDragDropManager()
	const handler = useMemo(() => {
		return {
			canDrop() {
				const { canDrop } = spec.current
				return canDrop ? canDrop(monitor.getItem(), monitor) : true
			},
			hover() {
				const { hover } = spec.current
				if (hover) {
					hover(monitor.getItem(), monitor)
				}
			},
			drop() {
				const { drop } = spec.current
				if (drop) {
					return drop(monitor.getItem(), monitor)
				}
			},
		} as DropTarget
	}, [monitor])

	useIsomorphicLayoutEffect(
		function registerHandler() {
			const [handlerId, unregister] = registerTarget(
				spec.current.accept,
				handler,
				manager,
			)
			monitor.receiveHandlerId(handlerId)
			connector.receiveHandlerId(handlerId)
			return unregister
		},
		[monitor, connector, spec.current.accept],
	)
}
