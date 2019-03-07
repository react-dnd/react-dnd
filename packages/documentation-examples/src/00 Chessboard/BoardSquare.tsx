import * as React from 'react'
import { useDropTarget, useMonitorOutput } from 'react-dnd'
import { Square } from './Square'
import { canMoveKnight, moveKnight } from './Game'
import ItemTypes from './ItemTypes'
import Overlay from './Overlay'

export interface BoardSquareProps {
	x: number
	y: number
	children: any
}

export const BoardSquare: React.FC<BoardSquareProps> = (
	props: BoardSquareProps,
) => {
	const ref = React.useRef(null)
	const dropTargetMonitor = useDropTarget(ref, ItemTypes.KNIGHT, {
		canDrop: () => canMoveKnight(props.x, props.y),
		drop: () => moveKnight(props.x, props.y),
	})
	const { isOver, canDrop } = useMonitorOutput(dropTargetMonitor, () => ({
		isOver: !!dropTargetMonitor.isOver(),
		canDrop: !!dropTargetMonitor.canDrop(),
	}))
	const black = (props.x + props.y) % 2 === 1

	return (
		<div
			ref={ref}
			style={{
				position: 'relative',
				width: '100%',
				height: '100%',
			}}
		>
			<Square black={black}>{props.children}</Square>
			{isOver && !canDrop && <Overlay color="red" />}
			{!isOver && canDrop && <Overlay color="yellow" />}
			{isOver && canDrop && <Overlay color="green" />}
		</div>
	)
}
