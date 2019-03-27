import { Action, DragDropManager, BeginDragPayload, BeginDragOptions } from '../../interfaces';
export default function createBeginDrag<Context>(manager: DragDropManager<Context>): (sourceIds?: string[], options?: BeginDragOptions) => Action<BeginDragPayload> | undefined;
