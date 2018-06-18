import * as React from 'react'
import { XYCoord, DragDropMonitor, Identifier, DragDropManager } from 'dnd-core'

export { XYCoord }

/**
 * The React Component that manages the DragDropContext for its children.
 */
export interface ContextComponent<Props> extends React.Component<Props> {
	getDecoratedComponentInstance(): React.Component<Props>
	getManager(): DragDropManager<any>
}

/**
 * A DnD interactive component
 */
export interface DndComponent<Props> extends React.Component<Props> {
	getDecoratedComponentInstance(): React.Component<Props> | null
	getHandlerId(): Identifier
}

/**
 * The class interface for a context component
 */
export interface ContextComponentClass<Props>
	extends React.ComponentClass<Props> {
	DecoratedComponent:
		| React.ComponentClass<Props>
		| React.StatelessComponent<Props>
	new (props?: Props, context?: any): ContextComponent<Props>
}
/**
 * The class interface for a DnD component
 */
export interface DndComponentClass<Props> extends React.ComponentClass<Props> {
	DecoratedComponent:
		| React.ComponentClass<Props>
		| React.StatelessComponent<Props>
	new (props?: Props, context?: any): DndComponent<Props>
}

export interface DragSourceMonitor extends DragDropMonitor {
	/**
	 * Returns true if no drag operation is in progress, and the owner's canDrag() returns true or is not defined.
	 */
	canDrag(): boolean

	/**
	 *  Returns true if a drag operation is in progress, and either the owner initiated the drag, or its isDragging() is defined and returns true.
	 */
	isDragging(): boolean

	/**
	 * Returns a string or an ES6 symbol identifying the type of the current dragged item. Returns null if no item is being dragged.
	 */
	getItemType(): Identifier | null

	/**
	 * Returns a plain object representing the currently dragged item. Every drag source must specify it by returning an object from its beginDrag() method.
	 * Returns null if no item is being dragged.
	 */
	getItem(): any

	/**
	 * Returns a plain object representing the last recorded drop result. The drop targets may optionally specify it by returning an object from their
	 * drop() methods. When a chain of drop() is dispatched for the nested targets, bottom up, any parent that explicitly returns its own result from drop()
	 * overrides the child drop result previously set by the child. Returns null if called outside endDrag().
	 */
	getDropResult(): any

	/**
	 *  Returns true if some drop target has handled the drop event, false otherwise. Even if a target did not return a drop result, didDrop() returns true.
	 * Use it inside endDrag() to test whether any drop target has handled the drop. Returns false if called outside endDrag().
	 */
	didDrop(): boolean

	/**
	 * Returns the { x, y } client offset of the pointer at the time when the current drag operation has started. Returns null if no item is being dragged.
	 */
	getInitialClientOffset(): XYCoord | null

	/**
	 * Returns the { x, y } client offset of the drag source component's root DOM node at the time when the current drag operation has started.
	 * Returns null if no item is being dragged.
	 */
	getInitialSourceClientOffset(): XYCoord | null

	/**
	 * Returns the last recorded { x, y } client offset of the pointer while a drag operation is in progress. Returns null if no item is being dragged.
	 */
	getClientOffset(): XYCoord | null

	/**
	 * Returns the { x, y } difference between the last recorded client offset of the pointer and the client offset when the current drag operation has started.
	 * Returns null if no item is being dragged.
	 */
	getDifferenceFromInitialOffset(): XYCoord | null

	/**
	 * Returns the projected { x, y } client offset of the drag source component's root DOM node, based on its position at the time when the current drag operation has
	 * started, and the movement difference. Returns null if no item is being dragged.
	 */
	getSourceClientOffset(): XYCoord | null
}

export interface DropTargetMonitor {
	/**
	 * Returns true if there is a drag operation in progress, and the owner's canDrop() returns true or is not defined.
	 */
	canDrop(): boolean

	/**
	 * Returns true if there is a drag operation in progress, and the pointer is currently hovering over the owner.
	 * You may optionally pass { shallow: true } to strictly check whether only the owner is being hovered, as opposed
	 * to a nested target.
	 */
	isOver(options?: { shallow?: boolean }): boolean

	/**
	 * Returns a string or an ES6 symbol identifying the type of the current dragged item. Returns null if no item is being dragged.
	 */
	getItemType(): Identifier | null

	/**
	 * Returns a plain object representing the currently dragged item. Every drag source must specify it by returning an object from
	 * its beginDrag() method. Returns null if no item is being dragged.
	 */
	getItem(): any

