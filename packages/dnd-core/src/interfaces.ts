import { Unsubscribe } from 'redux'

export type Unsubscribe = () => void
export type Listener = () => void

export interface IXYCoord {
	x: number
	y: number
}

export enum HandlerRole {
	SOURCE = 'SOURCE',
	TARGET = 'TARGET',
}

export interface IBackend {
	setup(): void
	teardown(): void
	connectDragSource(sourceId: any, node?: any, options?: any): Unsubscribe
	connectDragPreview(sourceId: any, node?: any, options?: any): Unsubscribe
	connectDropTarget(targetId: any, node?: any, options?: any): Unsubscribe
}

export interface IDragDropMonitor {
	subscribeToStateChange(
		listener: Listener,
		options?: { handlerIds: string[] | undefined },
	): Unsubscribe
	subscribeToOffsetChange(listener: Listener): Unsubscribe
	canDragSource(sourceId: string): boolean
	canDropOnTarget(targetId: string): boolean
	isDragging(): boolean
	isDraggingSource(sourceId: string): boolean
	isOverTarget(targetId: string, options?: { shallow: boolean }): boolean
	getItemType(): string | null
	getItem(): any
	getSourceId(): string | null
	getTargetIds(): string[]
	getDropResult(): any
	didDrop(): boolean
	isSourcePublic(): boolean | null
	getInitialClientOffset(): IXYCoord | null
	getInitialSourceClientOffset(): IXYCoord | null
	getClientOffset(): IXYCoord | null
	getSourceClientOffset(): IXYCoord | null
	getDifferenceFromInitialOffset(): IXYCoord | null
}

export interface IHandlerRegistry {
	addSource(type: ItemType, source: IDragSource): string
	addTarget(type: TargetType, target: IDropTarget): string
	containsHandler(handler: IDragSource | IDropTarget): boolean
	getSource(sourceId: string, includePinned?: boolean): IDragSource
	getSourceType(sourceId: string): ItemType
	getTargetType(targetId: string): ItemType
	getTarget(targetId: string): IDropTarget
	isSourceId(handlerId: string): boolean
	isTargetId(handlerId: string): boolean
	removeSource(sourceId: string): void
	removeTarget(targetId: string): void
	pinSource(sourceId: string): void
	unpinSource(): void
}

export interface IAction {
	type: string
}

export type ActionCreator = (args: any[]) => IAction

export interface IDragDropActions {
	beginDrag(sourceIds: string[], options?: any): IAction
	publishDragSource(): IAction
	hover(targetIds: string[], options?: any): IAction
	drop(options?: any): IAction
	endDrag(): IAction
}

export interface IDragDropManager<Context> {
	getContext(): Context
	getMonitor(): IDragDropMonitor
	getBackend(): IBackend
	getRegistry(): IHandlerRegistry
	getActions(): IDragDropActions
	dispatch(action: any): void
}

export type BackendFactory = (
	dragDropManager: IDragDropManager<any>,
) => IBackend

export interface IDragSource {
	canDrag(monitor: IDragDropMonitor, targetId: string): boolean
	isDragging(monitor: IDragDropMonitor, targetId: string): boolean
	beginDrag(monitor: IDragDropMonitor, targetId: string): void
	endDrag(monitor: IDragDropMonitor, targetId: string): void
}

export interface IDropTarget {
	canDrop(monitor: IDragDropMonitor, targetId: string): boolean
	hover(monitor: IDragDropMonitor, targetId: string): void
	drop(monitor: IDragDropMonitor, targetId: string): any
}

export type ItemType = string | symbol
export type TargetType = ItemType | ItemType[]
