import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
import ItemTypes from './ItemTypes'
const {
	useDrag,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

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
	const [{ isDragging }, drag] = useDrag(
		() => ({
			item: { name, type: ItemTypes.BOX },
			end: (dropResult?: { name: string }) => {
				if (dropResult) {
					alert(`You dropped ${name} into ${dropResult.name}!`)
				}
			},
			collect: monitor => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[name],
	)
	const opacity = isDragging ? 0.4 : 1

	return (
		<div ref={drag} style={{ ...style, opacity }}>
			{name}
		</div>
	)
}

export default Box
