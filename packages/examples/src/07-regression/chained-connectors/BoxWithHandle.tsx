import type { CSSProperties, FC } from 'react'
import { useDrop, useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'

const style: CSSProperties = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	width: '20rem',
}
const handleStyle: CSSProperties = {
	backgroundColor: 'green',
	width: '1rem',
	height: '1rem',
	display: 'inline-block',
	marginRight: '0.75rem',
	cursor: 'move',
}

export const BoxWithHandle: FC = () => {
	const [, drop] = useDrop(() => ({
		accept: ItemTypes.BOX,
	}))
	const [{ isDragging }, drag, preview] = useDrag(() => ({
		type: ItemTypes.BOX,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}))
	const opacity = isDragging ? 0.4 : 1
	return drop(
		preview(
			<div style={{ ...style, opacity }}>
				{drag(<div style={handleStyle} />)}
				Drag me by the handle, the whole box should drag
			</div>,
		),
	)
}
