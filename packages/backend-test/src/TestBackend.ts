import {
	DragDropManager,
	DragDropActions,
	Backend,
	BeginDragOptions,
	HoverOptions,
	Identifier,
	Unsubscribe,
} from 'dnd-core'

function noop() {
	// noop
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

export class TestBackendImpl implements Backend, ITestBackend {
	public didCallSetup = false
	public didCallTeardown = false
	public manager: DragDropManager
	private actions: DragDropActions

	public constructor(manager: DragDropManager) {
		this.manager = manager
		this.actions = manager.getActions()
	}

	public profile(): Record<string, number> {
		return {}
	}

	public setup(): void {
		this.didCallSetup = true
	}

	public teardown(): void {
		this.didCallTeardown = true
	}

	public connectDragSource(): Unsubscribe {
		return noop
	}

	public connectDragPreview(): Unsubscribe {
		return noop
	}

	public connectDropTarget(): Unsubscribe {
		return noop
	}

	public simulateBeginDrag(
		sourceIds: Identifier[],
		options: BeginDragOptions,
	): void {
		this.actions.beginDrag(sourceIds, options)
	}

	public simulatePublishDragSource(): void {
		this.actions.publishDragSource()
	}

	public simulateHover(targetIds: Identifier[], options: HoverOptions): void {
		this.actions.hover(targetIds, options)
	}

	public simulateDrop(): void {
		this.actions.drop()
	}

	public simulateEndDrag(): void {
		this.actions.endDrag()
	}
}
