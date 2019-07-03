export class OptionsReader {
	constructor(private globalContext: any) {}

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
