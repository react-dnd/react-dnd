import { useDrag } from 'react-dnd';
const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
};
export const Box = ({ name, type, isDropped }) => {
    const [{ opacity, handlerId }, drag] = useDrag({
        item: { name, type },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
            handlerId: monitor.getHandlerId(),
        }),
    });
    return (<div ref={drag} style={{ ...style, opacity }} data-handler-id={handlerId}>
			{isDropped ? <s>{name}</s> : name}
		</div>);
};
