import React from 'react'
import { ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import { DropTarget, DropTargetConnector } from 'react-dnd'
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
	canDrop: boolean
	isOver: boolean
	connectDropTarget: ConnectDropTarget
}

const Dustbin: React.FC<DustbinProps> = ({
	canDrop,
	isOver,
	connectDropTarget,
}) => {
	const isActive = canDrop && isOver
	let backgroundColor = '#222'
	if (isActive) {
		backgroundColor = 'darkgreen'
	} else if (canDrop) {
		backgroundColor = 'darkkhaki'
	}

	return (
		<div ref={connectDropTarget} style={{ ...style, backgroundColor }}>
			{isActive ? 'Release to drop' : 'Drag a box here'}
		</div>
	)
}

export default DropTarget(
	ItemTypes.BOX,
	{
		drop: () => ({ name: 'Dustbin' }),
	},
	(connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	}),
)(Dustbin)
