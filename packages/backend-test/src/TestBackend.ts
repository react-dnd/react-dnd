import type {
	Backend,
	BeginDragOptions,
	DragDropActions,
	DragDropManager,
	HoverOptions,
	Identifier,
	Unsubscribe,
} from 'dnd-core'

import type { ITestBackend, TestBackendContext } from './types.js'

function noop() {
	// noop
}

export class TestBackendImpl implements Backend, ITestBackend {
	public didCallSetup = false
	public didCallTeardown = false
	public manager: DragDropManager
	public context: TestBackendContext
	private actions: DragDropActions

	public constructor(manager: DragDropManager, context: TestBackendContext) {
		this.manager = manager
		this.context = context
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
