import {
	DragObjectWithType,
	DropTargetMonitor,
	DropTargetHookSpec,
} from '../../interfaces'
import { useEffect, useMemo, MutableRefObject } from 'react'
import { DropTarget } from 'dnd-core'
import { registerTarget } from '../../common/registration'
import { useDragDropManager } from './useDragDropManager'
import { TargetConnector } from '../../common/TargetConnector'
import { DropTargetMonitorImpl } from '../../common/DropTargetMonitorImpl'

export function useDropTargetMonitor(): [DropTargetMonitor, TargetConnector] {
	const manager = useDragDropManager()
	const monitor = useMemo(() => new DropTargetMonitorImpl(manager), [manager])
	const connector = useMemo(() => new TargetConnector(manager.getBackend()), [
		manager,
	])
	return [monitor, connector]
}

export function useDropHandler<
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

	useEffect(
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
		[monitor, connector],
	)
}
