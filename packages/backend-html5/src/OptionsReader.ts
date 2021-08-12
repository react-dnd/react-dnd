import { HTML5BackendContext, HTML5BackendOptions } from './types'

export class OptionsReader {
	public ownerDocument: Document | null = null
	private globalContext: HTML5BackendContext
	private optionsArgs: Partial<HTML5BackendOptions>

	public constructor(
		globalContext: HTML5BackendContext,
		options: Partial<HTML5BackendOptions> = {},
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
		return this.optionsArgs?.rootElement ?? this.window
	}

	public get isNativeItemDefaultPrevented(): boolean {
		return this.optionsArgs.isNativeItemDefaultPrevented ?? true
	}
}
