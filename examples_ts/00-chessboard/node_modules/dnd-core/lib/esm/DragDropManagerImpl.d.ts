import { Backend, BackendFactory, DragDropActions, DragDropMonitor, DragDropManager, HandlerRegistry } from './interfaces';
export default class DragDropManagerImpl<Context> implements DragDropManager<Context> {
    private context;
    private store;
    private monitor;
    private backend;
    private isSetUp;
    constructor(createBackend: BackendFactory, context?: Context, debugMode?: boolean);
    getContext(): Context;
    getMonitor(): DragDropMonitor;
    getBackend(): Backend;
    getRegistry(): HandlerRegistry;
    getActions(): DragDropActions;
    dispatch(action: any): void;
    private handleRefCountChange;
}
