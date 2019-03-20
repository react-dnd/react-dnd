declare var require: any
import { useEffect, useMemo } from 'react'
import {
	DragSourceHookSpec,
	DragObjectWithType,
	DragSourceMonitor,
} from '../../interfaces'
import { DragDropMonitor, DragSource } from 'dnd-core'
import registerSource from '../../registerSource'
import { useDragDropManager } from './useDragDropManager'
import DragSourceMonitorImpl from '../../DragSourceMonitorImpl'
import SourceConnector from '../../SourceConnector'
const invariant = require('invariant')

export function useDragSourceMonitor(): [DragSourceMonitor, any] {
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
	spec: DragSourceHookSpec<DragObject, DropResult, CustomProps>,
	monitor: DragSourceMonitor,
	connector: any,
) {
	const manager = useDragDropManager()

	// Can't use createSourceFactory, as semantics are different
	const handler = useMemo(() => {
		// console.log('create handler')
		return {
			beginDrag() {
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
			},
			canDrag() {
				const { canDrag } = spec
				return canDrag ? canDrag(monitor) : true
			},
			isDragging(globalMonitor: DragDropMonitor, target) {
				const { isDragging } = spec
				return isDragging
					? isDragging(monitor)
					: target === globalMonitor.getSourceId()
			},
			endDrag() {
				const { end } = spec
				if (end) {
					end(monitor.getItem(), monitor)
				}
				connector.reconnect()
			},
		} as DragSource
	}, [])

	useEffect(function registerHandler() {
		// console.log('Register Handler')
		const [handlerId, unregister] = registerSource(
			spec.item.type,
			handler,
			manager,
		)
		monitor.receiveHandlerId(handlerId)
		connector.receiveHandlerId(handlerId)
		return unregister
	}, [])
}
