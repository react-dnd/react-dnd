import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};
export const Card = memo(function Card({ id, text, moveCard, findCard, }) {
    const originalIndex = findCard(id).index;
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: { id, originalIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const { id: droppedId, originalIndex } = item;
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                moveCard(droppedId, originalIndex);
            }
        },
    }), [id, originalIndex, moveCard]);
    const [, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        canDrop: () => false,
        hover({ id: draggedId }) {
            if (draggedId !== id) {
                const { index: overIndex } = findCard(id);
                moveCard(draggedId, overIndex);
            }
        },
    }), [findCard, moveCard]);
    const opacity = isDragging ? 0 : 1;
    return (<div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
			{text}
		</div>);
});
