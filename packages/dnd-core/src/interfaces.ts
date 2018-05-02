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
		options?: {
			handlerIds: string[] | undefined
		},
	): Unsubscribe
	subscribeToOffsetChange(listener: Listener): Unsubscribe
	canDragSource(sourceId: string): boolean
	canDropOnTarget(targetId: string): boolean

	/**
	 * Returns true if a drag operation is in progress, and either the owner initiated the drag, or its isDragging()
	 * is defined and returns true.
	 */
	isDragging(): boolean
	isDraggingSource(sourceId: string): boolean
	isOverTarget(
		targetId: string,
		options?: {
			shallow?: boolean
		},
	): boolean

	/**
	 * Returns a string or an ES6 symbol identifying the type of the current dragged item. Returns null if no item is being dragged.
	 */
	getItemType(): ItemType | null

	/**
	 * Returns a plain object representing the currently dragged item. Every drag source must specify it by returning an object
	 * from its beginDrag() method. Returns null if no item is being dragged.
	 */
	getItem(): any
	getSourceId(): string | null
	getTargetIds(): string[]
	/**
	 * Returns a plain object representing the last recorded drop result. The drop targets may optionally specify it by returning an
	 * object from their drop() methods. When a chain of drop() is dispatched for the nested targets, bottom up, any parent that
	 * explicitly returns its own result from drop() overrides the child drop result previously set by the child. Returns null if
	 * called outside endDrag().
	 */
	getDropResult(): any
	/**
	 * Returns true if some drop target has handled the drop event, false otherwise. Even if a target did not return a drop result,
	 * didDrop() returns true. Use it inside endDrag() to test whether any drop target has handled the drop. Returns false if called
	 * outside endDrag().
	 */
	didDrop(): boolean
	isSourcePublic(): boolean | null
	/**
	 * Returns the { x, y } client offset of the pointer at the time when the current drag operation has started.
	 * Returns null if no item is being dragged.
	 */
	getInitialClientOffset(): IXYCoord | null
	/**
	 * Returns the { x, y } client offset of the drag source component's root DOM node at the time when the current drag
	 * operation has started. Returns null if no item is being dragged.
	 */
	getInitialSourceClientOffset(): IXYCoord | null

	/**
	 * Returns the last recorded { x, y } client offset of the pointer while a drag operation is in progress.
	 * Returns null if no item is being dragged.
	 */
	getClientOffset(): IXYCoord | null

	/**
	 * Returns the projected { x, y } client offset of the drag source component's root DOM node, based on its position at the time
	 * when the current drag operation has started, and the movement difference. Returns null if no item is being dragged.
	 */
	getSourceClientOffset(): IXYCoord | null

	/**
	 * Returns the { x, y } difference between the last recorded client offset of the pointer and the client offset when the current
	 * drag operation has started. Returns null if no item is being dragged.
	 */
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

export interface IAction<Payload> {
	type: string
	payload: Payload
}
export interface ISentinelAction {
	type: string
}

export type ActionCreator<Payload> = (args: any[]) => IAction<Payload>

export interface IBeginDragOptions {
	publishSource?: boolean
	clientOffset?: IXYCoord
	getSourceClientOffset?: (sourceId: ItemType) => IXYCoord
}

export interface IBeginDragPayload {
	itemType: ItemType
	item: any
	sourceId: ItemType
	clientOffset: IXYCoord | null
	sourceClientOffset: IXYCoord | null
	isSourcePublic: boolean
}

export interface IHoverPayload {
	targetIds: ItemType[]
	clientOffset: IXYCoord | null
}

export interface IHoverOptions {
	clientOffset?: IXYCoord
}

export interface IDropPayload {
	dropResult: any
}

export interface ITargetIdPayload {
	targetId: string
}

export interface ISourceIdPayload {
	sourceId: string
}

export interface IDragDropActions {
	beginDrag(sourceIds: string[], options?: any): IAction<IBeginDragPayload>
	publishDragSource(): ISentinelAction
	hover(targetIds: string[], options?: any): IAction<IHoverPayload>
	drop(options?: any): void
	endDrag(): ISentinelAction
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
	beginDrag(monitor: IDragDropMonitor, targetId: string): void
	endDrag(monitor: IDragDropMonitor, targetId: string): void
	canDrag(monitor: IDragDropMonitor, targetId: string): boolean
	isDragging(monitor: IDragDropMonitor, targetId: string): boolean
}

export interface IDropTarget {
	canDrop(monitor: IDragDropMonitor, targetId: string): boolean
	hover(monitor: IDragDropMonitor, targetId: string): void
	drop(monitor: IDragDropMonitor, targetId: string): any
}

export type ItemType = string | symbol
export type TargetType = ItemType | ItemType[]
