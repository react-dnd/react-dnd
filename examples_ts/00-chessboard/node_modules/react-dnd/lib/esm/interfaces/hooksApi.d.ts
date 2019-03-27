import { TargetType, SourceType } from 'dnd-core';
import { DropTargetMonitor, DragSourceMonitor } from './monitors';
import { DragSourceOptions, DragPreviewOptions } from './options';
export interface DragSourceHookSpec<DragObject extends DragObjectWithType, DropResult, CollectedProps> {
    /**
     * A plain javascript item describing the data being dragged.
     * This is the only information available to the drop targets about the drag
     * source so it's important to pick the minimal data they need to know.
     *
     * You may be tempted to put a reference to the component or complex object here,
     * but you shouldx try very hard to avoid doing this because it couples the
     * drag sources and drop targets. It's a good idea to use something like
     * { id: props.id }
     *
     */
    item: DragObject;
    /**
     * The drag source options
     */
    options?: DragSourceOptions;
    /**
     * DragPreview options
     */
    previewOptions?: DragPreviewOptions;
    /**
     * When the dragging starts, beginDrag is called. If an object is returned from this function it will overide the default dragItem
     */
    begin?: (monitor: DragSourceMonitor) => DragObject | undefined | void;
    /**
     * Optional.
     * When the dragging stops, endDrag is called. For every beginDrag call, a corresponding endDrag call is guaranteed.
     * You may call monitor.didDrop() to check whether or not the drop was handled by a compatible drop target. If it was handled,
     * and the drop target specified a drop result by returning a plain object from its drop() method, it will be available as
     * monitor.getDropResult(). This method is a good place to fire a Flux action. Note: If the component is unmounted while dragging,
     * component parameter is set to be null.
     */
    end?: (dropResult: DropResult | undefined, monitor: DragSourceMonitor) => void;
    /**
     * Optional.
     * Use it to specify whether the dragging is currently allowed. If you want to always allow it, just omit this method.
     * Specifying it is handy if you'd like to disable dragging based on some predicate over props. Note: You may not call
     * monitor.canDrag() inside this method.
     */
    canDrag?: boolean | ((monitor: DragSourceMonitor) => boolean);
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
    isDragging?: (monitor: DragSourceMonitor) => boolean;
    /**
     * A function to collect rendering properties
     */
    collect?: (monitor: DragSourceMonitor) => CollectedProps;
}
/**
 * Interface for the DropTarget specification object
 */
export interface DropTargetHookSpec<DragObject, DropResult, CollectedProps> {
    /**
     * The kinds of dragItems this dropTarget accepts
     */
    accept: TargetType;
    /**
     * The drop target optinos
     */
    options?: any;
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
    drop?: (item: DragObject, monitor: DropTargetMonitor) => DropResult | undefined;
    /**
     * Optional.
     * Called when an item is hovered over the component. You can check monitor.isOver({ shallow: true }) to test whether
     * the hover happens over just the current target, or over a nested one. Unlike drop(), this method will be called even
     * if canDrop() is defined and returns false. You can check monitor.canDrop() to test whether this is the case.
     */
    hover?: (item: DragObject, monitor: DropTargetMonitor) => void;
    /**
     * Optional. Use it to specify whether the drop target is able to accept the item. If you want to always allow it, just
     * omit this method. Specifying it is handy if you'd like to disable dropping based on some predicate over props or
     * monitor.getItem(). Note: You may not call monitor.canDrop() inside this method.
     */
    canDrop?: (item: DragObject, monitor: DropTargetMonitor) => boolean;
    /**
     * A function to collect rendering properties
     */
    collect?: (monitor: DropTargetMonitor) => CollectedProps;
}
export interface DragObjectWithType {
    type: SourceType;
}
