import { Action, DragDropManager, HoverPayload, HoverOptions } from '../../interfaces';
export default function createHover<Context>(manager: DragDropManager<Context>): (targetIdsArg: string[], { clientOffset }?: HoverOptions) => Action<HoverPayload>;
