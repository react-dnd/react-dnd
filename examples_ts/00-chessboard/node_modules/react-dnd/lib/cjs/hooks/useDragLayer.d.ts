import { DragLayerMonitor } from '../interfaces';
/**
 * useDragLayer Hook  (This API is experimental and subject to breaking changes in non-breaking versions)
 * @param collector The property collector
 */
export declare function useDragLayer<CollectedProps>(collect: (monitor: DragLayerMonitor) => CollectedProps): CollectedProps;
