import { DragLayerCollector, DndOptions, DndComponentEnhancer } from './interfaces';
export default function DragLayer<RequiredProps, CollectedProps = {}>(collect: DragLayerCollector<RequiredProps, CollectedProps>, options?: DndOptions<RequiredProps>): DndComponentEnhancer<CollectedProps>;
