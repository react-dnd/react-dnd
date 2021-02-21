import { HTML5BackendContext } from './types'

export class OptionsReader {
	public ownerDocument: Document | null = null
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
		if (this.globalContext?.document) {
			return this.globalContext.document
		} else if (this.window) {
			return this.window.document
		} else {
			return undefined
		}
	}
}
