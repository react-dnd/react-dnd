import { TargetType } from 'dnd-core';
import { DropTargetSpec, DndOptions, DropTargetCollector, DndComponentEnhancer } from './interfaces';
export default function DropTarget<RequiredProps, CollectedProps = {}>(type: TargetType | ((props: RequiredProps) => TargetType), spec: DropTargetSpec<RequiredProps>, collect: DropTargetCollector<CollectedProps, RequiredProps>, options?: DndOptions<RequiredProps>): DndComponentEnhancer<CollectedProps>;
