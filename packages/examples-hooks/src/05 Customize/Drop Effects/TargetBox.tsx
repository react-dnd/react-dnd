import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
import ItemTypes from './ItemTypes'

const {
	useDrop,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

const style: React.CSSProperties = {
	border: '1px solid gray',
	height: '15rem',
	width: '15rem',
	padding: '2rem',
	textAlign: 'center',
}

const TargetBox: React.FC = () => {
	const [{ isActive }, drop] = useDrop({
		accept: ItemTypes.BOX,
		collect: monitor => ({
			isActive: monitor.canDrop() && monitor.isOver(),
		}),
	})

	return (
		<div ref={drop} style={style}>
			{isActive ? 'Release to drop' : 'Drag item here'}
		</div>
	)
}

export default TargetBox
