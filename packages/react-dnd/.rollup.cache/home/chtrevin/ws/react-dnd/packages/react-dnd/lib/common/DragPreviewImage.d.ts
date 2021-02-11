import { FC } from 'react';
import { ConnectDragPreview } from '../interfaces';
export interface DragPreviewImageProps {
    connect: ConnectDragPreview;
    src: string;
}
/**
 * A utility for rendering a drag preview image
 */
export declare const DragPreviewImage: FC<DragPreviewImageProps>;
