import React from 'react'
import {
	ConnectDragPreview,
	ConnectDragSource,
	DragPreviewImage,
} from 'react-dnd'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'
import boxImage from './boxImage'

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
	width: '20rem',
}

export interface BoxWithImageProps {
	connectDragSource: ConnectDragSource
	connectDragPreview: ConnectDragPreview
	isDragging: boolean
}

const BoxWithImage: React.FC<BoxWithImageProps> = ({
	isDragging,
	connectDragSource,
	connectDragPreview,
}) => {
	const opacity = isDragging ? 0.4 : 1
	return (
		<>
			<DragPreviewImage connect={connectDragPreview} src={boxImage} />
			<div ref={connectDragSource} style={{ ...style, opacity }}>
				Drag me to see an image
			</div>
			,
		</>
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
)(BoxWithImage)
