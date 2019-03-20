declare var require: any
import { useMemo, useEffect, useRef } from 'react'
import { DragSource } from 'dnd-core'
import { DragSourceHookSpec, DragObjectWithType } from '../../interfaces'
import DragSourceMonitorImpl from '../../DragSourceMonitorImpl'
import registerSource from '../../registerSource'
import { useDragDropManager } from './useDragDropManager'
import createSourceConnector from '../../createSourceConnector'
const invariant = require('invariant')

export function useDragSourceMonitor<
	DragObject extends DragObjectWithType,
	DropResult,
	CustomProps
>(sourceSpec: DragSourceHookSpec<DragObject, DropResult, CustomProps>) {
	const manager = useDragDropManager()

	// Ref out the spec object
	const sourceSpecRef = useRef(sourceSpec)
	useEffect(() => {
		// console.log('set drag source spec')
		sourceSpecRef.current = sourceSpec
	}, [sourceSpec])

	// Create the monitor and connector
	const monitor = useMemo(() => {
		// console.log('create monitor')
		return new DragSourceMonitorImpl(manager)
	}, [])
	const connector = useMemo(() => {
		// console.log('create connector')
		return createSourceConnector(manager.getBackend())
	}, [])

	// Can't use createSourceFactory, as semantics are different
	const handler = useMemo(() => {
		// console.log('create handler')
		return {
			beginDrag() {
				const { begin, item } = sourceSpecRef.current
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
				const { canDrag } = sourceSpecRef.current
				return canDrag ? canDrag(monitor) : true
			},
			isDragging(globalMonitor, target) {
				const { isDragging } = sourceSpecRef.current
				return isDragging
					? isDragging(monitor)
					: target === globalMonitor.getSourceId()
			},
			endDrag() {
				const { end } = sourceSpecRef.current
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
			sourceSpec.item.type,
			handler,
			manager,
		)
		monitor.receiveHandlerId(handlerId)
		connector.receiveHandlerId(handlerId)
		return unregister
	}, [])

	return [monitor, connector]
}
