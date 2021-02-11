import { SourceType } from 'dnd-core';
import { DndOptions } from '../interfaces';
import { DndComponentEnhancer, DragSourceSpec, DragSourceCollector } from './interfaces';
/**
 * Decorates a component as a dragsource
 * @deprecated - The decorator-based API will be removed in a future major version
 * @param type The dragsource type
 * @param spec The drag source specification
 * @param collect The props collector function
 * @param options DnD options
 */
export declare function DragSource<RequiredProps, CollectedProps = any, DragObject = any>(type: SourceType | ((props: RequiredProps) => SourceType), spec: DragSourceSpec<RequiredProps, DragObject>, collect: DragSourceCollector<CollectedProps, RequiredProps>, options?: DndOptions<RequiredProps>): DndComponentEnhancer<CollectedProps>;
