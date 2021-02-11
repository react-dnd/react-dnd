import { FC } from 'react';
import { BackendFactory, DragDropManager } from 'dnd-core';
export declare type DndProviderProps<BackendContext, BackendOptions> = {
    manager: DragDropManager;
} | {
    backend: BackendFactory;
    context?: BackendContext;
    options?: BackendOptions;
    debugMode?: boolean;
};
/**
 * A React component that provides the React-DnD context
 */
export declare const DndProvider: FC<DndProviderProps<any, any>>;