	/**
	 * Returns a plain object representing the last recorded drop result. The drop targets may optionally specify it by returning an
	 * object from their drop() methods. When a chain of drop() is dispatched for the nested targets, bottom up, any parent that explicitly
	 * returns its own result from drop() overrides the drop result previously set by the child. Returns null if called outside drop().
	 */
	getDropResult(): any

	/**
	 *  Returns true if some drop target has handled the drop event, false otherwise. Even if a target did not return a drop result,
	 * didDrop() returns true. Use it inside drop() to test whether any nested drop target has already handled the drop. Returns false
	 * if called outside drop().
	 */
	didDrop(): boolean

	/**
	 * Returns the { x, y } client offset of the pointer at the time when the current drag operation has started. Returns null if no item
	 * is being dragged.
	 */
	getInitialClientOffset(): XYCoord | null

	/**
	 * Returns the { x, y } client offset of the drag source component's root DOM node at the time when the current drag operation has started.
	 * Returns null if no item is being dragged.
	 */
	getInitialSourceClientOffset(): XYCoord | null

	/**
	 * Returns the last recorded { x, y } client offset of the pointer while a drag operation is in progress. Returns null if no item is being dragged.
	 */
	getClientOffset(): XYCoord | null

	/**
	 * Returns the { x, y } difference between the last recorded client offset of the pointer and the client offset when current the drag operation has
	 * started. Returns null if no item is being dragged.
	 */
	getDifferenceFromInitialOffset(): XYCoord | null

	/**
	 * Returns the projected { x, y } client offset of the drag source component's root DOM node, based on its position at the time when the current
	 * drag operation has started, and the movement difference. Returns null if no item is being dragged.
	 */
	getSourceClientOffset(): XYCoord | null
}

export interface DragLayerMonitor {
	/**
	 * Returns true if a drag operation is in progress. Returns false otherwise.
	 */
	isDragging(): boolean

	/**
	 * Returns a string or an ES6 symbol identifying the type of the current dragged item.
	 * Returns null if no item is being dragged.
	 */
	getItemType(): Identifier | null

	/**
	 * Returns a plain object representing the currently dragged item.
	 * Every drag source must specify it by returning an object from its beginDrag() method.
	 * Returns null if no item is being dragged.
	 */
	getItem(): any

	/**
	 * Returns the { x, y } client offset of the pointer at the time when the current drag operation has started.
	 * Returns null if no item is being dragged.
	 */
	getInitialClientOffset(): XYCoord | null

	/**
	 * Returns the { x, y } client offset of the drag source component's root DOM node at the time when the current
	 * drag operation has started. Returns null if no item is being dragged.
	 */
	getInitialSourceClientOffset(): XYCoord | null

	/**
	 * Returns the last recorded { x, y } client offset of the pointer while a drag operation is in progress.
	 * Returns null if no item is being dragged.
	 */
	getClientOffset(): XYCoord | null

	/**
	 * Returns the { x, y } difference between the last recorded client offset of the pointer and the client
	 * offset when current the drag operation has started. Returns null if no item is being dragged.
	 */
	getDifferenceFromInitialOffset(): XYCoord | null

	/**
	 * Returns the projected { x, y } client offset of the drag source component's root DOM node, based on its
	 * position at the time when the current drag operation has started, and the movement difference.
	 * Returns null if no item is being dragged.
	 */
	getSourceClientOffset(): XYCoord | null
}

/**
 * Interface for the DropTarget specification object
 */
export interface DropTargetSpec<Props> {
	/**
	 * Optional.
	 * Called when a compatible item is dropped on the target. You may either return undefined, or a plain object.
	 * If you return an object, it is going to become the drop result and will be available to the drag source in its
	 * endDrag method as monitor.getDropResult(). This is useful in case you want to perform different actions
	 * depending on which target received the drop. If you have nested drop targets, you can test whether a nested
	 * target has already handled drop by checking monitor.didDrop() and monitor.getDropResult(). Both this method and
	 * the source's endDrag method are good places to fire Flux actions. This method will not be called if canDrop()
	 * is defined and returns false.
	 */
	drop?: (props: Props, monitor: DropTargetMonitor, component: any) => any

	/**
	 * Optional.
	 * Called when an item is hovered over the component. You can check monitor.isOver({ shallow: true }) to test whether
	 * the hover happens over just the current target, or over a nested one. Unlike drop(), this method will be called even
	 * if canDrop() is defined and returns false. You can check monitor.canDrop() to test whether this is the case.
	 */
	hover?: (props: Props, monitor: DropTargetMonitor, component: any) => void

