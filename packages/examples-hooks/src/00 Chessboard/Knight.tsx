import * as React from 'react'
import { createPortal } from 'react-dom'
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

const KnightDragPreview = React.forwardRef(
	(props, ref: React.Ref<HTMLImageElement>) => {
		if (typeof Image === 'undefined') {
			return null
		}
		return <img ref={ref} src={knightImage} />
	},
)

const KnightDragPreviewWrapper: React.FC<any> = React.forwardRef(
	({ root }, ref: React.Ref<HTMLImageElement>) => {
		return createPortal(<KnightDragPreview ref={ref} />, root)
	},
)

export const Knight: React.FC = () => {
	const ref = React.useRef(null)
	const preview = React.useRef(null)
	const dragPreviewRoot = document.createElement('div')
	const { isDragging } = useDrag({
		ref,
		item: { type: ItemTypes.KNIGHT },
		preview,
		collect: mon => ({
			isDragging: !!mon.isDragging(),
		}),
	})

	return (
		<>
			<KnightDragPreviewWrapper ref={preview} root={dragPreviewRoot} />
			<div
				ref={ref}
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
