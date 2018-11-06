import * as React from 'react'
import {
	DragSource,
	ConnectDragSource,
	ConnectDragPreview,
	DragSourceConnector,
	DragSourceMonitor,
	DragSourceCollector,
} from 'react-dnd'
import ItemTypes from './ItemTypes'
import knightImage from './knightImage'

const knightSource = {
	beginDrag() {
		return {}
	},
}

const knightStyle: React.CSSProperties = {
	fontSize: 40,
	fontWeight: 'bold',
	cursor: 'move',
}

const collect: DragSourceCollector<KnightProps> = (
	connect: DragSourceConnector,
	monitor: DragSourceMonitor,
) => ({
	connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
	isDragging: monitor.isDragging(),
})

export interface KnightProps {
	connectDragSource: ConnectDragSource
	connectDragPreview: ConnectDragPreview
	isDragging?: boolean
}

class Knight extends React.Component<KnightProps> {
	public componentDidMount() {
		const img = new Image()
		img.src = knightImage
		img.onload = () =>
			this.props.connectDragPreview && this.props.connectDragPreview(img)
	}

	public render() {
		const { connectDragSource, isDragging } = this.props
		return connectDragSource(
			<div
				style={{
					...knightStyle,
					opacity: isDragging ? 0.5 : 1,
				}}
			>
				♘
			</div>,
		)
	}
}

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight)
