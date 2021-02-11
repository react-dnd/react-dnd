import { DragLayerMonitor } from '../interfaces';
/**
 * useDragLayer Hook
 * @param collector The property collector
 */
export declare function useDragLayer<CollectedProps>(collect: (monitor: DragLayerMonitor) => CollectedProps): CollectedProps;
