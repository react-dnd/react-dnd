import { Store } from 'redux';
import { State } from './reducers';
import { DragSource, DropTarget, SourceType, TargetType, Identifier, HandlerRegistry } from './interfaces';
export default class HandlerRegistryImpl implements HandlerRegistry {
    private store;
    private types;
    private dragSources;
    private dropTargets;
    private pinnedSourceId;
    private pinnedSource;
    constructor(store: Store<State>);
    addSource(type: SourceType, source: DragSource): string;
    addTarget(type: TargetType, target: DropTarget): string;
    containsHandler(handler: DragSource | DropTarget): boolean;
    getSource(sourceId: string, includePinned?: boolean): DragSource;
    getTarget(targetId: string): DropTarget;
    getSourceType(sourceId: string): string | symbol;
    getTargetType(targetId: string): Identifier | Identifier[];
    isSourceId(handlerId: string): boolean;
    isTargetId(handlerId: string): boolean;
    removeSource(sourceId: string): void;
    removeTarget(targetId: string): void;
    pinSource(sourceId: string): void;
    unpinSource(): void;
    private addHandler;
}
