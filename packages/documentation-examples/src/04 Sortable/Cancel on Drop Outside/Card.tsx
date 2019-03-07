import React from 'react'
import {
	DragSource,
	DropTarget,
	ConnectDragSource,
	ConnectDropTarget,
	DragSourceMonitor,
	DropTargetMonitor,
} from 'react-dnd'
import ItemTypes from './ItemTypes'

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
}

const cardSource = {
	beginDrag(props: CardProps) {
		return {
			id: props.id,
			originalIndex: props.findCard(props.id).index,
		}
	},

	endDrag(props: CardProps, monitor: DragSourceMonitor) {
		const { id: droppedId, originalIndex } = monitor.getItem()
		const didDrop = monitor.didDrop()

		if (!didDrop) {
			props.moveCard(droppedId, originalIndex)
		}
	},
}

const cardTarget = {
	canDrop() {
		return false
	},

	hover(props: CardProps, monitor: DropTargetMonitor) {
		const { id: draggedId } = monitor.getItem()
		const { id: overId } = props

		if (draggedId !== overId) {
			const { index: overIndex } = props.findCard(overId)
			props.moveCard(draggedId, overIndex)
		}
	},
}

export interface CardProps {
	id: string
	text: string
	moveCard: (id: string, to: number) => void
	findCard: (id: string) => { index: number }
}

interface CardSourceCollectedProps {
	connectDragSource: ConnectDragSource
	isDragging: boolean
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
