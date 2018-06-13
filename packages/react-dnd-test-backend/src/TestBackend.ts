import {
	DragDropManager,
	DragDropActions,
	Backend,
	BeginDragOptions,
	HoverOptions,
} from 'dnd-core'
const noop = require('lodash/noop')

export interface TestBackend {
	didCallSetup: boolean
	didCallTeardown: boolean
	simulateBeginDrag(sourceIds: string[], options?: any): void
	simulatePublishDragSource(): void
	simulateHover(targetIds: string[], options?: any): void
	simulateDrop(): void
	simulateEndDrag(): void
}

export default class TestBackendImpl implements Backend, TestBackend {
	public didCallSetup: boolean = false
	public didCallTeardown: boolean = false
	private actions: DragDropActions

	constructor(manager: DragDropManager<{}>) {
		this.actions = manager.getActions()
	}

	public setup() {
		this.didCallSetup = true
	}

	public teardown() {
		this.didCallTeardown = true
	}

	public connectDragSource() {
		return noop
	}

	public connectDragPreview() {
		return noop
	}

	public connectDropTarget() {
		return noop
	}

	public simulateBeginDrag(sourceIds: string[], options: BeginDragOptions) {
		this.actions.beginDrag(sourceIds, options)
	}

	public simulatePublishDragSource() {
		this.actions.publishDragSource()
	}

	public simulateHover(targetIds: string[], options: HoverOptions) {
		this.actions.hover(targetIds, options)
	}

	public simulateDrop() {
		this.actions.drop()
	}

	public simulateEndDrag() {
		this.actions.endDrag()
	}
}
