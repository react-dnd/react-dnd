import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
import ItemTypes from './ItemTypes'
import knightImage from './knightImage'

const {
	useDrag,
	useDragPreview,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

const knightStyle: React.CSSProperties = {
	fontSize: 40,
	fontWeight: 'bold',
	cursor: 'move',
}

const KnightDragPreview = React.forwardRef(
	(props, ref: React.Ref<HTMLImageElement>) => {
		if (typeof Image === 'undefined') {
			return null
		}
		return <img ref={ref} src={knightImage} />
	},
)

export const Knight: React.FC = () => {
	const item = { type: ItemTypes.KNIGHT }
	const [DragPreview, preview] = useDragPreview(KnightDragPreview)
	const [{ isDragging }, drag] = useDrag({
		item,
		preview,
		collect: mon => ({
			isDragging: !!mon.isDragging(),
		}),
	})

	return (
		<>
			<DragPreview />
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
