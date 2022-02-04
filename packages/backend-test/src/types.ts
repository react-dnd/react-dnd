import type { Backend, Identifier } from 'dnd-core'

export interface TestBackendContext {
	window?: Window
	document?: Document
}

export interface TestBackendOptions {
	onCreate?: (be: ITestBackend) => void
}

export interface ITestBackend extends Backend {
	didCallSetup: boolean
	didCallTeardown: boolean
	simulateBeginDrag(sourceIds: Identifier[], options?: any): void
	simulatePublishDragSource(): void
	simulateHover(targetIds: Identifier[], options?: any): void
	simulateDrop(): void
	simulateEndDrag(): void
}
