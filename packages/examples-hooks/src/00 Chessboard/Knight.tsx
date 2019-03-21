import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
import ItemTypes from './ItemTypes'
import knightImage from './knightImage'

const {
	useDrag,
	useDetachedPreview,
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
	const DragPreview = useDetachedPreview(KnightDragPreview)
	const [{ isDragging }, drag, preview] = useDrag({
		item: { type: ItemTypes.KNIGHT },
		collect: mon => ({
			isDragging: !!mon.isDragging(),
		}),
	})

	return (
		<>
			<DragPreview previewRef={preview} />
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
