import { DragObjectWithType, DropTargetMonitor, DropTargetHookSpec } from '../../interfaces';
import { MutableRefObject } from 'react';
import { TargetConnector } from '../../common/TargetConnector';
export declare function useDropTargetMonitor(): [DropTargetMonitor, TargetConnector];
export declare function useDropHandler<DragObject extends DragObjectWithType, DropResult, CustomProps>(spec: MutableRefObject<DropTargetHookSpec<DragObject, DropResult, CustomProps>>, monitor: DropTargetMonitor, connector: any): void;
