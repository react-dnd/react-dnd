declare var require: any

import {
	Action,
	DragDropManager,
	XYCoord,
	BeginDragPayload,
	BeginDragOptions,
	DragDropMonitor,
	HandlerRegistry,
} from '../../interfaces'
const invariant = require('invariant')
const isObject = require('lodash/isObject')

import { BEGIN_DRAG } from './types'

export default function createBeginDrag<Context>(
	manager: DragDropManager<Context>,
) {
	return function beginDrag(
		sourceIds: string[] = [],
		{
			publishSource = true,
			clientOffset,
			getSourceClientOffset,
		}: BeginDragOptions = {
			publishSource: true,
		},
	): Action<BeginDragPayload> | undefined {
		const monitor = manager.getMonitor()
		const registry = manager.getRegistry()
		verifyInvariants(sourceIds, monitor, registry)

		const sourceId = getDraggableSource(sourceIds, monitor)
		if (sourceId === null) {
			return
		}

		let sourceClientOffset: XYCoord | null = null
		if (clientOffset) {
			verifyGetSourceClientOffsetIsFunction(getSourceClientOffset)
			sourceClientOffset = getSourceClientOffset!(sourceId)
		}

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
	for (const s of sourceIds) {
		invariant(registry.getSource(s), 'Expected sourceIds to be registered.')
	}
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
