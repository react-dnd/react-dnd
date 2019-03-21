import * as React from 'react'
import {
	DragPreviewImage,
	__EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__,
} from 'react-dnd'
import ItemTypes from './ItemTypes'
import knightImage from './knightImage'

const {
	useDrag,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

const knightStyle: React.CSSProperties = {
	fontSize: 40,
	fontWeight: 'bold',
	cursor: 'move',
}

export const Knight: React.FC = () => {
	const [{ isDragging }, drag, preview] = useDrag({
		item: { type: ItemTypes.KNIGHT },
		collect: mon => ({
			isDragging: !!mon.isDragging(),
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
