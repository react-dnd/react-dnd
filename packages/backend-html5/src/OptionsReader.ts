import type { HTML5BackendContext, HTML5BackendOptions } from './types.js'

export class OptionsReader {
	public ownerDocument: Document | null = null
	private globalContext: HTML5BackendContext
	private optionsArgs: HTML5BackendOptions | undefined

	public constructor(
		globalContext: HTML5BackendContext,
		options?: HTML5BackendOptions,
	) {
		this.globalContext = globalContext
		this.optionsArgs = options
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

	public get rootElement(): Node | undefined {
		return this.optionsArgs?.rootElement || this.window
	}

	public isCopying(e: DragEvent): boolean {
		if (this.optionsArgs?.copyKey === undefined) {
			return e.altKey
		}
		switch (this.optionsArgs?.copyKey) {
			case 'shift':
				return e.shiftKey
			case 'ctrl':
				return e.ctrlKey
			case 'alt':
				return e.altKey
			case 'meta':
				return e.metaKey
		}
		return this.optionsArgs?.copyKey(e)
	}
}
