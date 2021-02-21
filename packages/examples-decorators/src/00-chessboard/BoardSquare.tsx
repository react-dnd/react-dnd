import { CSSProperties, FC } from 'react'
import {
	DropTarget,
	DropTargetMonitor,
	DropTargetConnector,
	ConnectDropTarget,
} from 'react-dnd'
import { Square } from './Square'
import { ItemTypes } from './ItemTypes'
import { Overlay, OverlayType } from './Overlay'
import { Game } from './Game'

export interface BoardSquareProps {
	x: number
	y: number
	children: any
	game: Game

	// Collected Props
	isOver: boolean
	canDrop: boolean
	connectDropTarget: ConnectDropTarget
}

const boardSquareStyle: CSSProperties = {
	position: 'relative',
	width: '100%',
	height: '100%',
}

const BoardSquare: FC<BoardSquareProps> = ({
	x,
	y,
	connectDropTarget,
	isOver,
	canDrop,
	children,
}) => {
	const black = (x + y) % 2 === 1
	return connectDropTarget(
		<div role="Space" data-testid={`(${x},${y})`} style={boardSquareStyle}>
			<Square black={black}>{children}</Square>
			{isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover} />}
			{!isOver && canDrop && <Overlay type={OverlayType.PossibleMove} />}
			{isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover} />}
		</div>,
	)
}

export default DropTarget(
	ItemTypes.KNIGHT,
	{
		canDrop: ({ game, x, y }: BoardSquareProps) => game.canMoveKnight(x, y),
		drop: ({ game, x, y }: BoardSquareProps) => game.moveKnight(x, y),
	},
	(connect: DropTargetConnector, monitor: DropTargetMonitor) => {
		return {
			connectDropTarget: connect.dropTarget(),
			isOver: !!monitor.isOver(),
			canDrop: !!monitor.canDrop(),
		}
	},
)(BoardSquare)
