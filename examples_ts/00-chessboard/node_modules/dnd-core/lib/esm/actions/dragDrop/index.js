import createBeginDrag from './beginDrag';
import createPublishDragSource from './publishDragSource';
import createHover from './hover';
import createDrop from './drop';
import createEndDrag from './endDrag';
export * from './types';
export default function createDragDropActions(manager) {
    return {
        beginDrag: createBeginDrag(manager),
        publishDragSource: createPublishDragSource(manager),
        hover: createHover(manager),
        drop: createDrop(manager),
        endDrag: createEndDrag(manager),
    };
}
