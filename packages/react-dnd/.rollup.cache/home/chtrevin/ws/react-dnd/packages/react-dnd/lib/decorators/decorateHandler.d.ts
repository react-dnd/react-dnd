import { RefObject } from 'react';
import { DragDropManager, Identifier } from 'dnd-core';
import { DndComponent } from './interfaces';
export interface DecorateHandlerArgs<Props, ItemIdType> {
    DecoratedComponent: any;
    createMonitor: (manager: DragDropManager) => HandlerReceiver;
    createHandler: (monitor: HandlerReceiver, ref: RefObject<any>) => Handler<Props>;
    createConnector: any;
    registerHandler: any;
    containerDisplayName: string;
    getType: (props: Props) => ItemIdType;
    collect: any;
    options: any;
}
interface HandlerReceiver {
    receiveHandlerId: (handlerId: Identifier | null) => void;
}
interface Handler<Props> {
    ref: RefObject<any>;
    receiveProps(props: Props): void;
}
export declare function decorateHandler<Props, CollectedProps, ItemIdType>({ DecoratedComponent, createHandler, createMonitor, createConnector, registerHandler, containerDisplayName, getType, collect, options, }: DecorateHandlerArgs<Props, ItemIdType>): DndComponent<Props>;
export {};
