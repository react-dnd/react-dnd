import React from 'react'
import { ConnectDragSource } from 'react-dnd'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style = {
	display: 'inline-block',
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	backgroundColor: 'white',
	cursor: 'move',
}

export interface BoxProps {
	connectDragSource: ConnectDragSource
}

const Box: React.FC<BoxProps> = ({ connectDragSource }) =>
	connectDragSource(<div style={style}>Drag me</div>)

export default DragSource(
	ItemTypes.BOX,
	{
		beginDrag: () => ({}),
	},
	connect => ({
		connectDragSource: connect.dragSource(),
	}),
)(Box)
