import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
import ItemTypes from './ItemTypes'
const {
	useDrag,
	useDrop,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

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
}

const Card: React.FC<CardProps> = ({ id, text, moveCard }) => {
	const ref = React.useRef(null)
	const [{ isDragging }, connectDrag] = useDrag({
		item: { id, type: ItemTypes.CARD },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const [, connectDrop] = useDrop({
		accept: ItemTypes.CARD,
		hover({ id: draggedId }: { id: string }) {
			if (draggedId !== id) {
				moveCard(draggedId, id)
			}
		},
	})

	connectDrag(ref)
	connectDrop(ref)
	const opacity = isDragging ? 0 : 1
	const containerStyle = React.useMemo(() => ({ ...style, opacity }), [opacity])
	return (
		<div ref={ref} style={containerStyle}>
			{text}
		</div>
	)
}

export default Card
