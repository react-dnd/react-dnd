/// <reference types="react" />
import { DragDropManager, BackendFactory } from 'dnd-core';
/**
 * The React context type
 */
export interface DndContextType {
    dragDropManager: DragDropManager | undefined;
}
/**
 * Create the React Context
 */
export declare const DndContext: import("react").Context<DndContextType>;
/**
 * Creates the context object we're providing
 * @param backend
 * @param context
 */
export declare function createDndContext<BackendContext, BackendOptions>(backend: BackendFactory, context?: BackendContext, options?: BackendOptions, debugMode?: boolean): DndContextType;
