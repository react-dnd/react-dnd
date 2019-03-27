import { DragDropManager, SentinelAction } from '../../interfaces';
export default function createPublishDragSource<Context>(manager: DragDropManager<Context>): () => SentinelAction | undefined;
