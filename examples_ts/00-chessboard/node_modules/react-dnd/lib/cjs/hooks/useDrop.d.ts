import { DropTargetHookSpec, ConnectDropTarget, DragObjectWithType } from '../interfaces';
/**
 * useDropTarget Hook (This API is experimental and subject to breaking changes in non-breaking versions)
 * @param spec The drop target specification
 */
export declare function useDrop<DragObject extends DragObjectWithType, DropResult, CollectedProps>(spec: DropTargetHookSpec<DragObject, DropResult, CollectedProps>): [CollectedProps, ConnectDropTarget];
