import React from 'react'
import PropTypes from 'prop-types'
import {
	DropTarget,
	IDropTargetMonitor,
	IDropTargetConnector,
	DropTargetCollector,
	JsxWrapper,
} from 'react-dnd'
import Square from './Square'
import { canMoveKnight, moveKnight } from './Game'
import ItemTypes from './ItemTypes'

const squareTarget = {
	canDrop(props: IBoardSquareProps) {
		return canMoveKnight(props.x, props.y)
	},

	drop(props: IBoardSquareProps) {
		moveKnight(props.x, props.y)
	},
}

export interface ICollectedProps {
	isOver?: boolean
	canDrop?: boolean
	connectDropTarget?: JsxWrapper
}

const collect: DropTargetCollector<ICollectedProps> = (
	connect: IDropTargetConnector,
	monitor: IDropTargetMonitor,
) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: !!monitor.isOver(),
		canDrop: !!monitor.canDrop(),
	}
}

export interface IBoardSquareProps extends ICollectedProps {
	x: number
	y: number
	children: any
}

@DropTarget(ItemTypes.KNIGHT, squareTarget, collect)
export default class BoardSquare extends React.Component<IBoardSquareProps> {
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
