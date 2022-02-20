import { NativeTypes } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';
const style = {
    border: '1px solid gray',
    height: '15rem',
    width: '15rem',
    padding: '2rem',
    textAlign: 'center',
};
export const TargetBox = (props) => {
    const { onDrop } = props;
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: [NativeTypes.HTML],
        drop(item) {
            if (onDrop) {
                onDrop(item);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [props]);
    const isActive = canDrop && isOver;
    return (<div ref={drop} style={style}>
			{isActive ? 'Release to drop' : 'Drag HTML here'}
		</div>);
};
