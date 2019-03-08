import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
import ItemTypes from '../Single Target/ItemTypes'
const {
	useDrop,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

const style: React.CSSProperties = {
	height: '12rem',
	width: '12rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	color: 'white',
	padding: '1rem',
	textAlign: 'center',
	fontSize: '1rem',
	lineHeight: 'normal',
	float: 'left',
}

export interface DustbinProps {
	allowedDropEffect: string
}

function selectBackgroundColor(isActive: boolean, canDrop: boolean) {
	if (isActive) {
		return 'darkgreen'
	} else if (canDrop) {
		return 'darkkhaki'
	} else {
		return '#222'
	}
}

const Dustbin: React.FC<DustbinProps> = ({ allowedDropEffect }) => {
	const ref = React.useRef(null)
	const { canDrop, isOver } = useDrop({
		ref,
		type: ItemTypes.BOX,
		drop: () => ({
			name: `${allowedDropEffect} Dustbin`,
			allowedDropEffect,
		}),
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	})
	const isActive = canDrop && isOver
	const backgroundColor = selectBackgroundColor(isActive, canDrop)
	return (
		<div ref={ref} style={{ ...style, backgroundColor }}>
			{`Works with ${allowedDropEffect} drop effect`}
			<br />
			<br />
			{isActive ? 'Release to drop' : 'Drag a box here'}
		</div>
	)
}
export default Dustbin
