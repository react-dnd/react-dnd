export interface EventName {
	start?: 'mousedown' | 'touchstart'
	move?: 'mousemove' | 'touchmove'
	end?: 'mouseup' | 'touchend'
	contextmenu?: 'contextmenu'
	keydown?: 'keydown'
}

export interface TouchBackendOptions {
	delay?: number
	delayTouchStart?: number
	enableTouchEvents?: boolean
	enableKeyboardEvents?: boolean
	enableMouseEvents?: boolean
	ignoreContextMenu?: boolean
	enableHoverOutsideTarget?: boolean
	delayMouseStart?: number
	touchSlop?: number
	scrollAngleRanges?: AngleRange[]
	getDropTargetElementsAtPoint?: Function
}

export interface AngleRange {
	start: number
	end: number
}

export enum ListenerType {
	mouse = 'mouse',
	touch = 'touch',
	keyboard = 'keyboard',
}
