import React from 'react'
import { ConnectDragPreview, ConnectDragSource } from 'react-dnd'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style: React.CSSProperties = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	width: '20rem',
}

const handleStyle: React.CSSProperties = {
	backgroundColor: 'green',
	width: '1rem',
	height: '1rem',
	display: 'inline-block',
	marginRight: '0.75rem',
	cursor: 'move',
}

export interface BoxWithHandleProps {
	connectDragSource: ConnectDragSource
	connectDragPreview: ConnectDragPreview
	isDragging: boolean
}

const BoxWithHandle: React.FC<BoxWithHandleProps> = ({
	isDragging,
	connectDragSource,
	connectDragPreview,
}) => {
	const opacity = isDragging ? 0.4 : 1
	return connectDragPreview(
		<div style={{ ...style, opacity }}>
			{connectDragSource(<div style={handleStyle} />)}
			Drag me by the handle
		</div>,
	)
}

export default DragSource(
	ItemTypes.BOX,
	{
		beginDrag: () => ({}),
	},
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	}),
)(BoxWithHandle)
