import React from 'react'
import {
	DropTarget,
	DropTargetMonitor,
	DropTargetConnector,
	ConnectDropTarget,
} from 'react-dnd'
import { Square } from './Square'
import { canMoveKnight, moveKnight } from './Game'
import ItemTypes from './ItemTypes'
import Overlay from './Overlay'

export interface BoardSquareProps {
	x: number
	y: number
	children: any

	// Collected Props
	isOver: boolean
	canDrop: boolean
	connectDropTarget: ConnectDropTarget
}

const boardSquareStyle: React.CSSProperties = {
	position: 'relative',
	width: '100%',
	height: '100%',
}

const BoardSquare: React.FC<BoardSquareProps> = ({
	x,
	y,
	connectDropTarget,
	isOver,
	canDrop,
	children,
}) => {
	const black = (x + y) % 2 === 1
	return connectDropTarget(
		<div style={boardSquareStyle}>
			<Square black={black}>{children}</Square>
			{isOver && !canDrop && <Overlay color="red" />}
			{!isOver && canDrop && <Overlay color="yellow" />}
			{isOver && canDrop && <Overlay color="green" />}
		</div>,
	)
}

export default DropTarget(
	ItemTypes.KNIGHT,
	{
		canDrop: (props: BoardSquareProps) => canMoveKnight(props.x, props.y),
		drop: (props: BoardSquareProps) => moveKnight(props.x, props.y),
	},
	(connect: DropTargetConnector, monitor: DropTargetMonitor) => {
		return {
			connectDropTarget: connect.dropTarget(),
			isOver: !!monitor.isOver(),
			canDrop: !!monitor.canDrop(),
		}
	},
)(BoardSquare)
