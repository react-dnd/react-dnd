import * as React from 'react'
import { TargetType } from 'dnd-core'
import registerTarget from '../registerTarget'
import createTargetMonitor from '../createTargetMonitor'
import { DropTargetMonitor, DropTargetSpec } from '../interfaces'
import {
	Ref,
	NoArgs,
	HandlerManager,
	useDragDropManager,
	useMonitorSubscription,
} from './util'

function useDropTargetHandler(targetSpec: DropTargetSpec<void>) {
	const targetSpecRef = React.useRef(targetSpec)

	React.useEffect(() => {
		targetSpecRef.current = targetSpec
	})

	// Can't use createSourceFactory, as semantics are different
	const handler = React.useMemo(
		() => ({
			canDrop() {
				const { canDrop } = targetSpecRef.current
				return canDrop != null ? (canDrop as NoArgs<any>)() : true
			},
			hover() {
				const { hover } = targetSpecRef.current
				if (hover != null) {
					;(hover as NoArgs<void>)()
				}
			},
			drop() {
				const { drop } = targetSpecRef.current
				if (drop != null) {
					;(drop as NoArgs<void>)()
				}
			},
		}),
		[],
	)

	return handler
}

export function useDropTarget(
	ref: Ref,
	type: TargetType,
	targetSpec: DropTargetSpec<void> & {
		dropTargetOptions?: {}
	},
): DropTargetMonitor & HandlerManager {
	const dragDropManager = useDragDropManager()
	const backend = dragDropManager.getBackend()
	const targetMonitor = React.useMemo(
		() => createTargetMonitor(dragDropManager),
		[dragDropManager],
	) as DropTargetMonitor & HandlerManager

	const handler = useDropTargetHandler(targetSpec)

	useMonitorSubscription(
		registerTarget,
		type,
		handler,
		dragDropManager,
		targetMonitor,
	)

	React.useEffect(() => {
		const dropTargetNode = ref.current
		const dropTargetOptions = targetSpec.dropTargetOptions

		const disconnectDropTarget = backend.connectDropTarget(
			targetMonitor.getHandlerId(),
			dropTargetNode,
			dropTargetOptions,
		)

		return disconnectDropTarget
	}, [])

	return targetMonitor
}
