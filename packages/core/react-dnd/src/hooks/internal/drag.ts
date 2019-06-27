import { useEffect, useMemo, MutableRefObject } from 'react'
import invariant from 'invariant'
import {
	DragSourceHookSpec,
	DragObjectWithType,
	DragSourceMonitor,
} from '../../interfaces'
import { DragDropMonitor, DragSource } from 'dnd-core'
import { registerSource } from '../../common/registration'
import { useDragDropManager } from './useDragDropManager'
import { DragSourceMonitorImpl } from '../../common/DragSourceMonitorImpl'
import { SourceConnector } from '../../common/SourceConnector'

export function useDragSourceMonitor(): [DragSourceMonitor, SourceConnector] {
	const manager = useDragDropManager()
	const monitor = useMemo(() => new DragSourceMonitorImpl(manager), [manager])
	const connector = useMemo(() => new SourceConnector(manager.getBackend()), [
		manager,
	])
	return [monitor, connector]
}

export function useDragHandler<
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

	useEffect(function registerHandler() {
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
