import { DragDropManager, Unsubscribe, Listener, Identifier } from 'dnd-core';
import { DropTargetMonitor } from './interfaces';
export default class DropTargetMonitorImpl implements DropTargetMonitor {
    private internalMonitor;
    private targetId;
    constructor(manager: DragDropManager<any>);
    receiveHandlerId(targetId: Identifier | null): void;
    getHandlerId(): Identifier | null;
    subscribeToStateChange(listener: Listener, options?: {
        handlerIds: Identifier[] | undefined;
    }): Unsubscribe;
    canDrop(): boolean;
    isOver(options: {
        shallow?: boolean;
    }): boolean;
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
