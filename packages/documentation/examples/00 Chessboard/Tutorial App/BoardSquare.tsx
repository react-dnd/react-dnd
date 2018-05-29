import React from 'react'
import PropTypes from 'prop-types'
import {
	DropTarget,
	DropTargetMonitor,
	DropTargetConnector,
	DropTargetCollector,
	ConnectDropTarget,
} from 'react-dnd'
import Square from './Square'
import { canMoveKnight, moveKnight } from './Game'
import ItemTypes from './ItemTypes'

export interface CollectedProps {
	isOver?: boolean
	canDrop?: boolean
	connectDropTarget?: ConnectDropTarget
}
export interface BoardSquareProps extends CollectedProps {
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

@DropTarget(ItemTypes.KNIGHT, squareTarget, collect)
export default class BoardSquare extends React.Component<BoardSquareProps> {
	public static propTypes = {
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		children: PropTypes.node,
	}

	public render() {
		const { x, y, connectDropTarget, isOver, canDrop, children } = this.props
		const black = (x + y) % 2 === 1

		return (
			connectDropTarget &&
			connectDropTarget(
				<div
					style={{
						position: 'relative',
						width: '100%',
						height: '100%',
					}}
				>
					<Square black={black}>{children}</Square>
					{isOver && !canDrop && this.renderOverlay('red')}
					{!isOver && canDrop && this.renderOverlay('yellow')}
					{isOver && canDrop && this.renderOverlay('green')}
				</div>,
			)
		)
	}

	private renderOverlay(color: string) {
		return (
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					height: '100%',
					width: '100%',
					zIndex: 1,
					opacity: 0.5,
					backgroundColor: color,
				}}
			/>
		)
	}
}
