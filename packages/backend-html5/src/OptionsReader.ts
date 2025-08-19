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
		return this.globalContext ?? (typeof window !== 'undefined' ? window : undefined)
	}

	public get document(): Document | undefined {
		return this.globalContext?.document ?? this.window?.document
	}

	public get rootElement(): Node | undefined {
		return this.optionsArgs?.rootElement || this.window
	}

	public isCopying(e: DragEvent): boolean {
		if (this.optionsArgs?.copyKey === undefined) {
			return e.altKey
		}
		switch (this.optionsArgs.copyKey) {
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
