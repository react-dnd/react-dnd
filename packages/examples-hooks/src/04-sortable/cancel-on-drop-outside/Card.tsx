import { CSSProperties, FC, memo } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

const style: CSSProperties = {
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

export const Card: FC<CardProps> = memo(function Card({
	id,
	text,
	moveCard,
	findCard,
}) {
	const originalIndex = findCard(id).index
	const [{ isDragging }, drag] = useDrag(
		() => ({
			item: { type: ItemTypes.CARD, id, originalIndex },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
			end: (dropResult: unknown, monitor) => {
				const { id: droppedId, originalIndex } = monitor.getItem()
				const didDrop = monitor.didDrop()
				if (!didDrop) {
					moveCard(droppedId, originalIndex)
				}
			},
		}),
		[id, originalIndex, moveCard],
	)

	const [, drop] = useDrop(
		() => ({
			accept: ItemTypes.CARD,
			canDrop: () => false,
			hover({ id: draggedId }: Item) {
				if (draggedId !== id) {
					const { index: overIndex } = findCard(id)
					moveCard(draggedId, overIndex)
				}
			},
		}),
		[findCard, moveCard],
	)

	const opacity = isDragging ? 0 : 1
	return (
		<div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
			{text}
		</div>
	)
})
