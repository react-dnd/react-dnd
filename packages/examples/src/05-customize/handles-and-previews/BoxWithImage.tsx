import type { CSSProperties, FC } from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd'

import { boxImage } from './boxImage.js'
import { ItemTypes } from './ItemTypes.js'

const style: CSSProperties = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
	width: '20rem',
}

export const BoxWithImage: FC = () => {
	const [{ opacity }, drag, preview] = useDrag(() => ({
		type: ItemTypes.BOX,
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.4 : 1,
		}),
	}))

	return (
		<>
			<DragPreviewImage connect={preview} src={boxImage} />
			<div ref={drag} style={{ ...style, opacity }}>
				Drag me to see an image
			</div>
		</>
	)
}
