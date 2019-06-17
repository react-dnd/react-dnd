import React from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'

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
	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.BOX,
		drop: () => ({
			name: `${allowedDropEffect} Dustbin`,
			allowedDropEffect,
		}),
		collect: (monitor: any) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	})

	const isActive = canDrop && isOver
	const backgroundColor = selectBackgroundColor(isActive, canDrop)
	return (
		<div ref={drop} style={{ ...style, backgroundColor }}>
			{`Works with ${allowedDropEffect} drop effect`}
			<br />
			<br />
			{isActive ? 'Release to drop' : 'Drag a box here'}
		</div>
	)
}
export default Dustbin
