import React from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style: React.CSSProperties = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	cursor: 'move',
	float: 'left',
}

interface BoxProps {
	name: string
}

const Box: React.FC<BoxProps> = ({ name }) => {
	const [{ isDragging }, drag] = useDrag({
		item: { name, type: ItemTypes.BOX },
		end: (dropResult?: { name: string }) => {
			if (dropResult) {
				alert(`You dropped ${name} into ${dropResult.name}!`)
			}
		},
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})
	const opacity = isDragging ? 0.4 : 1

	return (
		<div ref={drag} style={{ ...style, opacity }}>
			{name}
		</div>
	)
}

export default Box
