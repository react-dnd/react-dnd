import * as React from 'react';
import { DragSource, DropTarget, } from 'react-dnd';
import ItemTypes from './ItemTypes';
const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};
const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            originalIndex: props.findCard(props.id).index,
        };
    },
    endDrag(props, monitor) {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();
        if (!didDrop) {
            props.moveCard(droppedId, originalIndex);
        }
    },
};
const cardTarget = {
    canDrop() {
        return false;
    },
    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;
        if (draggedId !== overId) {
            const { index: overIndex } = props.findCard(overId);
            props.moveCard(draggedId, overIndex);
        }
    },
};
class Card extends React.Component {
    render() {
        const { text, isDragging, connectDragSource, connectDropTarget, } = this.props;
        const opacity = isDragging ? 0 : 1;
        return connectDragSource(connectDropTarget(<div style={Object.assign({}, style, { opacity })}>{text}</div>));
    }
}
export default DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(Card));
