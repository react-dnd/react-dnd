import { NativeItemConfig } from './nativeTypesConfig';
import { DragDropMonitor } from 'dnd-core';
export declare class NativeDragSource {
    private config;
    item: any;
    constructor(config: NativeItemConfig);
    mutateItemByReadingDataTransfer(dataTransfer: DataTransfer | null): void;
    canDrag(): boolean;
    beginDrag(): any;
    isDragging(monitor: DragDropMonitor, handle: string): boolean;
    endDrag(): void;
}
