import { SourceType } from 'dnd-core';
import { DragSourceSpec, DragSourceCollector, DndOptions } from './interfaces';
import { DndComponentEnhancer } from './interfaces';
/**
 * Decorates a component as a dragsource
 * @param type The dragsource type
 * @param spec The drag source specification
 * @param collect The props collector function
 * @param options DnD options
 */
export default function DragSource<RequiredProps, CollectedProps = {}, DragObject = {}>(type: SourceType | ((props: RequiredProps) => SourceType), spec: DragSourceSpec<RequiredProps, DragObject>, collect: DragSourceCollector<CollectedProps, RequiredProps>, options?: DndOptions<RequiredProps>): DndComponentEnhancer<CollectedProps>;
