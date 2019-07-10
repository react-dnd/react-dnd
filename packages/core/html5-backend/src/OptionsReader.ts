export class OptionsReader {
	private globalContext: any

	public constructor(globalContext: any) {
		this.globalContext = globalContext
	}

	public get window() {
		if (this.globalContext) {
			return this.globalContext
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
