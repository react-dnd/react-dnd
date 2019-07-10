import { TouchBackendOptions, AngleRange } from './interfaces'

export class OptionsReader implements TouchBackendOptions {
	public enableTouchEvents = true
	public enableMouseEvents = false
	public enableKeyboardEvents = false
	public ignoreContextMenu = false
	public enableHoverOutsideTarget = false
	public touchSlop = 0
	public scrollAngleRanges: AngleRange[] | undefined = undefined
	public delayTouchStart: number
	public delayMouseStart: number
	public getDropTargetElementsAtPoint?: Function
	private context: any

	public constructor(incoming: TouchBackendOptions, context?: any) {
		this.context = context
		this.delayTouchStart = incoming.delayTouchStart || incoming.delay || 0
		this.delayMouseStart = incoming.delayMouseStart || incoming.delay || 0

		Object.keys(incoming).forEach(key => {
			if ((incoming as any)[key] != null) {
				;(this as any)[key] = (incoming as any)[key]
			}
		})
	}

	public get window() {
		if (this.context && this.context.window) {
			return this.context.window
		} else if (typeof window !== 'undefined') {
			return window
		}
		return undefined
	}

	public get document() {
		if (this.window) {
			return this.window.document
		}
		return undefined
	}
}
