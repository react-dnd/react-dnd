import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
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

function createKnightImage() {
	if (typeof Image === 'undefined') {
		return undefined
	}
	const img = new Image()
	img.src = knightImage
	return img
}

export const Knight: React.FC = () => {
	const ref = React.useRef(null)
	const dragPreview = React.useMemo(createKnightImage, [])
	const { isDragging } = useDrag({
		ref,
		item: { type: ItemTypes.KNIGHT },
		preview: dragPreview,
		collect: mon => ({
			isDragging: !!mon.isDragging(),
		}),
	})

	return (
		<div
			ref={ref}
			style={{
				...knightStyle,
				opacity: isDragging ? 0.5 : 1,
			}}
		>
			♘
		</div>
	)
}
