import React from 'react'
import { DragSource, DropTarget, useDrop, useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	width: '20rem',
}
const handleStyle = {
	backgroundColor: 'green',
	width: '1rem',
	height: '1rem',
	display: 'inline-block',
	marginRight: '0.75rem',
	cursor: 'move',
}

const BoxWithHandleRaw: React.FC = () => {
	const [, drop] = useDrop({
		accept: ItemTypes.BOX,
	})
	const [{ isDragging }, drag, preview] = useDrag({
		item: {
			type: ItemTypes.BOX,
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})
	const opacity = isDragging ? 0.4 : 1
	return drop(
		preview(
			<div style={{ ...style, opacity }}>
				{drag(<div style={handleStyle} />)}
				Drag me by the handle, the whole box should drag
			</div>,
		),
	)
}

export const BoxWithHandle = DragSource(
	ItemTypes.BOX,
	{
		beginDrag: () => ({}),
	},
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	}),
)(
	DropTarget(ItemTypes.BOX, {}, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isDraggingHover: monitor.isOver({ shallow: true }),
		isOver: monitor.isOver(),
	}))(BoxWithHandleRaw),
)
