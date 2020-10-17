import { HTML5BackendContext } from './types'

export class OptionsReader {
	private globalContext: HTML5BackendContext

	public constructor(globalContext: HTML5BackendContext) {
		this.globalContext = globalContext
	}

	public get window(): Window | undefined {
		if (this.globalContext) {
			return this.globalContext
		} else if (typeof window !== 'undefined') {
			return window
		}
		return undefined
	}

	public get document(): Document | undefined {
		if (this.window) {
			return this.window.document
		}
		return undefined
	}
}
