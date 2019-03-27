import * as React from 'react';
import { DragDropManager, Identifier } from 'dnd-core';
import { DndComponent } from './interfaces';
export interface DecorateHandlerArgs<Props, ItemIdType> {
    DecoratedComponent: any;
    createMonitor: (manager: DragDropManager<any>) => HandlerReceiver;
    createHandler: (monitor: HandlerReceiver, ref: React.RefObject<any>) => Handler<Props>;
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
    ref: React.RefObject<any>;
    receiveProps(props: Props): void;
}
export default function decorateHandler<Props, CollectedProps, ItemIdType>({ DecoratedComponent, createHandler, createMonitor, createConnector, registerHandler, containerDisplayName, getType, collect, options, }: DecorateHandlerArgs<Props, ItemIdType>): DndComponent<Props>;
export {};
