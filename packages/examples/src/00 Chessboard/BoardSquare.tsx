import * as React from 'react'
import {
	DropTarget,
	DropTargetMonitor,
	DropTargetConnector,
	DropTargetCollector,
	ConnectDropTarget,
} from 'react-dnd'
import { Square } from './Square'
import { canMoveKnight, moveKnight } from './Game'
import ItemTypes from './ItemTypes'
import Overlay from './Overlay'

interface CollectedProps {
	isOver: boolean
	canDrop: boolean
	connectDropTarget: ConnectDropTarget
}
export interface BoardSquareProps {
	x: number
	y: number
	children: any
}

const squareTarget = {
	canDrop(props: BoardSquareProps) {
		return canMoveKnight(props.x, props.y)
	},

	drop(props: BoardSquareProps) {
		moveKnight(props.x, props.y)
	},
}

const collect: DropTargetCollector<CollectedProps> = (
	connect: DropTargetConnector,
	monitor: DropTargetMonitor,
) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: !!monitor.isOver(),
		canDrop: !!monitor.canDrop(),
	}
}

class BoardSquare extends React.Component<BoardSquareProps & CollectedProps> {
	public render() {
		const { x, y, connectDropTarget, isOver, canDrop, children } = this.props
		const black = (x + y) % 2 === 1

		return connectDropTarget(
			<div
				style={{
					position: 'relative',
					width: '100%',
					height: '100%',
				}}
			>
				<Square black={black}>{children}</Square>
				{isOver && !canDrop && <Overlay color="red" />}
				{!isOver && canDrop && <Overlay color="yellow" />}
				{isOver && canDrop && <Overlay color="green" />}
			</div>,
		)
	}
}

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare)
