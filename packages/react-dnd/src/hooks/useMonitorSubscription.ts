import * as React from 'react'
import { DragDropManager, SourceType, TargetType } from 'dnd-core'
import { DragSourceMonitor, DropTargetMonitor } from '../interfaces'
import { HandlerManager } from './util'

export function useMonitorSubscription<
	Type = SourceType | TargetType,
	Handler = any,
	Monitor = DragSourceMonitor | DropTargetMonitor,
	Manager = DragDropManager<any>
>(
	register: (
		type: any,
		handler: any,
		dragDropManager: any,
	) => { handlerId: any; unregister: () => void },
	type: Type,
	handler: Handler,
	dragDropManager: Manager,
	monitor: Monitor & HandlerManager,
) {
	const unregisterHandler = React.useMemo(() => {
		const { handlerId, unregister } = register(type, handler, dragDropManager)
		monitor.receiveHandlerId(handlerId)
		return unregister
	}, [])

	React.useEffect(() => unregisterHandler, [])
}
