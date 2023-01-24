export type HTML5BackendContext = Window | undefined
export type DragModifierKey = 'shift' | 'ctrl' | 'alt' | 'meta'

/**
 * Configuration options for the HTML5Backend
 */
export interface HTML5BackendOptions {
	/**
	 * The root DOM node to use for subscribing to events. Default=Window
	 */
	rootElement: Node

	/**
	 * The modifier key to indicate a copy, or a custom callback predicate which should return true if copying. Default='alt'
	 */
	copyKey: DragModifierKey | ((ev: DragEvent) => boolean)
}
