import { DragDropManager, Unsubscribe, Listener, Identifier } from 'dnd-core';
import { DragSourceMonitor } from './interfaces';
export default class DragSourceMonitorImpl implements DragSourceMonitor {
    private internalMonitor;
    private sourceId;
    constructor(manager: DragDropManager<any>);
    receiveHandlerId(sourceId: Identifier | null): void;
    getHandlerId(): Identifier | null;
    canDrag(): boolean;
    isDragging(): boolean;
    subscribeToStateChange(listener: Listener, options?: {
        handlerIds: Identifier[] | undefined;
    }): Unsubscribe;
    isDraggingSource(sourceId: Identifier): boolean;
    isOverTarget(targetId: Identifier, options?: {
        shallow: boolean;
    }): boolean;
    getTargetIds(): Identifier[];
    isSourcePublic(): boolean | null;
    getSourceId(): Identifier | null;
    subscribeToOffsetChange(listener: Listener): Unsubscribe;
    canDragSource(sourceId: Identifier): boolean;
    canDropOnTarget(targetId: Identifier): boolean;
    getItemType(): string | symbol | null;
    getItem(): any;
    getDropResult(): any;
    didDrop(): boolean;
    getInitialClientOffset(): import("dnd-core").XYCoord | null;
    getInitialSourceClientOffset(): import("dnd-core").XYCoord | null;
    getSourceClientOffset(): import("dnd-core").XYCoord | null;
    getClientOffset(): import("dnd-core").XYCoord | null;
    getDifferenceFromInitialOffset(): import("dnd-core").XYCoord | null;
}
