import React from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'
import knightImage from './knightImage'

const knightStyle: React.CSSProperties = {
	fontSize: 40,
	fontWeight: 'bold',
	cursor: 'move',
}

export const Knight: React.FC = () => {
	const [{ isDragging }, drag, preview] = useDrag({
		item: { type: ItemTypes.KNIGHT },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	})

	return (
		<>
			<DragPreviewImage connect={preview} src={knightImage} />
			<div
				ref={drag}
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
