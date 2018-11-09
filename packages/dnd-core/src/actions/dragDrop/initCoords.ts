import {
	Action,
	DragDropManager,
	XYCoord,
	InitCoordsOptions,
	InitCoordsPayload,
	HandlerRegistry,
	DragDropMonitor,
	Identifier,
} from '../../interfaces'
declare var require: any
const invariant = require('invariant')
import { INIT_COORDS } from './types'

export default function createInitCoords<Context>(
	manager: DragDropManager<Context>,
) {
	return function initCoords(
		sourceIds: string[] = [],
		{ clientOffset, getSourceClientOffset }: InitCoordsOptions,
	): Action<InitCoordsPayload> | undefined {
		const monitor = manager.getMonitor()
		const registry = manager.getRegistry()
		verifyInvariants(sourceIds, monitor, registry)
		const sourceId = getDragSourceId(sourceIds, monitor)
		if (sourceId === null) {
			return
		}
		const sourceClientOffset: XYCoord | null = determineSourceClientOffset(
			sourceId,
			clientOffset,
			getSourceClientOffset,
		)
		return {
			type: INIT_COORDS,
			payload: {
				clientOffset: clientOffset || null,
				sourceClientOffset: sourceClientOffset || null,
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
	for (const s of sourceIds) {
		invariant(registry.getSource(s), 'Expected sourceIds to be registered.')
	}
}

function getDragSourceId(sourceIds: string[], monitor: DragDropMonitor) {
	let sourceId = null
	for (let i = sourceIds.length - 1; i >= 0; i--) {
		if (monitor.canDragSource(sourceIds[i])) {
			sourceId = sourceIds[i]
			break
		}
	}
	return sourceId
}

function determineSourceClientOffset(
	sourceId: string,
	clientOffset: XYCoord | undefined,
	getSourceClientOffset: ((sourceId: Identifier) => XYCoord) | undefined,
) {
	let result: XYCoord | null = null
	if (clientOffset) {
		invariant(
			typeof getSourceClientOffset === 'function',
			'When clientOffset is provided, getSourceClientOffset must be a function.',
		)
		result = getSourceClientOffset!(sourceId)
	}
	return result
}