	/**
	 * Optional. Use it to specify whether the drop target is able to accept the item. If you want to always allow it, just
	 * omit this method. Specifying it is handy if you'd like to disable dropping based on some predicate over props or
	 * monitor.getItem(). Note: You may not call monitor.canDrop() inside this method.
	 */
	canDrop?: (props: Props, monitor: DropTargetMonitor) => boolean
}

export interface DragSourceSpec<Props, DragObject> {
	/**
	 * Required.
	 * When the dragging starts, beginDrag is called. You must return a plain JavaScript object describing the
	 * data being dragged. What you return is the only information available to the drop targets about the drag
	 * source so it's important to pick the minimal data they need to know. You may be tempted to put a reference
	 * to the component into it, but you should try very hard to avoid doing this because it couples the drag
	 * sources and drop targets. It's a good idea to return something like { id: props.id } from this method.
	 */
	beginDrag: (
		props: Props,
		monitor: DragSourceMonitor,
		component: any,
	) => DragObject

	/**
	 * Optional.
	 * When the dragging stops, endDrag is called. For every beginDrag call, a corresponding endDrag call is guaranteed.
	 * You may call monitor.didDrop() to check whether or not the drop was handled by a compatible drop target. If it was handled,
	 * and the drop target specified a drop result by returning a plain object from its drop() method, it will be available as
	 * monitor.getDropResult(). This method is a good place to fire a Flux action. Note: If the component is unmounted while dragging,
	 * component parameter is set to be null.
	 */
	endDrag?: (props: Props, monitor: DragSourceMonitor, component: any) => void

	/**
	 * Optional.
	 * Use it to specify whether the dragging is currently allowed. If you want to always allow it, just omit this method.
	 * Specifying it is handy if you'd like to disable dragging based on some predicate over props. Note: You may not call
	 * monitor.canDrag() inside this method.
	 */
	canDrag?: (props: Props, monitor: DragSourceMonitor) => boolean

	/**
	 * Optional.
	 * By default, only the drag source that initiated the drag operation is considered to be dragging. You can
	 * override this behavior by defining a custom isDragging method. It might return something like props.id === monitor.getItem().id.
	 * Do this if the original component may be unmounted during the dragging and later “resurrected” with a different parent.
	 * For example, when moving a card across the lists in a Kanban board, you want it to retain the dragged appearance—even though
	 * technically, the component gets unmounted and a different one gets mounted every time you move it to another list.
	 *
	 * Note: You may not call monitor.isDragging() inside this method.
	 */
	isDragging?: (props: Props, monitor: DragSourceMonitor) => boolean
}

/**
 * Options for the Drag Sources, Drop Tragets, and Drag Layers annotation
 */
export interface DndOptions<Props> {
	arePropsEqual?: (first: Props, second: Props) => boolean
}

export type DragElementWrapper<Options> = <Props>(
	elementOrNode: React.ReactElement<Props> | Element,
	options?: Options,
) => React.ReactElement<Props>

export type ConnectDragSource = DragElementWrapper<DragSourceOptions>
export type ConnectDragPreview = DragElementWrapper<DragPreviewOptions>
export interface DragSourceOptions {
	/**
	 * Optional. A string. By default, 'move'. In the browsers that support this feature, specifying 'copy'
	 * shows a special “copying” cursor, while 'move' corresponds to the “move” cursor. You might want to use
	 * this option to provide a hint to the user about whether an action is destructive.
	 */
	dropEffect?: string
}

export interface DragPreviewOptions {
	/**
	 * Optional. A boolean. By default, false. If true, the component will learn that it is being dragged immediately as the drag
	 * starts instead of the next tick. This means that the screenshotting would occur with monitor.isDragging() already being true,
	 * and if you apply any styling like a decreased opacity to the dragged element, this styling will also be reflected on the
	 * screenshot. This is rarely desirable, so false is a sensible default. However, you might want to set it to true in rare cases,
	 * such as if you want to make the custom drag layers work in IE and you need to hide the original element without resorting to
	 * an empty drag preview which IE doesn't support.
	 */
	captureDraggingState?: boolean

	/**
	 * Optional. A number between 0 and 1. By default, 0.5. Specifies how the offset relative to the drag source node is translated
	 * into the horizontal offset of the drag preview when their sizes don't match. 0 means “dock the preview to the left”, 0.5 means
	 * “interpolate linearly” and 1 means “dock the preview to the right”.
	 */
	anchorX?: number

