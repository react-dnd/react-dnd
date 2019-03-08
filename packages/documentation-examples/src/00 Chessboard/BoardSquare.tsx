import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
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
	const ref = useRef(null)
	const { isOver, canDrop } = useDrop({
		ref,
		type: ItemTypes.KNIGHT,
		canDrop: () => canMoveKnight(props.x, props.y),
		drop: () => moveKnight(props.x, props.y),
		collect: mon => ({
			isOver: !!mon.isOver(),
			canDrop: !!mon.canDrop(),
		}),
	})
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
