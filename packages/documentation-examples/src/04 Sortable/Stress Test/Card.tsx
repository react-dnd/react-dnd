import React from 'react'
import {
	DragSource,
	DropTarget,
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

const cardSource = {
	beginDrag(props: CardProps) {
		return { id: props.id }
	},
}

const cardTarget = {
	hover(props: CardProps, monitor: DropTargetMonitor) {
		const draggedId = monitor.getItem().id

		if (draggedId !== props.id) {
			props.moveCard(draggedId, props.id)
		}
	},
}

export interface CardProps {
	id: any
	text: string
	moveCard: (draggedId: string, id: string) => void
}

interface CardSourceCollectedProps {
	isDragging: boolean
	connectDragSource: ConnectDragSource
}

interface CardTargetCollectedProps {
	connectDropTarget: ConnectDropTarget
}

class Card extends React.Component<
	CardProps & CardSourceCollectedProps & CardTargetCollectedProps
> {
	public render() {
		const {
			text,
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props
		const opacity = isDragging ? 0 : 1

		return connectDragSource(
			connectDropTarget(<div style={{ ...style, opacity }}>{text}</div>),
		)
	}
}

export default DropTarget<CardProps, CardTargetCollectedProps>(
	ItemTypes.CARD,
	cardTarget,
	connect => ({
		connectDropTarget: connect.dropTarget(),
	}),
)(
	DragSource<CardProps, CardSourceCollectedProps>(
		ItemTypes.CARD,
		cardSource,
		(connect, monitor) => ({
			connectDragSource: connect.dragSource(),
			isDragging: monitor.isDragging(),
		}),
	)(Card),
)
