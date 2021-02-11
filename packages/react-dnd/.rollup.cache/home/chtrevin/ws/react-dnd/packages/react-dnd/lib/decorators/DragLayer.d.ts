import { DndOptions } from '../interfaces';
import { DragLayerCollector, DndComponentEnhancer } from './interfaces';
/**
 * @deprecated - The decorator-based API will be removed in a future major version
 * @param collect The props collector function
 * @param options The DnD options
 */
export declare function DragLayer<RequiredProps, CollectedProps = any>(collect: DragLayerCollector<RequiredProps, CollectedProps>, options?: DndOptions<RequiredProps>): DndComponentEnhancer<CollectedProps>;
