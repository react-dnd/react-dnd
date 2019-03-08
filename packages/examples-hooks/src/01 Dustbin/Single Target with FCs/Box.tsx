import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
import ItemTypes from '../Single Target/ItemTypes'
import { useDrag } from 'react-dnd/hooks'

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
}

const Box: React.FC<BoxProps> = ({ name }) => {
	const ref = React.createRef()
	const { isDragging } = useDrag({
		ref,
		type: ItemTypes.BOX,
		begin: () => ({ name }),
		end: monitor => {
			const item = monitor.getItem()
			const dropResult = monitor.getDropResult()
			if (dropResult) {
				alert(`You dropped ${item.name} into ${dropResult.name}!`)
			}
		},
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})
	const opacity = isDragging ? 0.4 : 1

	return (
		<div ref={ref as any} style={{ ...style, opacity }}>
			{name}
		</div>
	)
}

export default Box
