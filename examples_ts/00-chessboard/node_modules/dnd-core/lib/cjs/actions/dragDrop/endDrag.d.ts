import { DragDropManager, SentinelAction } from '../../interfaces';
export default function createEndDrag<Context>(manager: DragDropManager<Context>): () => SentinelAction;
