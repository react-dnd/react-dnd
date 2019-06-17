import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
}

export interface CardProps {
	id: string
	text: string
	moveCard: (id: string, to: number) => void
	findCard: (id: string) => { index: number }
}

interface Item {
	type: string
	id: string
	originalIndex: string
}

const Card: React.FC<CardProps> = ({ id, text, moveCard, findCard }) => {
	const originalIndex = findCard(id).index
	const [{ isDragging }, drag] = useDrag({
		item: { type: ItemTypes.CARD, id, originalIndex },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const [, drop] = useDrop({
		accept: ItemTypes.CARD,
		canDrop: () => false,
		hover({ id: draggedId }: Item) {
			if (draggedId !== id) {
				const { index: overIndex } = findCard(id)
				moveCard(draggedId, overIndex)
			}
		},
	})

	const opacity = isDragging ? 0 : 1
	return (
		<div ref={node => drag(drop(node))} style={{ ...style, opacity }}>
			{text}
		</div>
	)
}

export default Card
