import { XYCoord } from 'dnd-core'
import { isTouchEvent } from './predicates'

const ELEMENT_NODE = 1

export function getNodeClientOffset(node: any): XYCoord | undefined {
	const el = node.nodeType === ELEMENT_NODE ? node : node.parentElement
	if (!el) {
		return undefined
	}
	const { top, left } = el.getBoundingClientRect()
	return { x: left, y: top }
}

export function getEventClientTouchOffset(
	e: TouchEvent,
	lastTargetTouchFallback?: Touch,
): XYCoord | undefined {
	if (e.targetTouches.length === 1) {
		return getEventClientOffset(e.targetTouches[0])
	} else if (lastTargetTouchFallback && e.touches.length === 1) {
		if (e.touches[0].target === lastTargetTouchFallback.target) {
			return getEventClientOffset(e.touches[0])
		}
	}
}

export function getEventClientOffset(
	e: TouchEvent | Touch | MouseEvent,
	lastTargetTouchFallback?: Touch,
): XYCoord | undefined {
	if (isTouchEvent(e)) {
		return getEventClientTouchOffset(e, lastTargetTouchFallback)
	} else {
		return {
			x: e.clientX,
			y: e.clientY,
		}
	}
}
