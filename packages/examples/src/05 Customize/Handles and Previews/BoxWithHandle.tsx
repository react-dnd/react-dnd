import React from 'react'
import { DragSource, ConnectDragPreview, ConnectDragSource } from 'react-dnd'
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

const boxSource = {
	beginDrag() {
		return {}
	},
}

export interface BoxWithHandleProps {
	connectDragSource: ConnectDragSource
	connectDragPreview: ConnectDragPreview
	isDragging: boolean
}

class BoxWithHandle extends React.Component<BoxWithHandleProps> {
	public render() {
		const { isDragging, connectDragSource, connectDragPreview } = this.props
		const opacity = isDragging ? 0.4 : 1

		return connectDragPreview(
			<div style={{ ...style, opacity }}>
				{connectDragSource(<div style={handleStyle} />)}
				Drag me by the handle
			</div>,
		)
	}
}

export default DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
	isDragging: monitor.isDragging(),
}))(BoxWithHandle)
