import { useMemo, useEffect } from 'react'
import {
	DragDropManager,
	SourceType,
	TargetType,
	DragSource,
	DropTarget,
	Identifier,
} from 'dnd-core'
import { DragSourceMonitor, DropTargetMonitor } from '../interfaces'
import { HandlerManager } from './util'

export function useMonitorSubscription<
	Context,
	Type = SourceType | TargetType,
	Handler = DragSource | DropTarget,
	Monitor = DragSourceMonitor | DropTargetMonitor,
	Manager = DragDropManager<Context>
>(
	register: (
		type: Type,
		handler: Handler,
		dragDropManager: Manager,
	) => { handlerId: Identifier; unregister: () => void },
	type: Type,
	handler: Handler,
	manager: Manager,
	monitor: Monitor & HandlerManager,
) {
	const unregisterHandler = useMemo(() => {
		const { handlerId, unregister } = register(type, handler, manager)
		monitor.receiveHandlerId(handlerId)
		return unregister
	}, [])

	useEffect(() => unregisterHandler, [])
}
