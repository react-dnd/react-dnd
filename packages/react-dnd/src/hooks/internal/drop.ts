import {
	DragObjectWithType,
	DropTargetMonitor,
	DropTargetHookSpec,
} from '../../interfaces'
import { RefObject, useEffect, useMemo } from 'react'
import { DropTarget } from 'dnd-core'
import registerTarget from '../../registerTarget'
import { useDragDropManager } from './useDragDropManager'
import createTargetConnector from '../../createTargetConnector'
import DropTargetMonitorImpl from '../../DropTargetMonitorImpl'

export function useDropTargetMonitor(): [DropTargetMonitor, any] {
	const manager = useDragDropManager()
	const monitor = useMemo(() => new DropTargetMonitorImpl(manager), [manager])
	const connector = useMemo(() => createTargetConnector(manager.getBackend()), [
		manager,
	])
	return [monitor, connector]
}

export function useDropHandler<
	DragObject extends DragObjectWithType,
	DropResult,
	CustomProps
>(
	spec: RefObject<DropTargetHookSpec<DragObject, DropResult, CustomProps>>,
	monitor: DropTargetMonitor,
	connector: any,
) {
	const manager = useDragDropManager()

	// Can't use createSourceFactory, as semantics are different
	const handler = useMemo(() => {
		// console.log('create drop target handler')
		return {
			canDrop() {
				const { canDrop } = spec.current!
				return canDrop ? canDrop(monitor.getItem(), monitor) : true
			},
			hover() {
				const { hover } = spec.current!
				if (hover) {
					hover(monitor.getItem(), monitor)
				}
			},
			drop() {
				const { drop } = spec.current!
				if (drop) {
					return drop(monitor.getItem(), monitor)
				}
			},
		} as DropTarget
	}, [monitor])

	useEffect(
		function registerHandler() {
			// console.log('register droptarget handler')
			const [handlerId, unregister] = registerTarget(
				spec.current!.accept,
				handler,
				manager,
			)
			monitor.receiveHandlerId(handlerId)
			connector.receiveHandlerId(handlerId)
			return unregister
		},
		[monitor, connector],
	)
}
