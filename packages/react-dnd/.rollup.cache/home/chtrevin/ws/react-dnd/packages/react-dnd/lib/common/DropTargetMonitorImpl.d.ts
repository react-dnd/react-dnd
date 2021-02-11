import { DragDropManager, Unsubscribe, Listener, Identifier, XYCoord } from 'dnd-core';
import { DropTargetMonitor } from '../interfaces';
export declare class DropTargetMonitorImpl implements DropTargetMonitor {
    private internalMonitor;
    private targetId;
    constructor(manager: DragDropManager);
    receiveHandlerId(targetId: Identifier | null): void;
    getHandlerId(): Identifier | null;
    subscribeToStateChange(listener: Listener, options?: {
        handlerIds: Identifier[] | undefined;
    }): Unsubscribe;
    canDrop(): boolean;
    isOver(options: {
        shallow?: boolean;
    }): boolean;
    getItemType(): Identifier | null;
    getItem(): any;
    getDropResult(): any;
    didDrop(): boolean;
    getInitialClientOffset(): XYCoord | null;
    getInitialSourceClientOffset(): XYCoord | null;
    getSourceClientOffset(): XYCoord | null;
    getClientOffset(): XYCoord | null;
    getDifferenceFromInitialOffset(): XYCoord | null;
}
