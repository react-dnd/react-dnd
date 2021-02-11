import { DragSourceHookSpec, DragObjectWithType, ConnectDragSource, ConnectDragPreview } from '../interfaces';
/**
 * useDragSource hook
 * @param sourceSpec The drag source specification *
 */
export declare function useDrag<DragObject extends DragObjectWithType, DropResult, CollectedProps>(spec: DragSourceHookSpec<DragObject, DropResult, CollectedProps>): [CollectedProps, ConnectDragSource, ConnectDragPreview];
