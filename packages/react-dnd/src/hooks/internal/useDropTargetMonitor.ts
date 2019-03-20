import { useMemo, useRef, useEffect } from 'react'
import { DropTargetHookSpec } from '../../interfaces'
import { DropTarget } from 'dnd-core'
import DropTargetMonitorImpl from '../../DropTargetMonitorImpl'
import registerTarget from '../../registerTarget'
import { useDragDropManager } from './useDragDropManager'
import createTargetConnector from '../../createTargetConnector'

export function useDropTargetMonitor<CustomProps, DragItem, DropResult>(
	targetSpec: DropTargetHookSpec<CustomProps, DragItem, DropResult>,
) {
	const manager = useDragDropManager()

	// Ref out the spec object
	const targetSpecRef = useRef(targetSpec)
	useEffect(
		function updateDropTargetSpec() {
			// console.log(
			// 	'set drop target spec',
			// 	targetSpecRef.current === targetSpec,
			// 	shallowEqual(targetSpecRef.current, targetSpec),
			// 	targetSpecRef.current,
			// 	targetSpec,
			// )
			targetSpecRef.current = targetSpec
		},
		[targetSpec],
	)

	// Create the monitor and connector
	const monitor = useMemo(() => {
		// console.log('create droptarget monitor')
		return new DropTargetMonitorImpl(manager)
	}, [manager])
	const connector = useMemo(() => {
		// console.log('create source connector')
		return createTargetConnector(manager.getBackend())
	}, [manager])

	// Can't use createSourceFactory, as semantics are different
	const handler = useMemo(() => {
		// console.log('create drop target handler')
		return {
			canDrop() {
				const { canDrop } = targetSpecRef.current
				return canDrop ? canDrop(monitor.getItem(), monitor) : true
			},
			hover() {
				const { hover } = targetSpecRef.current
				if (hover) {
					hover(monitor.getItem(), monitor)
				}
			},
			drop() {
				const { drop } = targetSpecRef.current
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
				targetSpec.accept,
				handler,
				manager,
			)
			monitor.receiveHandlerId(handlerId)
			connector.receiveHandlerId(handlerId)
			return unregister
		},
		[monitor, connector],
	)

	return [monitor, connector]
}
