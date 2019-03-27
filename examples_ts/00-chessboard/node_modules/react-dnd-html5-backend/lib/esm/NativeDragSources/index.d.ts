import { NativeDragSource } from './NativeDragSource';
export declare function createNativeDragSource(type: string): NativeDragSource;
export declare function matchNativeItemType(dataTransfer: DataTransfer | null): string | null;
