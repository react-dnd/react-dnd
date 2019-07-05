import React, { memo } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import {
	ConnectDragSource,
	ConnectDropTarget,
	DropTargetMonitor,
} from 'react-dnd'
import ItemTypes from './ItemTypes'

const style: React.CSSProperties = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
}

export interface CardProps {
	id: any
	text: string
	moveCard: (draggedId: string, id: string) => void
	isDragging: boolean
	connectDragSource: ConnectDragSource
	connectDropTarget: ConnectDropTarget
}

const Card: React.FC<CardProps> = memo(
	({ text, isDragging, connectDragSource, connectDropTarget }) => {
		const opacity = isDragging ? 0 : 1
		return connectDragSource(
			connectDropTarget(<div style={{ ...style, opacity }}>{text}</div>),
		)
	},
)
Card.displayName = 'Card'

export default DropTarget(
	ItemTypes.CARD,
	{
		hover(props: CardProps, monitor: DropTargetMonitor) {
			const draggedId = monitor.getItem().id
			if (draggedId !== props.id) {
				props.moveCard(draggedId, props.id)
			}
		},
	},
	connect => ({
		connectDropTarget: connect.dropTarget(),
	}),
)(
	DragSource(
		ItemTypes.CARD,
		{
			beginDrag: (props: CardProps) => ({ id: props.id }),
		},
		(connect, monitor) => ({
			connectDragSource: connect.dragSource(),
			isDragging: monitor.isDragging(),
		}),
	)(Card),
)