	/**
	 * Optional. A number between 0 and 1. By default, 0.5. Specifies how the offset relative to the drag source node is translated into
	 * the vertical offset of the drag preview when their sizes don't match. 0 means “dock the preview to the top, 0.5 means “interpolate
	 * linearly” and 1 means “dock the preview to the bottom.
	 */
	anchorY?: number

	/**
	 * Optional. A number or null if not needed. By default, null. Specifies the vertical offset between the cursor and the drag preview
	 * element. If offsetX has a value, anchorX won't be used.
	 */
	offsetX?: number

	/**
	 *  Optional. A number or null if not needed. By default, null. Specifies the vertical offset between the cursor and the drag
	 *  preview element. If offsetY has a value, anchorY won't be used.
	 */
	offsetY?: number
}

/**
 * DragSourceConnector is an object passed to a collecting function of the DragSource.
 * Its methods return functions that let you assign the roles to your component's DOM nodes.
 */
export interface DragSourceConnector {
	/**
	 * Returns a function that must be used inside the component to assign the drag source role to a node. By
	 * returning { connectDragSource: connect.dragSource() } from your collecting function, you can mark any React
	 * element as the draggable node. To do that, replace any element with this.props.connectDragSource(element) inside
	 * the render function.
	 *
	 * @param elementOrNode
	 * @param options
	 */
	dragSource(): ConnectDragSource

	/**
	 * Optional. Returns a function that may be used inside the component to assign the drag preview role to a node. By
	 * returning { connectDragPreview: connect.dragPreview() } from your collecting function, you can mark any React element
	 * as the drag preview node. To do that, replace any element with this.props.connectDragPreview(element) inside the render
	 * function. The drag preview is the node that will be screenshotted by the HTML5 backend when the drag begins. For example,
	 * if you want to make something draggable by a small custom handle, you can mark this handle as the dragSource(), but also
	 * mark an outer, larger component node as the dragPreview(). Thus the larger drag preview appears on the screenshot, but
	 * only the smaller drag source is actually draggable. Another possible customization is passing an Image instance to dragPreview
	 * from a lifecycle method like componentDidMount. This lets you use the actual images for drag previews. (Note that IE does not
	 * support this customization). See the example code below for the different usage examples.
	 */
	dragPreview(): ConnectDragPreview
}

/**
 * DropTargetConnector is an object passed to a collecting function of the DropTarget. Its only method dropTarget() returns a function
 * that lets you assign the drop target role to one of your component's DOM nodes.
 */
export interface DropTargetConnector {
	/**
	 * Returns a function that must be used inside the component to assign the drop target role to a node.
	 * By returning { connectDropTarget: connect.dropTarget() } from your collecting function, you can mark any React element
	 * as the droppable node. To do that, replace any element with this.props.connectDropTarget(element) inside the render function.
	 */
	dropTarget(): ConnectDropTarget
}

export type ConnectDropTarget = <Props>(
	elementOrNode: React.ReactElement<Props>,
) => React.ReactElement<Props>

export type DragSourceCollector<CollectedProps> = (
	connect: DragSourceConnector,
	monitor: DragSourceMonitor,
) => CollectedProps

export type DropTargetCollector<CollectedProps> = (
	connect: DropTargetConnector,
	monitor: DropTargetMonitor,
) => CollectedProps

export type DragLayerCollector<TargetProps, CollectedProps> = (
	monitor: DragLayerMonitor,
	props: TargetProps,
) => CollectedProps

/**
 * Top-Level API
 */
/*
export type DropTargetDecorator<P> = (
	types: Identifier | Identifier[] | ((props: P) => Identifier | Identifier[]),
	spec: DropTargetSpec<P, any>,
	collect: DropTargetCollector<any>,
	options?: DndOptions<P>,
) => (
	componentClass: React.ComponentClass<P> | React.StatelessComponent<P>,
) => DndComponentClass<P>

export type DragSourceDecorator<P> = (
	type: Identifier | ((props: P) => Identifier),
	spec: DragSourceSpec<P, any, any>,
	collect: DragSourceCollector<any>,
	options?: DndOptions<P>,
) => (
	componentClass: React.ComponentClass<P> | React.StatelessComponent<P>,
) => DndComponentClass<P>

export type DragLayerDecorator<P> = (
	collect: DragLayerCollector<P, any>,
	options?: DndOptions<P>,
) => (
	componentClass: React.ComponentClass<P> | React.StatelessComponent<P>,
) => DndComponentClass<P>
*/
