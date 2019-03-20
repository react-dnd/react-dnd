declare var require: any
import { RefObject, useEffect, useMemo } from 'react'
import {
	DragSourceHookSpec,
	DragObjectWithType,
	DragSourceMonitor,
} from '../../interfaces'
import { DragDropMonitor, DragSource } from 'dnd-core'
import registerSource from '../../registerSource'
import { useDragDropManager } from './useDragDropManager'
const invariant = require('invariant')

export function useDragHandler<
	DragObject extends DragObjectWithType,
	DropResult,
	CustomProps
>(
	spec: RefObject<DragSourceHookSpec<DragObject, DropResult, CustomProps>>,
	monitor: DragSourceMonitor,
	connector: any,
) {
	const manager = useDragDropManager()

	// Can't use createSourceFactory, as semantics are different
	const handler = useMemo(() => {
		// console.log('create handler')
		return {
			beginDrag() {
				const { begin, item } = spec.current!
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
				const { canDrag } = spec.current!
				return canDrag ? canDrag(monitor) : true
			},
			isDragging(globalMonitor: DragDropMonitor, target) {
				const { isDragging } = spec.current!
				return isDragging
					? isDragging(monitor)
					: target === globalMonitor.getSourceId()
			},
			endDrag() {
				const { end } = spec.current!
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
			spec.current!.item.type,
			handler,
			manager,
		)
		monitor.receiveHandlerId(handlerId)
		connector.receiveHandlerId(handlerId)
		return unregister
	}, [])
}
