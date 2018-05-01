import { Unsubscribe } from 'redux'

export type Usubscribe = () => void
export type Listener = () => void

export interface XYCoord {
	x: number
	y: number
}

export enum HandlerRole {
	SOURCE = 'SOURCE',
	TARGET = 'TARGET',
}

export interface Backend {
	setup(): void
	teardown(): void
	connectDragSource(): Unsubscribe
	connectDragPreview(): Unsubscribe
	connectDropTarget(): Unsubscribe
}

export interface DragDropMonitor {
	subscribeToStateChange(
		listener: Listener,
		options: { handlerIds: string[] | undefined },
	): Unsubscribe

	subscribeToOffsetChange(listener: Listener): Unsubscribe

	canDragSource(sourceId: string): boolean

	canDropOnTarget(targetId: string): boolean

	isDragging(): boolean

	isDraggingSource(sourceId: string): boolean

	isOverTarget(targetId: string, options: { shallow: boolean }): boolean

	getItemType(): string | null

	getItem(): any

	getSourceId(): string | null

	getTargetIds(): string[]

	getDropResult(): any

	didDrop(): boolean

	isSourcePublic(): boolean | null

	getInitialClientOffset(): XYCoord | null

	getInitialSourceClientOffset(): XYCoord | null

	getClientOffset(): XYCoord | null

	getSourceClientOffset(): XYCoord | null

	getDifferenceFromInitialOffset(): XYCoord | null
}

export interface HandlerRegistry {
	addSource(type: string, source: DragSource): string
	addTarget(type: string, target: DropTarget): string
	containsHandler(handler: any): boolean
	getSource(sourceId: string, includePinned?: boolean): DragSource
	getSourceType(sourceId: string): ItemType
	getTargetType(targetId: string): ItemType
	getTarget(targetId: string): DropTarget
	isSourceId(handlerId: string): boolean
	isTargetId(handlerId: string): boolean
	removeSource(sourceId: string): void
	removeTarget(targetId: string): void
	pinSource(sourceId: string): void
	unpinSource(): void
}

export interface Action {
	type: string
}

export type ActionCreator = (args: any[]) => Action

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
	dispatch(action: any): void
}

export type BackendFactory = (dragDropManager: DragDropManager<any>) => Backend

export interface DragSource {
	canDrag(monitor: DragDropMonitor, targetId: string): boolean
	isDragging(monitor: DragDropMonitor, targetId: string): boolean
	beginDrag(monitor: DragDropMonitor, targetId: string): void
	endDrag(monitor: DragDropMonitor, targetId: string): void
}

export interface DropTarget {
	canDrop(monitor: DragDropMonitor, targetId: string): boolean
	hover(monitor: DragDropMonitor, targetId: string): void
	drop(monitor: DragDropMonitor, targetId: string): any
}

export type ItemType = string | symbol
export type TargetType = ItemType | ItemType[]
