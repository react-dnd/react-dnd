import { XYCoord } from 'dnd-core';
export declare function getNodeClientOffset(node: any): {
    x: any;
    y: any;
} | null;
export declare function getEventClientOffset(e: any): {
    x: any;
    y: any;
};
export declare function getDragPreviewOffset(sourceNode: any, dragPreview: any, clientOffset: XYCoord, anchorPoint: any, offsetPoint: any): {
    x: any;
    y: any;
};
