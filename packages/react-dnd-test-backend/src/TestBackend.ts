import noop from 'lodash/noop'
import { IDragDropManager, IDragDropActions, IBackend } from 'dnd-core'

export interface ITestBackend {
	didCallSetup: boolean
	didCallTeardown: boolean
	simulateBeginDrag(sourceIds: string[], options?: any): void
	simulatePublishDragSource(): void
	simulateHover(targetIds: string[], options?: any): void
	simulateDrop(): void
	simulateEndDrag(): void
}

export default class TestBackend implements IBackend, ITestBackend {
	public didCallSetup: boolean = false
	public didCallTeardown: boolean = false
	private actions: IDragDropActions

	constructor(manager: IDragDropManager<any>) {
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

	public simulateBeginDrag(sourceIds: string[], options: any) {
		this.actions.beginDrag(sourceIds, options)
	}

	public simulatePublishDragSource() {
		this.actions.publishDragSource()
	}

	public simulateHover(targetIds: string[], options: any) {
		this.actions.hover(targetIds, options)
	}

	public simulateDrop() {
		this.actions.drop()
	}

	public simulateEndDrag() {
		this.actions.endDrag()
	}
}
