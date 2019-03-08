import React, { useRef, useMemo } from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'
import knightImage from './knightImage'

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
	const ref = useRef(null)
	const dragPreview = useMemo(createKnightImage, [])
	const { isDragging } = useDrag({
		ref,
		type: ItemTypes.KNIGHT,
		begin: () => ({}),
		dragPreview,
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
