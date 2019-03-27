import { DragDropManager } from '../../interfaces';
export * from './types';
export default function createDragDropActions<Context>(manager: DragDropManager<Context>): {
    beginDrag: (sourceIds?: string[], options?: import("../../interfaces").BeginDragOptions) => import("../../interfaces").Action<import("../../interfaces").BeginDragPayload> | undefined;
    publishDragSource: () => import("../../interfaces").SentinelAction | undefined;
    hover: (targetIdsArg: string[], { clientOffset }?: import("../../interfaces").HoverOptions) => import("../../interfaces").Action<import("../../interfaces").HoverPayload>;
    drop: (options?: {}) => void;
    endDrag: () => import("../../interfaces").SentinelAction;
};
