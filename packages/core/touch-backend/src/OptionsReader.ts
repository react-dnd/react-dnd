import { TouchBackendOptions } from './interfaces'

export class OptionsReader implements TouchBackendOptions {
	constructor(incoming: TouchBackendOptions) {
		const delayTouchStart = incoming.delayTouchStart || incoming.delay || 0
		const delayMouseStart = incoming.delayMouseStart || incoming.delay || 0

		const options: TouchBackendOptions = {
			enableTouchEvents: true,
			enableMouseEvents: false,
			enableKeyboardEvents: false,
			ignoreContextMenu: false,
			enableHoverOutsideTarget: false,
			touchSlop: 0,
			scrollAngleRanges: undefined,
			...incoming,
			delayTouchStart,
			delayMouseStart,
		}

		Object.keys(options).forEach(key => {
			Object.defineProperty(this, key, {
				enumerable: true,
				get: () => (options as any)[key],
				set: value => ((options as any)[key] = value),
			})
		})
	}
}
