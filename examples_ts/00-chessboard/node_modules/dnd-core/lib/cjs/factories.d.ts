import { DragDropManager, BackendFactory } from './interfaces';
export declare function createDragDropManager<C>(backend: BackendFactory, context: C, debugMode?: boolean): DragDropManager<C>;
