import { Backend, Identifier } from 'dnd-core';
import { Connector } from './SourceConnector';
export default class TargetConnector implements Connector {
    private backend;
    hooks: any;
    private handlerId;
    private dropTargetRef;
    private dropTargetNode;
    private dropTargetOptionsInternal;
    private unsubscribeDropTarget;
    private lastConnectedHandlerId;
    private lastConnectedDropTarget;
    private lastConnectedDropTargetOptions;
    constructor(backend: Backend);
    readonly connectTarget: any;
    reconnect(): void;
    receiveHandlerId(newHandlerId: Identifier | null): void;
    dropTargetOptions: any;
    private didHandlerIdChange;
    private didDropTargetChange;
    private didOptionsChange;
    private disconnectDropTarget;
    private readonly dropTarget;
}
