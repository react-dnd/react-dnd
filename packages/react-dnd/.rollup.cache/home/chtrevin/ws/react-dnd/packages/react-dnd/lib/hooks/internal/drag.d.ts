import { MutableRefObject } from 'react';
import { DragSourceHookSpec, DragObjectWithType, DragSourceMonitor } from '../../interfaces';
import { SourceConnector } from '../../common/SourceConnector';
export declare function useDragSourceMonitor(): [DragSourceMonitor, SourceConnector];
export declare function useDragHandler<DragObject extends DragObjectWithType, DropResult, CustomProps>(spec: MutableRefObject<DragSourceHookSpec<DragObject, DropResult, CustomProps>>, monitor: DragSourceMonitor, connector: any): void;
