import { invariant } from '@react-dnd/invariant'
import {
	Action,
	DragDropManager,
	XYCoord,
	BeginDragPayload,
	BeginDragOptions,
	DragDropMonitor,
	HandlerRegistry,
} from '../../interfaces'
import { setClientOffset } from './local/setClientOffset'
import { isObject } from '../../utils/js_utils'

import { BEGIN_DRAG, INIT_COORDS } from './types'

const ResetCoordinatesAction = {
	type: INIT_COORDS,
	payload: {
		clientOffset: null,
		sourceClientOffset: null,
	},
}

export default function createBeginDrag(manager: DragDropManager) {
	return function beginDrag(
		sourceIds: string[] = [],
		options: BeginDragOptions = {
			publishSource: true,
		},
	): Action<BeginDragPayload> | undefined {
		const {
			publishSource = true,
			clientOffset,
			getSourceClientOffset,
		}: BeginDragOptions = options
		const monitor = manager.getMonitor()
		const registry = manager.getRegistry()

		// Initialize the coordinates using the client offset
		manager.dispatch(setClientOffset(clientOffset))

		verifyInvariants(sourceIds, monitor, registry)

		// Get the draggable source
		const sourceId = getDraggableSource(sourceIds, monitor)
		if (sourceId === null) {
			manager.dispatch(ResetCoordinatesAction)
			return
		}

		// Get the source client offset
		let sourceClientOffset: XYCoord | null = null
		if (clientOffset) {
			verifyGetSourceClientOffsetIsFunction(getSourceClientOffset)
			sourceClientOffset = getSourceClientOffset!(sourceId)
		}

		// Initialize the full coordinates
		manager.dispatch(setClientOffset(clientOffset, sourceClientOffset))

		const source = registry.getSource(sourceId)
		const item = source.beginDrag(monitor, sourceId)
		verifyItemIsObject(item)
		registry.pinSource(sourceId)

		const itemType = registry.getSourceType(sourceId)
		return {
			type: BEGIN_DRAG,
			payload: {
				itemType,
				item,
				sourceId,
				clientOffset: clientOffset || null,
				sourceClientOffset: sourceClientOffset || null,
				isSourcePublic: !!publishSource,
			},
		}
	}
}

function verifyInvariants(
	sourceIds: string[],
	monitor: DragDropMonitor,
	registry: HandlerRegistry,
) {
	invariant(!monitor.isDragging(), 'Cannot call beginDrag while dragging.')
	sourceIds.forEach(function(sourceId) {
		invariant(
			registry.getSource(sourceId),
			'Expected sourceIds to be registered.',
		)
	})
}

function verifyGetSourceClientOffsetIsFunction(getSourceClientOffset: any) {
	invariant(
		typeof getSourceClientOffset === 'function',
		'When clientOffset is provided, getSourceClientOffset must be a function.',
	)
}

function verifyItemIsObject(item: any) {
	invariant(isObject(item), 'Item must be an object.')
}

function getDraggableSource(sourceIds: string[], monitor: DragDropMonitor) {
	let sourceId = null
	for (let i = sourceIds.length - 1; i >= 0; i--) {
		if (monitor.canDragSource(sourceIds[i])) {
			sourceId = sourceIds[i]
			break
		}
	}
	return sourceId
}
