import { Backend, Identifier } from 'dnd-core';
import { Connector } from './SourceConnector';
export declare class TargetConnector implements Connector {
    hooks: any;
    private handlerId;
    private dropTargetRef;
    private dropTargetNode;
    private dropTargetOptionsInternal;
    private unsubscribeDropTarget;
    private lastConnectedHandlerId;
    private lastConnectedDropTarget;
    private lastConnectedDropTargetOptions;
    private readonly backend;
    constructor(backend: Backend);
    get connectTarget(): any;
    reconnect(): void;
    receiveHandlerId(newHandlerId: Identifier | null): void;
    get dropTargetOptions(): any;
    set dropTargetOptions(options: any);
    private didHandlerIdChange;
    private didDropTargetChange;
    private didOptionsChange;
    private disconnectDropTarget;
    private get dropTarget();
    private clearDropTarget;
}
