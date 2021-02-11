import { DragDropManager, DropTarget, Unsubscribe, Identifier, TargetType, SourceType, DragSource } from 'dnd-core';
export declare function registerTarget(type: TargetType, target: DropTarget, manager: DragDropManager): [Identifier, Unsubscribe];
export declare function registerSource(type: SourceType, source: DragSource, manager: DragDropManager): [Identifier, Unsubscribe];
