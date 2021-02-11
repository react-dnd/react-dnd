import { TargetType } from 'dnd-core';
import { DndOptions } from '../interfaces';
import { DropTargetSpec, DropTargetCollector, DndComponentEnhancer } from './interfaces';
/**
 * @deprecated - The decorator-based API will be removed in a future major version
 * @param type The accepted target type
 * @param spec The DropTarget specification
 * @param collect The props collector function
 * @param options Options
 */
export declare function DropTarget<RequiredProps, CollectedProps = any>(type: TargetType | ((props: RequiredProps) => TargetType), spec: DropTargetSpec<RequiredProps>, collect: DropTargetCollector<CollectedProps, RequiredProps>, options?: DndOptions<RequiredProps>): DndComponentEnhancer<CollectedProps>;
