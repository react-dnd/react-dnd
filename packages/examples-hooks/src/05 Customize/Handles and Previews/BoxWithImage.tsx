import React from 'react'
import { DragSource, ConnectDragPreview, ConnectDragSource } from 'react-dnd'
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

const BoxSource = {
	beginDrag() {
		return {}
	},
}

export interface BoxWithImageProps {
	connectDragSource: ConnectDragSource
	connectDragPreview: ConnectDragPreview
	isDragging: boolean
}

class BoxWithImage extends React.Component<BoxWithImageProps> {
	public componentDidMount() {
		const img = new Image()
		img.onload = () =>
			this.props.connectDragPreview && this.props.connectDragPreview(img)
		img.src = boxImage
	}

	public render() {
		const { isDragging, connectDragSource } = this.props
		const opacity = isDragging ? 0.4 : 1

		return connectDragSource(
			<div style={{ ...style, opacity }}>Drag me to see an image</div>,
		)
	}
}
export default DragSource(ItemTypes.BOX, BoxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
	isDragging: monitor.isDragging(),
}))(BoxWithImage)
