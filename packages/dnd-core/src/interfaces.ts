export interface Backend {
	setup()
	teardown()
	connectDragSource()
	connectDragPreview()
	connectDropTarget()
}

export interface DragDropMonitor {}
export interface HandlerRegistry {}

interface Action {
	type: string
}

export interface DragDropActions {
	beginDrag(sourceIds: string[], options?: any): Action
	publishDragSource(): Action
	hover(targetIds: string[], options?: any): Action
	drop(options: any): Action
	endDrag(): Action
}

export interface DragDropManager<Context> {
	getContext(): Context
	getMonitor(): DragDropMonitor
	getBackend(): Backend
	getRegistry(): HandlerRegistry
	getActions(): DragDropActions
}

export type BackendFactory = (dragDropManager: DragDropManager<any>) => Backend

export interface DragSource {
	canDrag(monitor: DragDropMonitor, targetId: string): boolean
	isDragging(monitor: DragDropMonitor, targetId: string)
	beginDrag(monitor: DragDropMonitor, targetId: string): any
	endDrag(): any
}

export interface DropTarget {
	canDrop(monitor: DragDropMonitor, targetId: string): boolean
	hover(monitor: DragDropMonitor, targetId: string): any
	drop(monitor: DragDropMonitor, targetId: string): any
}

export type ItemType = string | symbol
export type TargetType = ItemType | ItemType[]
