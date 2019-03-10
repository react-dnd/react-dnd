import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'

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

export interface BoxProps {
	name: string
	type: string
	isDropped: boolean
}

const Box: React.FC<BoxProps> = ({ name, type, isDropped }) => {
	const { ref, isDragging } = useDrag({
		item: { name, type },
		isDragging(monitor) {
			const item = monitor.getItem()
			return name === item.name
		},
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const opacity = isDragging ? 0.4 : 1

	return (
		<div ref={ref} style={{ ...style, opacity }}>
			{isDropped ? <s>{name}</s> : name}
		</div>
	)
}

export default Box
