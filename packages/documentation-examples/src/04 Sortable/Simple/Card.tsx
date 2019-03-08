import React, { useRef } from 'react'
import { useDrop, useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'
import { XYCoord } from 'dnd-core'

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
}

export interface CardProps {
	id: any
	text: string
	index: number
	moveCard: (dragIndex: number, hoverIndex: number) => void
}

const Card: React.FC<CardProps> = ({ id, text, index, moveCard }) => {
	const ref = useRef<HTMLDivElement>(null)

	useDrop({
		ref,
		type: ItemTypes.CARD,
		hover(monitor) {
			if (!ref.current) {
				return
			}
			const dragIndex = monitor.getItem().index
			const hoverIndex = index

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return
			}

			// Determine rectangle on screen
			const hoverBoundingRect = ref.current!.getBoundingClientRect()

			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

			// Determine mouse position
			const clientOffset = monitor.getClientOffset()

			// Get pixels to the top
			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%

			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}

			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}

			// Time to actually perform the action
			moveCard(dragIndex, hoverIndex)

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex
		},
	})

	const { isDragging } = useDrag({
		ref,
		type: ItemTypes.CARD,
		beginDrag: () => ({ id, index }),
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const opacity = isDragging ? 0 : 1
	return (
		<div ref={ref} style={{ ...style, opacity }}>
			{text}
		</div>
	)
}

export default Card
