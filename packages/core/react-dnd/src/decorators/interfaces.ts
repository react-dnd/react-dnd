import * as React from 'react'
import { DragDropManager, Identifier } from 'dnd-core'
import {
	DropTargetMonitor,
	DragSourceMonitor,
	DragLayerMonitor,
	ConnectDragPreview,
	ConnectDropTarget,
	ConnectDragSource,
} from '../interfaces'
import { NonReactStatics } from 'hoist-non-react-statics'

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
	DecoratedComponent: React.ComponentType<Props>
	new (props?: Props, context?: any): ContextComponent<Props>
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
 * DragSourceConnector is an object passed to a collecting function of the DragSource.
 * Its methods return functions that let you assign the roles to your component's DOM nodes.
 */
export interface DragSourceConnector {
	/**
	 * Returns a function that must be used inside the component to assign the drag source role to a node. By
	 * returning { connectDragSource: connect.dragSource() } from your collecting function, you can mark any React
	 * element as the draggable node. To do that, replace any element with this.props.connectDragSource(element) inside
	 * the render function.
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

export type DragSourceCollector<CollectedProps, TargetProps> = (
	connect: DragSourceConnector,
	monitor: DragSourceMonitor,
	props: TargetProps,
) => CollectedProps

export type DropTargetCollector<CollectedProps, TargetProps> = (
	connect: DropTargetConnector,
	monitor: DropTargetMonitor,
	props: TargetProps,
) => CollectedProps

export type DragLayerCollector<TargetProps, CollectedProps> = (
	monitor: DragLayerMonitor,
	props: TargetProps,
) => CollectedProps

// Borrowing typings from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-redux/index.d.ts

// Omit taken from https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * A property P will be present if:
 * - it is present in DecorationTargetProps
 *
 * Its value will be dependent on the following conditions
 * - if property P is present in InjectedProps and its definition extends the definition
 *   in DecorationTargetProps, then its definition will be that of DecorationTargetProps[P]
 * - if property P is not present in InjectedProps then its definition will be that of
 *   DecorationTargetProps[P]
 * - if property P is present in InjectedProps but does not extend the
 *   DecorationTargetProps[P] definition, its definition will be that of InjectedProps[P]
 */
export type Matching<InjectedProps, DecorationTargetProps> = {
	[P in keyof DecorationTargetProps]: P extends keyof InjectedProps
		? InjectedProps[P] extends DecorationTargetProps[P]
			? DecorationTargetProps[P]
			: InjectedProps[P]
		: DecorationTargetProps[P]
}

/**
 * a property P will be present if :
 * - it is present in both DecorationTargetProps and InjectedProps
 * - InjectedProps[P] can satisfy DecorationTargetProps[P]
 * ie: decorated component can accept more types than decorator is injecting
 *
 * For decoration, inject props or ownProps are all optionally
 * required by the decorated (right hand side) component.
 * But any property required by the decorated component must be satisfied by the injected property.
 */
export type Shared<InjectedProps, DecorationTargetProps> = {
	[P in Extract<
		keyof InjectedProps,
		keyof DecorationTargetProps
	>]?: InjectedProps[P] extends DecorationTargetProps[P]
		? DecorationTargetProps[P]
		: never
}

/**
 * Gets the props interface of a component using inference
 */
export type GetProps<C> = C extends React.ComponentType<infer P> ? P : never

export type DndComponentEnhancer<CollectedProps> = <
	C extends React.ComponentType<Matching<CollectedProps, GetProps<C>>>
>(
	component: C,
) => DndComponentClass<
	C,
	Omit<GetProps<C>, keyof Shared<CollectedProps, GetProps<C>>>
>

// Applies LibraryManagedAttributes (proper handling of defaultProps
// and propTypes), as well as defines WrappedComponent.
export type DndComponentClass<
	C extends React.ComponentType<any>,
	P
> = React.ComponentClass<JSX.LibraryManagedAttributes<C, P>> &
	NonReactStatics<C> & { DecoratedComponent: C }
