import { Unsubscribe } from 'redux'

export type Identifier = string | symbol
export type SourceType = Identifier
export type TargetType = Identifier | Identifier[]
export type Unsubscribe = () => void
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
	connectDragSource(sourceId: any, node?: any, options?: any): Unsubscribe
	connectDragPreview(sourceId: any, node?: any, options?: any): Unsubscribe
	connectDropTarget(targetId: any, node?: any, options?: any): Unsubscribe
}

export interface DragDropMonitor {
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
	getItemType(): Identifier | null

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
	getInitialClientOffset(): XYCoord | null
	/**
	 * Returns the { x, y } client offset of the drag source component's root DOM node at the time when the current drag
	 * operation has started. Returns null if no item is being dragged.
	 */
	getInitialSourceClientOffset(): XYCoord | null

	/**
	 * Returns the last recorded { x, y } client offset of the pointer while a drag operation is in progress.
	 * Returns null if no item is being dragged.
	 */
	getClientOffset(): XYCoord | null

	/**
	 * Returns the projected { x, y } client offset of the drag source component's root DOM node, based on its position at the time
	 * when the current drag operation has started, and the movement difference. Returns null if no item is being dragged.
	 */
	getSourceClientOffset(): XYCoord | null

	/**
	 * Returns the { x, y } difference between the last recorded client offset of the pointer and the client offset when the current
	 * drag operation has started. Returns null if no item is being dragged.
	 */
	getDifferenceFromInitialOffset(): XYCoord | null
}

export interface HandlerRegistry {
	addSource(type: SourceType, source: DragSource): string
	addTarget(type: TargetType, target: DropTarget): string
	containsHandler(handler: DragSource | DropTarget): boolean
	getSource(sourceId: string, includePinned?: boolean): DragSource
	getSourceType(sourceId: string): SourceType
	getTargetType(targetId: string): TargetType
	getTarget(targetId: string): DropTarget
	isSourceId(handlerId: string): boolean
	isTargetId(handlerId: string): boolean
	removeSource(sourceId: string): void
	removeTarget(targetId: string): void
	pinSource(sourceId: string): void
	unpinSource(): void
}

export interface Action<Payload> {
	type: string
	payload: Payload
}
export interface SentinelAction {
	type: string
}

export type ActionCreator<Payload> = (args: any[]) => Action<Payload>

export interface BeginDragOptions {
	publishSource?: boolean
	clientOffset?: XYCoord
	getSourceClientOffset?: (sourceId: Identifier) => XYCoord
}

export interface BeginDragPayload {
	itemType: Identifier
	item: any
	sourceId: Identifier
	clientOffset: XYCoord | null
	sourceClientOffset: XYCoord | null
	isSourcePublic: boolean
}

export interface HoverPayload {
	targetIds: Identifier[]
	clientOffset: XYCoord | null
}

export interface HoverOptions {
	clientOffset?: XYCoord
}

export interface DropPayload {
	dropResult: any
}

export interface TargetIdPayload {
	targetId: string
}

export interface SourceIdPayload {
	sourceId: string
}

export interface DragDropActions {
	beginDrag(sourceIds: string[], options?: any): Action<BeginDragPayload>
	publishDragSource(): SentinelAction
	hover(targetIds: string[], options?: any): Action<HoverPayload>
	drop(options?: any): void
	endDrag(): SentinelAction
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
	beginDrag(monitor: DragDropMonitor, targetId: string): void
	endDrag(monitor: DragDropMonitor, targetId: string): void
	canDrag(monitor: DragDropMonitor, targetId: string): boolean
	isDragging(monitor: DragDropMonitor, targetId: string): boolean
}

export interface DropTarget {
	canDrop(monitor: DragDropMonitor, targetId: string): boolean
	hover(monitor: DragDropMonitor, targetId: string): void
	drop(monitor: DragDropMonitor, targetId: string): any
}
