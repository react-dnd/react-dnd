import React from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style: React.CSSProperties = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	width: '20rem',
}

const handleStyle: React.CSSProperties = {
	backgroundColor: 'green',
	width: '1rem',
	height: '1rem',
	display: 'inline-block',
	marginRight: '0.75rem',
	cursor: 'move',
}

const BoxWithHandle: React.FC = () => {
	const [{ opacity }, drag, preview] = useDrag({
		item: { type: ItemTypes.BOX },
		collect: monitor => ({
			opacity: monitor.isDragging() ? 0.4 : 1,
		}),
	})

	return (
		<div ref={preview} style={{ ...style, opacity }}>
			<div ref={drag} style={handleStyle} />
			Drag me by the handle
		</div>
	)
}
export default BoxWithHandle
