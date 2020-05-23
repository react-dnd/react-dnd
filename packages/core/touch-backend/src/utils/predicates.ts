// Used for MouseEvent.buttons (note the s on the end).
const MouseButtons = {
	Left: 1,
	Right: 2,
	Center: 4,
}

// Used for e.button (note the lack of an s on the end).
const MouseButton = {
	Left: 0,
	Center: 1,
	Right: 2,
}

/**
 * Only touch events and mouse events where the left button is pressed should initiate a drag.
 * @param {MouseEvent | TouchEvent} e The event
 */
export function eventShouldStartDrag(e: MouseEvent): boolean {
	// For touch events, button will be undefined. If e.button is defined,
	// then it should be MouseButton.Left.
	return e.button === undefined || e.button === MouseButton.Left
}

/**
 * Only touch events and mouse events where the left mouse button is no longer held should end a drag.
 * It's possible the user mouse downs with the left mouse button, then mouse down and ups with the right mouse button.
 * We don't want releasing the right mouse button to end the drag.
 * @param {MouseEvent | TouchEvent} e The event
 */
export function eventShouldEndDrag(e: MouseEvent): boolean {
	// Touch events will have buttons be undefined, while mouse events will have e.buttons's left button
	// bit field unset if the left mouse button has been released
	return e.buttons === undefined || (e.buttons & MouseButtons.Left) === 0
}

export function isTouchEvent(
	e: Touch | TouchEvent | MouseEvent,
): e is TouchEvent {
	return !!(e as TouchEvent).targetTouches
}
