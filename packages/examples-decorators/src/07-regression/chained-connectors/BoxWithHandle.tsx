import React from 'react'
import {
	DragSource,
	DropTarget,
	ConnectDragSource,
	ConnectDragPreview,
	ConnectDropTarget,
} from 'react-dnd'
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

export interface BoxWithHandleProps {
	isDragging: boolean
	connectDragSource: ConnectDragSource
	connectDragPreview: ConnectDragPreview
	connectDropTarget: ConnectDropTarget
}

const BoxWithHandleRaw: React.FC<BoxWithHandleProps> = ({
	isDragging,
	connectDragSource,
	connectDragPreview,
	connectDropTarget,
}: BoxWithHandleProps) => {
	const opacity = isDragging ? 0.4 : 1
	return connectDropTarget(
		connectDragPreview(
			<div style={{ ...style, opacity }}>
				{connectDragSource(<div style={handleStyle} />)}
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
