import {
	Action,
	DragDropManager,
	DropPayload,
	DragDropMonitor,
	HandlerRegistry,
} from '../../interfaces'
import { DROP } from './types'

declare var require: any
const invariant = require('invariant')
const isObject = require('lodash/isObject')

export default function createDrop<Context>(manager: DragDropManager<Context>) {
	return function drop(options = {}): void {
		const monitor = manager.getMonitor()
		const registry = manager.getRegistry()
		verifyInvariants(monitor)
		const targetIds = getDroppableTargets(monitor)

		// Multiple actions are dispatched here, which is why this doesn't return an action
		targetIds.forEach((targetId, index) => {
			const dropResult = determineDropResult(targetId, index, registry, monitor)
			const action: Action<DropPayload> = {
				type: DROP,
				payload: {
					dropResult: {
						...options,
						...dropResult,
					},
				},
			}
			manager.dispatch(action)
		})
	}
}

function verifyInvariants(monitor: DragDropMonitor) {
	invariant(monitor.isDragging(), 'Cannot call drop while not dragging.')
	invariant(
		!monitor.didDrop(),
		'Cannot call drop twice during one drag operation.',
	)
}

function determineDropResult(
	targetId: string,
	index: number,
	registry: HandlerRegistry,
	monitor: DragDropMonitor,
) {
	const target = registry.getTarget(targetId)
	let dropResult = target.drop(monitor, targetId)
	verifyDropResultType(dropResult)
	if (typeof dropResult === 'undefined') {
		dropResult = index === 0 ? {} : monitor.getDropResult()
	}
	return dropResult
}

function verifyDropResultType(dropResult: any) {
	invariant(
		typeof dropResult === 'undefined' || isObject(dropResult),
		'Drop result must either be an object or undefined.',
	)
}

function getDroppableTargets(monitor: DragDropMonitor) {
	const targetIds = monitor
		.getTargetIds()
		.filter(monitor.canDropOnTarget, monitor)
	targetIds.reverse()
	return targetIds
}
