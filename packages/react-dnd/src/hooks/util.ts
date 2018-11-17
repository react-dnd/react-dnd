import * as React from 'react'
import { DragDropManager, SourceType, TargetType, Identifier } from 'dnd-core'
import { context } from '../DragDropContext'
import { DragSourceMonitor, DropTargetMonitor } from '../interfaces'
const invariant = require('invariant')

export type NoArgs<T> = () => T

export interface HandlerManager {
	receiveHandlerId: (handlerId: Identifier | null) => void
	getHandlerId: () => Identifier | undefined
}

export interface Ref {
	current: any
}

export function isRef(obj: any) {
	if (obj !== null && typeof obj === 'object') {
		const keys = Object.keys(obj)
		return keys.length === 1 && keys[0] === 'current'
	}
	return false
}

export function useDragDropManager(): DragDropManager<any> {
	const { dragDropManager } = React.useContext(context)
	invariant(dragDropManager != null, 'Expected drag drop context')
	return dragDropManager as DragDropManager<any>
}

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
