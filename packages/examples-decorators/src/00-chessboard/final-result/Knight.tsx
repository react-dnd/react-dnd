import React from 'react'
import {
	ConnectDragSource,
	ConnectDragPreview,
	DragSourceMonitor,
	DragPreviewImage,
} from 'react-dnd'
import { DragSource, DragSourceConnector } from 'react-dnd-decorators'
import ItemTypes from './ItemTypes'
import knightImage from './knightImage'

const knightStyle: React.CSSProperties = {
	fontSize: 40,
	fontWeight: 'bold',
	cursor: 'move',
}

export interface KnightProps {
	connectDragSource: ConnectDragSource
	connectDragPreview: ConnectDragPreview
	isDragging?: boolean
}

const Knight: React.FC<KnightProps> = ({
	connectDragSource,
	connectDragPreview,
	isDragging,
}) => {
	return (
		<>
			<DragPreviewImage connect={connectDragPreview} src={knightImage} />
			<div
				ref={connectDragSource}
				style={{
					...knightStyle,
					opacity: isDragging ? 0.5 : 1,
				}}
			>
				♘
			</div>
		</>
	)
}

export default DragSource(
	ItemTypes.KNIGHT,
	{
		beginDrag: () => ({}),
	},
	(connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	}),
)(Knight)
